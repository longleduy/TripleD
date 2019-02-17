import gql from 'graphql-tag'
export const SEND_MESSAGES_MUTATION = gql`
    mutation SendMessage($from:String!,$to:String!,$content:String!){
        sendMessage(from:$from,to:$to,content:$content){
                        fromUserId
                        content
                        chatTime
                }
            }           
`;
