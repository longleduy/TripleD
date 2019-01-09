import { gql } from 'apollo-server-express'
import {PubSub, withFilter} from 'graphql-subscriptions'
import {createPost,getLimitedPosts,getCountInfo,likePost,delPost,commentPost,loadMoreComment} from '../../../controllers/posts/post_controller'
import { authorizationMiddleWare } from '../../../middlewares/authorization_middleware'
import delay from 'delay'
const pubsub = new PubSub();

const POST_LIKED = 'POST_LIKED'
const CREATE_POST_SUB = 'CREATE_POST_SUB'
const COMMENT_POST_SUB = 'COMMENT_POST_SUB'
export const typeDefs = gql`
    type Post {
        id: String
        userInfo:userInfo
        isAuthor: Boolean
        content: String!
        image:String
        postTime: String!
        postDate: String!
        location: String
        tag: [String]!
        count:Count!
    }
    
    input postData {
        content: String!
        location: String
        tag: [String]!
        image: String
    }
    input likeData{
        postID: String!
        action: String!
    }
    type userInfo{
        id: String
        profileName: String
        avatar: String
    }
    type status{
        status: Boolean
    }

    type Count{
        likes: Int!
        liked: Boolean!
        comments: Int!
        views: Int!
    }
    type newComment{
        commentContent: String
        userInfoComment: userInfo
        commentDate: String
        commentImage: String
    }
    type loadComment{
        commentContent: String
        userInfoComment: userInfo
        commentDate: String
        commentImage: String
    }
    type createPostData{
        id: String
        userInfo:userInfo
        isAuthor: Boolean
        content: String!
        image:String
        postTime: String!
        postDate: String!
        location: String
        tag: [String]!
        count:Count!
    }
    type createPostDataSub{
        id: String
        userInfo:userInfo
        isAuthor: Boolean
        content: String!
        image:String
        postTime: String!
        postDate: String!
        location: String
        tag: [String]!
        count:Count!
    }
    type likeRespone{
        likes: Int
        liked: Boolean
    }
    type likeResSub{
        postID: String!
        likes: Int
    }
    extend type Query{
        getAllPost: [Post]
        getLimitedPost(limitNumber: Int!,skipNumber: Int!):[Post]
        loadMorePost(limitNumber: Int!,start: String):[Post]
        loadMoreComment(postID: String!,limitNumber: Int!,skipNumber: Int):[loadComment]
    }
    extend type Mutation{
        createPost(postData: postData):createPostData
        likePost(likeData: likeData):likeRespone,
        delPost(postID: String!,likes: Int!,comments: Int!,views: Int!):status,
        commentPost(postID: String!,commentContent: String!,commentImage: String!,commentCount: Int!):newComment
    }
    extend type Subscription{
        postLiked: likeResSub
        createPostSub: createPostData
        commentPostSub(postID:String!): newComment
    }
`;
export const resolvers = {
    Query: {
        getAllPost: async (obj, args, { req, res }) => {
            const data = await authorizationMiddleWare(req, res, getAllPost);
            return data;
        },
        getLimitedPost: async (obj, args, { req, res }) => {
            const data = await authorizationMiddleWare(req, res, getLimitedPosts, args);
            return data;
        },
        loadMorePost: async (obj, args, { req, res }) => {
            const data = await loadMorePost(args);
            return data;
        },
        loadMoreComment: async (obj, args, { req, res }) => {
            const data = await loadMoreComment(args);
            return data;
        }
    },
    Post: {
        userInfo: async (obj, args, { req, res }) => {
            return obj.userID;
        },
        count: async (obj, args, { req, res }) => {
            const data = await getCountInfo(req, obj.id);
            return data;
        }
    },
    createPostData: {
        userInfo: async (obj, args, { req, res }) => {   
            return {
                id:obj.idUser,
                profileName:obj.profileName,
				avatar:obj.avatarUser
            }
        },
        count: async (obj, args, { req, res }) => {
            return {
                likes: 0,
                liked: false,
                comments: 0,
                views: 0
            };
        }
    },
    newComment: {
        userInfoComment: async (obj, args, { req, res }) => {
            return {
                id:obj.idUser,
                profileName:obj.profileName,
				avatar:obj.avatarUser
            }
        }
    },
    loadComment: {
        userInfoComment: async (obj, args, { req, res }) => {
            return obj.userInfo
        }
    },
    Mutation: {
        createPost: async (obj, args, { req, res }) => {
            let data = await authorizationMiddleWare(req, res, createPost, args.postData);
            data["__typename"]="Post";
            pubsub.publish(CREATE_POST_SUB,{createPostSub:data});
            return data;
        },
        likePost: async (obj, args, { req, res }) => { 
            const data = await authorizationMiddleWare(req, res, likePost, args.likeData);
            pubsub.publish(POST_LIKED,{postLiked:{
                postID: args.likeData.postID,
                likes: data.likes
            }});
            return data;
        },
        delPost: async (obj, args, { req, res }) => {
            return await authorizationMiddleWare(req, res, delPost, args);
        },
        commentPost: async (obj, args, { req, res }) => {
            const data = await authorizationMiddleWare(req, res, commentPost, args);
            pubsub.publish(COMMENT_POST_SUB,{commentPostSub:data,postID:args.postID})
            return data;
        }
    },
    Subscription: {
        postLiked : {
            subscribe: () => pubsub.asyncIterator(POST_LIKED)
        },
        createPostSub: {
            subscribe: () => pubsub.asyncIterator(CREATE_POST_SUB)
        },
        commentPostSub: {
            subscribe: withFilter(
                () => pubsub.asyncIterator(COMMENT_POST_SUB),
                (payload,variables) => {
                    return payload.postID === variables.postID
                }
            )
        }
    }
}