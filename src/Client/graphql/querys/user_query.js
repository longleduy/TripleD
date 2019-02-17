import gql from 'graphql-tag'
export const CHECK_EMAIL_QUERY = gql`
                query CheckEmail($email: String!) {
                            checkEmail(email: $email) {
                            status
                        }
                    }
                `;
export const GET_AUTHE = gql`
query GetAuthen{
	getAuthen @client {
		isAuthen,
		jwt,
		profile_name
	}
	}
`;
export const GET_NOTIFICATION_INFO = gql`
query GetNotificationInfo{
	getNotificationInfo{
        newNotifications{
            messages
            likeAndComments
            }
        newestNotificationInfo{
            formUserName
            formUserAvatar
            action
            content
            postID
            actionTime
            }
        }
	}
`;
