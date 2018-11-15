import gql from 'graphql-tag'

export const QUERY_USER_INFO = gql`
query QueryUserInfo{
	queryUserInfo @client {
		isAuthen,
		jwt,
		profileName
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
