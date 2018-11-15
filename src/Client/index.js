import "regenerator-runtime/runtime";
import ReactDOM from 'react-dom'
import React, { Fragment } from 'react'
import { BrowserRouter } from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'
import { ApolloProvider } from "react-apollo"
import { ApolloLink } from 'apollo-link'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from "apollo-cache-inmemory"
import { createHttpLink } from "apollo-link-http"
import { setContext } from 'apollo-link-context'
import { withClientState } from 'apollo-link-state'
import $ from 'jquery'
import 'typeface-roboto'
import Favicon from 'react-favicon'
import App from './App.jsx'
import Logo from "../../public/images/logo/favicon.png"
import { HOST, SERVER_PORT, GRAPHQL_ENDPOINT } from '../Configs/_host_contants'
//Todo: Utils
import {mutationUserInfo} from './graphql/local/mutation'
import { QUERY_USER_INFO } from './utils/contants/local_state_contants'
import { getCacheLocalStorage } from './graphql/local/defaults'
import ApolloProviderPropsRender from './ApolloProviderHOC'
const cache = new InMemoryCache();
const history = createBrowserHistory()

//Todo: Apollo link state
const stateLink = withClientState({
    cache,
    resolvers: {
        Mutation: {
            mutationUserInfo: mutationUserInfo
        }
    },
    defaults: getCacheLocalStorage()
})
//Todo: Apollo link context
const contextLink = setContext((_, { headers }) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo != null) {
        return {
            headers: {
                ...headers,
                authorization: `Beare ${userInfo.jwt}`
            }
        }
    }
})
//Todo: afterwareLink 
const afterWareLink = new ApolloLink((operation, forward) => {
    return forward(operation).map(response => {
        const context = operation.getContext();
        const { response: { headers } } = context;
        if (headers) {
            const newJWT = headers.get('x-refresh-token');
            if (newJWT) {
                const oldUserInfo = JSON.parse(localStorage.getItem('userInfo'));
                const newUserInfo = {
                    ...oldUserInfo,
                    jwt: newJWT
                };
                localStorage.setItem('userInfo', JSON.stringify(newUserInfo))
            }
        }
        return response;
    });
});
//Todo: Http link
const httpLink = createHttpLink({
    uri: `${HOST}:${SERVER_PORT}/${GRAPHQL_ENDPOINT}`,
    credentials: 'include'
});
const link = ApolloLink.from([stateLink, contextLink, afterWareLink, httpLink]);
const client = new ApolloClient({
    cache,
    link
})
ReactDOM.render(<Fragment>
    <Favicon url={Logo} />
        <ApolloProviderPropsRender client={client} provider={() => {
            return <ApolloProvider client={client}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </ApolloProvider>
        }} />
</Fragment>, document.querySelector('#root'));
