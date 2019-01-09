import React, {Component,Fragment  } from 'react'
import { withApollo, Query } from "react-apollo"
import { withRouter } from 'react-router-dom'
import { errorHandlerAuthen } from '../../utils/commons/error_handlers'
class QueryPropRender extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { query,client,history,variables,pollInterval,fetchPolicy} = this.props;
        return <Query query={query} variables={variables} fetchPolicy={fetchPolicy?fetchPolicy:"network-only"} onError={(error) => {errorHandlerAuthen(error, client, history)}}>
            {({ loading, error, data,fetchMore, subscribeToMore}) => {
                return (<Fragment>{this.props.queryPropRender({ loading, error, data,fetchMore,subscribeToMore })}</Fragment>)
            }}
        </Query>
    }
}
// }
export default withRouter(withApollo(QueryPropRender));