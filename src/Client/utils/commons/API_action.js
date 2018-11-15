import {SIGN_OUT_MUTATION} from './contant/graphql_contants'
export const signOut =  async (client,history) => {
    client.resetStore();
    localStorage.removeItem('userInfo');
    history.push('/');
    await client.mutate({
        mutation: SIGN_OUT_MUTATION
    })
}