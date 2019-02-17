import React, { Fragment, Component, PureComponent } from 'react'
import { withApollo, Query, Mutation } from "react-apollo"
import { withRouter } from 'react-router-dom'
import { errorHandlerAuthen } from '../../utils/commons/error_handlers'
class MutationPropRender2 extends PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        const { mutation,history,client } = this.props;
        return <Mutation mutation={mutation}
        onError={error => errorHandlerAuthen(error, client, history)}>
            {(action, { loading, error, data }) => {
                let actionMutation = action;
                return (<Fragment>{this.props.mutationPropRender(actionMutation, { loadingMutation:loading, errorMutation:error, dataMutation:data })}</Fragment>)
            }}
        </Mutation>
    }
}
export default withRouter(withApollo(MutationPropRender2));