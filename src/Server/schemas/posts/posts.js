import { gql } from 'apollo-server-express'
import {getAllPost, getLimitedPosts,getPostInfo,getCountInfo,getFirstComment} from '../../controllers/posts/posts_controller'
import { authorizationMiddleWare } from '../../middlewares/auth_middleware'
export const typeDefs = gql`
    type Post {
        _id: String
        author: String!
        content: String!
        date: String!
        time: String!
        role: String!
        info: PostInfo
    }
    type PostInfo {
        post_id: String!
        count:Count
        firstComment: firstComment
    }
    type Like{
        member: String!
    }
    type Count{
        like: Int!
        liked: Boolean!
        comment: Int!
        view: Int!
    }
    type firstComment{
        content: String
        member: String
        date: String
        time: String
    }
    extend type Query{
        getAllPost: [Post]
        getLimitedPosts(limitNumber: Int!):[Post]
    }
`;
export const resolvers = {
    Query: {
        getAllPost: async (obj, args, { req, res }) => {
            const data = await authorizationMiddleWare(req, res, getAllPost);
            return data;
        },
        getLimitedPosts: async (obj, args, { req, res }) => {
            console.log("Truy van");
            const data = await authorizationMiddleWare(req, res, getLimitedPosts,args.limitNumber);
            return data;
        }
    },
    Post:{
        info: async (obj, args,{ req, res }) => {
            const data = await getPostInfo(obj.id);
            return data;
        } 
    },
    PostInfo: {
        count: async (obj, args,{ req, res }) => {
            const data = await getCountInfo(req,obj.post_id);
            return data;
        },
        firstComment: async (obj, args,{ req, res }) => {
            const data = await getFirstComment(req,obj.post_id);
            return data;
        }
    }
}