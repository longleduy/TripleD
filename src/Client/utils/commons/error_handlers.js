//import {SIGN_OUT_MUTATION} from './contant/graphql_contants'
export const errorHandler = (history, error) => {
    console.error(error);
    const errorMessage = error.message.split(':')[0]
    history.push({
        pathname: '/error',
        state: { error: errorMessage, log: error.stack }
    });
}
export const errorHandlerAuthen =(error, client, history) => {
    console.error(error);
    let code;
    let errorMessage = error.message.split(':')[0];
    try {
        code = error.graphQLErrors[0].extensions.code;
    } catch (error) { }
    if (code === "UNAUTHENTICATED") {
        client.resetStore();
        localStorage.removeItem('userInfo');
        errorMessage = 'AuthenticationError'
        client.mutate({
            mutation: SIGN_OUT_MUTATION
        })
    }
    history.push({
        pathname: '/error',
        state: { error: errorMessage, log: error.stack }
    });
}