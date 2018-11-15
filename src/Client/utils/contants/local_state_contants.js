import gql from 'graphql-tag'

export const QUERY_USER_INFO = gql`
query QueryUserInfo{
	queryUserInfo @client {
		isAuthen,
		jwt,
		profile_name
	}
	}
`;
export const MUTATION_USER_INFO = gql`        
mutation MutationUserInfo($userInfo: obj){
    mutationUserInfo(userInfo:$userInfo) @client {
		isAuthen
	}
}
`;
