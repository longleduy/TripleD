import { makeExecutableSchema } from 'graphql-tools'
import { gql } from 'apollo-server-express'
import { typeDefs as userAccountSchema, resolvers as userAccountResolver } from './users/user_schema'
import {typeDefs as postSchema, resolvers as postResolver} from './posts/post_schema'
const Query = gql`
    type Query {
        _empty: String
    }
`
const Mutation = gql`
    type Mutation {
        _empty: String
    }
`
const Subscription = gql`
    type Subscription{
        _empty: String
    }
    `
export const schema = makeExecutableSchema({
    typeDefs: [Query,Mutation,Subscription,userAccountSchema,postSchema],
    resolvers: [userAccountResolver,postResolver]
})