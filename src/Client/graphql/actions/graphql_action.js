import {SIGN_OUT_MUTATION} from '../mutations/user_mutation'
export const signOut =  async (client,history) => {
    client.resetStore();
    localStorage.removeItem('token');
    history.push('/');
    await client.mutate({
        mutation: SIGN_OUT_MUTATION
    })
}