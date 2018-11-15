import { gql } from 'apollo-server-express'
//Todo: Controllers
import * as userAccountController from '../../../controllers/users/user_controller'
export const typeDefs = gql`
interface  UserAccountInterface{
        firstName: String
        lastName: String
        email: String
        profileName: String
        passWord: String
        gender: String
        level: String
        active: Boolean
        avatar: String 
    }
    type UserAccount implements UserAccountInterface{
        firstName: String
        lastName: String
        email: String
        profileName: String
        passWord: String
        gender: String
        level: String
        active: Boolean
        avatar: String 
    }
    type SignInInfo implements UserAccountInterface{
        firstName: String
        lastName: String
        email: String
        profileName: String
        passWord: String
        gender: String
        level: String
        active: Boolean
        avatar: String 
        jwt: String 
    }
    input formData {
        firstName: String
        lastName: String
        email: String
        profileName: String
        passWord: String
        gender: String
        level: String
        active: Boolean
        avatar: String
    }
    type checkEmail {
        status: Boolean
    }
    type verifyEmail {
        status: String
    }
    type boolean{
        isSuccess: Boolean
    }
    extend type Query{
        checkEmail(email: String!): checkEmail
        verifyEmail(secretKey: String!): verifyEmail
    }
    extend type Mutation {
        addNewUserAccount(formData: formData):UserAccountInterface
        signIn(formData: formData): UserAccountInterface
        signOut:boolean
    }
`;
export const resolvers = {
     Query: {
         checkEmail: (obj, args, context) => {
            return userAccountController.checkEmail(args.email);
         },
        verifyEmail: (obj, args, context) => {
            return userAccountController.verifyEmail(args.secretKey);
        }
     },
    Mutation: {
        addNewUserAccount: (obj, args, context) => {
            return userAccountController.addNewUserAccount(args.formData);
        },
        signIn: async (obj, args, { req }) => {
            const user = await userAccountController.signIn(args.formData);
            req.session.user = user;
            return user;
        },
        signOut: async (obj, args, { req }) => {
            await req.session.destroy();
            return {
                isSuccess: true
            };
        }
    },
    UserAccountInterface: {
        __resolveType(obj, context, info) {
            if (obj.jwt) {
                return 'SignInInfo';
            }
            return 'UserAccount';
        },
    },
}