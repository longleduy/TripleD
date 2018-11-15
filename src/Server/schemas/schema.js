import { makeExecutableSchema } from 'graphql-tools'
import { gql } from 'apollo-server-express'
import { typeDefs as userAccountSchema, resolvers as userAccountResolver } from './user_account/user_account_schema'
import { typeDefs as postSchema, resolvers as postResolver} from './posts/post2'
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
export const schema = makeExecutableSchema({
    typeDefs: [Query,Mutation, userAccountSchema,postSchema],
    resolvers: [userAccountResolver,postResolver]
})