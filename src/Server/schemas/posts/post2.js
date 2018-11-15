import { gql } from 'apollo-server-express'
import { createPost, getAllPost, getLimitedPosts, getCountInfo, getNewComment, loadMorePost, likePost } from '../../controllers/posts/posts_controller'
import { authorizationMiddleWare } from '../../middlewares/auth_middleware'
export const typeDefs = gql`
    type Post {
        id: String
        userInfo:userInfo
        content: String!
        image:String
        postTime: String!
        postDate: String!
        role: String!
        tag: [String]!
        count:Count!
        newComment: newComment
    }
    
    input postData {
        content: String!
        role: String!
        tag: [String]!
        image: String
    }
    input likeData{
        postID: String!
        action: String!
    }
    type userInfo{
        id: String
        profile_name: String
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
        commentUserInfo: userInfo
        commentDate: String
        commentTime: String
    }
    type createPostData{
        id: String
        userInfo:userInfo
        content: String!
        image:String
        postTime: String!
        postDate: String!
        role: String!
        tag: [String]!
        count:Count!
        newComment: newComment
    }
    type likeRespone{
        likes: Int
        liked: Boolean
    }
    extend type Query{
        getAllPost: [Post]
        getLimitedPosts(limitNumber: Int!):[Post]
        loadMorePost(limitNumber: Int!,start: String):[Post]
    }
    extend type Mutation{
        createPost(postData: postData):createPostData
        likePost(likeData: likeData):likeRespone
    }
`;
export const resolvers = {
    Query: {
        getAllPost: async (obj, args, { req, res }) => {
            const data = await authorizationMiddleWare(req, res, getAllPost);
            return data;
        },
        getLimitedPosts: async (obj, args, { req, res }) => {
            console.log("Vao");
            const data = await authorizationMiddleWare(req, res, getLimitedPosts, args.limitNumber);
            return data;
        },
        loadMorePost: async (obj, args, { req, res }) => {
            const data = await loadMorePost(args);
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
        },
        newComment: async (obj, args, { req, res }) => {
            const data = await getNewComment(req, obj.id);
            return data;
        }
    },
    createPostData: {
        userInfo: async (obj, args, { req, res }) => {
            return {
                id: req.session.user._id,
                profile_name: req.session.user.profile_name,
				avatar: req.session.user.avatar
            }
        },
        count: async (obj, args, { req, res }) => {
            return {
                likes: 0,
                liked: false,
                comments: 0,
                views: 0
            };
        },
        newComment: async (obj, args, { req, res }) => {
            return null
        },
    },
    newComment: {
        commentUserInfo: async (obj, args, { req, res }) => {
            return obj.commentUserInfo;
        }
    },
    Mutation: {
        createPost: async (obj, args, { req, res }) => {
            let data = await authorizationMiddleWare(req, res, createPost, args.postData);
            data["__typename"]="Post";
            return data;
        },
        likePost: async (obj, args, { req, res }) => {
            return await authorizationMiddleWare(req, res, likePost, args.likeData);
        }
    }
}