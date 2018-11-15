import { gql } from 'apollo-server-express'
import * as libFrameController from '../../controllers/lib_framework_release/lib_framework_release_controller'
import {authorizationMiddleWare} from '../../middlewares/auth_middleware'
export const typeDefs = gql`
    type LibFrameworkInfo {
        img: String
        name: String
        role: String
        date: String
        li1: String
    }
    extend type Query{
        getListLibFrame: [LibFrameworkInfo]
    }
`;
export const resolvers = {
    Query: {
        getListLibFrame: async (obj, args, {req,res}) => {
            const data = await authorizationMiddleWare(req,res,libFrameController.getListLibFrame);
            return  data;
        }
    }
}