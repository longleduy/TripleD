import gql from 'graphql-tag'

export const QUERY_USER_INFO = gql`
query QueryUserInfo{
	queryUserInfo @client {
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
export const USER_INFO_STATE_MUTATION = gql`        
mutation MutationUserInfo($userInfo: obj){
    mutationUserInfo(userInfo:$userInfo) @client {
		isAuthen
	}
}
`;
