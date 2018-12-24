import React, { Fragment, Component } from 'react'
import { Query } from "react-apollo"
import { QUERY_USER_INFO } from '../../../graphql/local/state_mutation'
//Todo: Component
import PrivateUserInfoForm from '../../../components/private/user/PrivateUserInfoForm.jsx'
export const PrivateUserInfo = React.memo((props) => {
    return <Query query={QUERY_USER_INFO}>
        {({ loading, error, data }) => {
            if(loading) return null
            return  <Fragment>
                <PrivateUserInfoForm userInfo={data} handleOpen ={props.handleOpen}/>
            </Fragment>
        }}
    </Query>
})