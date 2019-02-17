import gql from 'graphql-tag'
export const GET_NOTIFICATION_POSTS = gql`
     query GetNotification($limitNumber:Int!,$skipNumber:Int!){
        getNotification(limitNumber:$limitNumber,skipNumber:$skipNumber){
			fromUser{
                id
                profileName
                avatar
                }
                action
                postID
                content
                actionTime
                isNewNotif
                isReadNotif
            }
		}
`;
export const GET_MESSAGE_POSTS = gql`
     query GetMessage($limitNumber:Int!,$skipNumber:Int!){
        getMessage(limitNumber:$limitNumber,skipNumber:$skipNumber){
			fromUser{
                id
                profileName
                avatar
                }
                action
                postID
                content
                actionTime
                isNewNotif
                isReadNotif
            }
		}
`;