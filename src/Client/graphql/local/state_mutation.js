import gql from 'graphql-tag'

export const QUERY_USER_INFO = gql`
query QueryUserInfo{
	queryUserInfo @client {
		userID
		avatar
		joinAt
		dateOfBirth
		email
		facebookAdress
		gender
		instagramAdress
		isAuthen
		level
		point
		posts
		profileName
		rank
	}
	}
`;
export const QUERY_CHATBOX_INFO = gql`
query ChatChanel{
	chatChanel @client {
		isOpen
		toUser{
			profileName
			avatar
			id
		}
	}
	}
`;

export const USER_INFO_STATE_MUTATION = gql`        
mutation MutationUserInfo($userInfo: obj){
    mutationUserInfo(userInfo:$userInfo) @client {
		isAuthen
	}
}
`;
