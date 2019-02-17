import gql from 'graphql-tag'
export const NEW_MESSAGE_SUBSCRIPTION = gql`
	subscription NewMessageSub($from: String!,$to: String!){
		newMessageSub(from: $from,to: $to){
			fromUserId
            content
            chatTime
		}
}
`;