import React, { Fragment, Component } from 'react'
import { withApollo, Mutation } from "react-apollo"
import { withRouter } from 'react-router-dom'
class PublicRouterPropRender extends Component{
    constructor(props) {
        super(props); 
    }
    componentWillMount = async () => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'))
        let isAuthen = null;
        try {
            isAuthen = userInfo.isAuthen;
        } catch (error) { }
        if(isAuthen){
            this.props.history.push('/index')
        }
    }
    render(){
        return (<Fragment>{this.props.publicRouterPropRender()}</Fragment>)
    }
}
export default withRouter(withApollo(PublicRouterPropRender));