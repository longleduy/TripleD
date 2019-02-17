import React, { Fragment, PureComponent, Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Scrollbars } from 'react-custom-scrollbars'
import { Query } from "react-apollo"
import { QUERY_USER_INFO } from './graphql/local/state_mutation'
import { Header } from './contaniners/Header.jsx'
import { Container } from './contaniners/Container.jsx'
import {Footer} from './contaniners/Footer.jsx'
import styles from './Styles/App.scss'

class App extends PureComponent {
    componentDidCatch(error, info){
        this.props.history.push({
            pathname: '/error',
            state: { error:error.message, log: "2" }
        });
    }
    render() {
        const isShowHeader = location.pathname != '/sign/sign-up' && location.pathname != '/sign/sign-in' && location.pathname != '/';
        return <Query query={QUERY_USER_INFO}>
            {({ loading, error, data }) => {
                const { isAuthen } = data.queryUserInfo;
                return <Fragment>
                    <div className={styles.app}>
                      {isShowHeader && <Header data={data}/>}  
                        <Container />
                        {isAuthen && <Footer/>}
                    </div>
                </Fragment>
            }}
        </Query>
    }
}
export default withRouter(App);
