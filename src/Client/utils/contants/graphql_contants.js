import gql from 'graphql-tag'
//Todo: SignUp
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
export const UPDATE_AUTHEN = gql`        
mutation UpdateAuthen($userInfo: obj){
    updateAuthen(userInfo:$userInfo) @client {
		isAuthen
	}
}
`;
export const ADD_NEW_USER_ACCOUNT_MUTATION = gql`        
mutation AddNewUserAccount($formData: formData){
    addNewUserAccount(formData:$formData){
		first_name,
		last_name,
		email,
		profile_name,
		password,
		phone_number,
		gender,
		level,
		active
	}
}
`;
export const SIGN_IN_MUTATION = gql`        
mutation SignIn($formData: formData){
    signIn(formData:$formData){
		profile_name,
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