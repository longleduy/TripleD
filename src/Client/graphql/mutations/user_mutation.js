import gql from 'graphql-tag'
export const UPDATE_AUTHEN = gql`        
mutation UpdateAuthen($userInfo: obj){
    updateAuthen(userInfo:$userInfo) @client {
		isAuthen
	}
}
`;
export const SIGN_UP_MUTATION = gql`        
mutation AddNewUserAccount($formData: formData){
    addNewUserAccount(formData:$formData){
		firstName,
		lastName,
		email,
		profileName,
		passWord,
		gender,
		level,
		active
	}
}
`;
export const SIGN_IN_MUTATION = gql`        
mutation SignIn($formData: formData){
    signIn(formData:$formData){
		profileName,
		level
		...on SignInInfo{
			jwt
		}
	}
}
`
export const SIGN_OUT_MUTATION = gql`        
mutation SignOut{
    signOut{
		isSuccess
	}
}
`