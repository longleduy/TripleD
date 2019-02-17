import gql from 'graphql-tag'
export const NOTIFICATION_SUBSCRIPTION = gql`
	subscription NotificationPostSub($userID: String!){
		notificationPostSub(userID:$userID){
            formUserName
            formUserAvatar
            action
            postID
            content
            actionTime
    }
}
`;
