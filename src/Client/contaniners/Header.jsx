import React, { Fragment, Component } from 'react'
import { withApollo, Query } from "react-apollo"
import HeaderForm from '../Components/HeaderForm.jsx'
import {QUERY_USER_INFO} from '../graphql/local/state_mutation'
export const Header = props => {
    return <Query query={QUERY_USER_INFO}>
        {({ loading, error, data }) => {
            return <Fragment>
                <HeaderForm userInfo={data}/>
            </Fragment>
        }}
    </Query>
}
