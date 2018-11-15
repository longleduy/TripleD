import React, { Fragment, Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { withApollo } from "react-apollo"
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
//Todo: Style
import styles from '../Styles/Header.scss'
//Todo: GraphQl
import {signOut} from '../graphql/actions/graphql_action'
//Todo: Utils
import {showMenu} from '../utils/routes/routes_utils'
class HeaderForm extends Component {
    showButtonSign = (isAuthen) => {
        if (!isAuthen) {
            if (location.pathname == '/sign/sign-up') {
                return <Link to='/sign/sign-in' className={styles.signButton}>
                    <Button color="inherit">Sign In</Button>
                </Link>
            }
            else if (location.pathname == '/sign/sign-in' || location.pathname == '/') {
                return <Link to='/sign/sign-up'  className={styles.signButton}>
                    <Button color="inherit">Sign Up</Button>
                </Link>
            }
            else {
                return (<Fragment>
                    <Link to='/sign/sign-in' className={`${styles.signButton} ${styles.signInButton}`}>
                        <Button color="inherit">Sign In</Button>
                    </Link>
                    <Link to='/sign/sign-up' className={`${styles.signButton} ${styles.signUpButton}`}>
                        <Button color="inherit">Sign Up</Button>
                    </Link>
                </Fragment>)
            }
        }
        else {
            return<Fragment>
                {showMenu()}
                <Button color="inherit" onClick={this.signOut}>Sign Out</Button>
            </Fragment>
            
        }
    }
    signOut = () => {
        return signOut(this.props.client, this.props.history);
    }
    render() {
        const {isAuthen} = this.props.userInfo.queryUserInfo;
        return <Fragment>
            <div className={styles.header}>
                <AppBar position="static" className={styles.appBar}>
                    <Toolbar className={styles.toolBar}>
                        <Typography variant="title" color="inherit">
                            <Link to='/' className={styles.logo}>
                            <svg viewBox="0 0 24 24" className={isAuthen ? styles.svgAuthen:''}>
                                <path fill="#cccccc" d="M10.25,2C10.44,2 10.61,2.11 10.69,2.26L12.91,6.22L13,6.5L12.91,6.78L10.69,10.74C10.61,10.89 10.44,11 10.25,11H5.75C5.56,11 5.39,10.89 5.31,10.74L3.09,6.78L3,6.5L3.09,6.22L5.31,2.26C5.39,2.11 5.56,2 5.75,2H10.25M10.25,13C10.44,13 10.61,13.11 10.69,13.26L12.91,17.22L13,17.5L12.91,17.78L10.69,21.74C10.61,21.89 10.44,22 10.25,22H5.75C5.56,22 5.39,21.89 5.31,21.74L3.09,17.78L3,17.5L3.09,17.22L5.31,13.26C5.39,13.11 5.56,13 5.75,13H10.25M19.5,7.5C19.69,7.5 19.86,7.61 19.94,7.76L22.16,11.72L22.25,12L22.16,12.28L19.94,16.24C19.86,16.39 19.69,16.5 19.5,16.5H15C14.81,16.5 14.64,16.39 14.56,16.24L12.34,12.28L12.25,12L12.34,11.72L14.56,7.76C14.64,7.61 14.81,7.5 15,7.5H19.5Z" />
                            </svg>
                            {!isAuthen && <label>TripleD</label>}
                            </Link>
                        </Typography>
                        <div className={styles.menuButtonDiv}>
                            {this.showButtonSign(isAuthen)}
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        </Fragment>
    }
}
export default withApollo(withRouter(HeaderForm));
