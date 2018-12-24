import React, { Fragment, Component } from 'react'
import jwt from 'jsonwebtoken'
import { withApollo, Mutation } from "react-apollo"
import { withRouter } from 'react-router-dom'
import {signOut} from '../../graphql/actions/graphql_action'
class PublicRouterPropRender extends Component{
    constructor(props) {
        super(props); 
    }
    componentWillMount = async () => {
        let payload = null;
        let token = null;
        try {
            token = JSON.parse(localStorage.getItem('token'));
            payload = jwt.decode(token);
        } catch (error) {
            return signOut(this.props.client, this.props.history);
        }
        if(payload != null && payload !=''){
           return this.props.history.push('/index')
        }
        else if(token != null && token !=''){
            return signOut(this.props.client, this.props.history);
        }
    }
    render(){
        return (<Fragment>{this.props.publicRouterPropRender()}</Fragment>)
    }
}
export default withRouter(withApollo(PublicRouterPropRender));