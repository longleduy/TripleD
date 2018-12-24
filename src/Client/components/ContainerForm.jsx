import React, { Fragment, Component } from 'react'
import {Switch, Route} from 'react-router-dom'
//Todo: Component
import {NotFoundForm} from '../components/NotFoundForm.jsx'
//Todo: Styles
import styles from '../Styles/container.scss'
import appStyles from '../Styles/App.scss'
//Todo: Utils
import {showPrivateRoutes, showPublicRoutes} from '../utils/routes/routes_utils'

class ContainerForm extends Component {
    render() {
        const isShowHeader = location.pathname != '/sign/sign-up' && location.pathname != '/sign/sign-in' && location.pathname != '/';
        return <Fragment>
            <div className={`${styles.container} ${isShowHeader?'':styles.fullContainer}`}>
                <Switch>
                    {showPublicRoutes()}
                    {showPrivateRoutes()}
                   <Route render={() => <NotFoundForm />} />
                </Switch>
            </div>
        </Fragment>
    }
}
export default ContainerForm;
