import gql from 'graphql-tag'

export const GET_MESSAGE_BY_CHANEL_ID = gql`
     query GetChatMessageByChanelId($from:String!,$to:String!,$limitNumber: Int!,$skipNumber: Int!){
        getChatMessageByChanelId(from:$from,to:$to,limitNumber:$limitNumber,skipNumber:$skipNumber){
			fromUserId
            content
            chatTime
		}
     }
`;