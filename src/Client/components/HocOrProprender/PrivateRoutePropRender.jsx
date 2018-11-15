import React, { Fragment, Component } from 'react'
import gql from 'graphql-tag'
import { withApollo } from "react-apollo"
import { withRouter } from 'react-router-dom'
import {QUERY_USER_INFO} from '../../graphql/local/state_mutation'
class PrivateRoutePropRender extends Component{
    constructor(props) {
        super(props); 
    }
    componentWillMount = async () => {  
        const result = await this.props.client.query({
            query: QUERY_USER_INFO
        })
        const {isAuthen} = result.data.queryUserInfo;
        if(!isAuthen){
            this.props.history.push('/')
        }
    }
    componentDidMount = () => {
        $(window).scrollTop(0);
    }
    render(){
        return (<Fragment>{this.props.privateRoutePropRender()}</Fragment>)
    }
}
export default withRouter(withApollo(PrivateRoutePropRender));