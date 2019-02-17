import React, { Fragment, Component, PureComponent } from 'react'
import { Route, Link, withRouter } from 'react-router-dom'
import { withApollo, Mutation } from "react-apollo"
import jwt from 'jsonwebtoken'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import Snackbar from '@material-ui/core/Snackbar'
import Slide from '@material-ui/core/Slide'
//Todo: Styles
import appStyles from '../../../Styles/App.scss'
import styles from '../../../Styles/Public/HomePublic.scss'
import signStyles from '../../../Styles/Public/Sign.scss'
import materialUIStyles from '../../../Styles/MaterialUICustomize.scss'
//Todo: Commons
import * as Validator from '../../../utils/commons/validator'
import { errorHandlerAuthen } from '../../../utils/commons/error_handlers'
import { ProgressBarButton } from '../../commons/ProgressBarButton.jsx'
//Todo: GraphQl
import { SIGN_IN_MUTATION } from '../../../graphql/mutations/user_mutation'
import { USER_INFO_STATE_MUTATION } from '../../../graphql/local/state_mutation'
//Todo: PropsRender

function TransitionUp(props) {
    return <Slide {...props} direction="down" />;
}
class PublicUserSignInForm extends PureComponent {
    state = {
        emailValid: true,
        open: false,
        snackBarMessage: '',
        snackBarStatus: 'error',
        signUpSuccess: false,
        autoHide: 2000,
        signInData: {
            email: 'longldseatechit@gmail.com',
            passWord: 'longkhanh'
        }
    }
    handleClose = () => {
        this.setState({ open: false });
    };
    handleChangeDataForm = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({
            signInData: {
                ...this.state.signInData,
                [name]: value
            }
        })
    }
    validEmail = (e, text) => {
        let isPass = Validator.validEmail($(e.target), text);
        this.setState({ emailValid: isPass });
    }
    validForm = (e, action, elementID) => {
        let isPass = Validator.validEmptyForm(elementID);
        if (!this.state.emailValid || !isPass) {
            return this.setState({
                open: true,
                snackBarMessage: 'Sorry. You need finish this form to continue',
                autoHide: 2000
            });
        }
        return this.signIn(e, action);
    }
    signIn = async (e, action) => {
        e.preventDefault();
        let { signInData } = this.state;
        let status = await action({ variables: { formData: signInData } });
        if (status != null && status != '') {
            const userInfo = jwt.decode(status.data.signIn.jwt);
            userInfo["isAuthen"] = true;
            userInfo["rank"] = 14;
            userInfo["point"] = 0;
            userInfo["posts"] = 0;
            await this.props.client.mutate({
                variables: { userInfo: userInfo },
                mutation: USER_INFO_STATE_MUTATION
            })
            localStorage.setItem('token', JSON.stringify(status.data.signIn.jwt));
            this.props.history.push('/index')
        }
    }
    signInErrorHandler = (error) => {
        let name;
        try {
            name = error.graphQLErrors[0].extensions.exception.name;
        } catch (error) { }
        if (name !== 'dataFormInvalid') {
            return errorHandlerAuthen(error, this.props.client, this.props.history)
        }
        const { field } = error.graphQLErrors[0].extensions.exception.data;
        const { message } = error.graphQLErrors[0];
        if (field != 'email') {
            Validator.cleanErrorById('email', 'Email address')
        }
        return Validator.dataFormInvalid(field, message);
    }
    componentDidMount() {
        $(document).keypress(function (event) {
            if (event.keyCode == 13) {
                $('#sign-btn').click();
            }
        });
    }
    render() {
        const { email, passWord } = this.state.signInData;
        const { open, snackBarMessage, snackBarStatus, signUpSuccess, autoHide } = this.state;
        return <Fragment>
            <Grid item xs={6} className={`${styles.content} ${styles.signIn} ${appStyles.flexDivCol}`}>
                <div className={styles.signHeader}>
                    <svg viewBox="0 0 24 24">
                        <path fill="#cccccc" d="M10.25,2C10.44,2 10.61,2.11 10.69,2.26L12.91,6.22L13,6.5L12.91,6.78L10.69,10.74C10.61,10.89 10.44,11 10.25,11H5.75C5.56,11 5.39,10.89 5.31,10.74L3.09,6.78L3,6.5L3.09,6.22L5.31,2.26C5.39,2.11 5.56,2 5.75,2H10.25M10.25,13C10.44,13 10.61,13.11 10.69,13.26L12.91,17.22L13,17.5L12.91,17.78L10.69,21.74C10.61,21.89 10.44,22 10.25,22H5.75C5.56,22 5.39,21.89 5.31,21.74L3.09,17.78L3,17.5L3.09,17.22L5.31,13.26C5.39,13.11 5.56,13 5.75,13H10.25M19.5,7.5C19.69,7.5 19.86,7.61 19.94,7.76L22.16,11.72L22.25,12L22.16,12.28L19.94,16.24C19.86,16.39 19.69,16.5 19.5,16.5H15C14.81,16.5 14.64,16.39 14.56,16.24L12.34,12.28L12.25,12L12.34,11.72L14.56,7.76C14.64,7.61 14.81,7.5 15,7.5H19.5Z" />
                    </svg>
                </div>
                <label className={`${styles.signTitle}`}>
                    Sign In
                </label>
                <div className={signStyles.signForm} id="sign-in-form">
                    <TextField
                        id="email"
                        name="email"
                        value={email}
                        label="Email address"
                        margin="normal"
                        className={`${signStyles.textField} ${appStyles.myTextField}`}
                        onChange={this.handleChangeDataForm}
                        onKeyUp={(e) => this.validEmail(e, 'Email address')}
                    //onKeyPress={e => Validator.cleanError(e, 'Email address')}
                    />
                    <Grid container className={signStyles.passForm}>
                        <Grid item xs={12}>
                            <TextField
                                id="passWord"
                                name="passWord"
                                value={passWord}
                                label="Pass word"
                                type="password"
                                margin="normal"
                                className={`${signStyles.textField} ${appStyles.myTextField}`}
                                onChange={this.handleChangeDataForm}
                                onKeyPress={e => Validator.cleanError(e, 'Pass word')}
                            />
                        </Grid>
                        <span className={signStyles.forgotPassLink}>
                            <label>Did you </label>
                            <Link to="/index">forget your pass word?</Link>
                        </span>
                    </Grid>
                    <Grid container className={signStyles.buttonDiv}>
                        <Grid item xs={6} className={signStyles.defaultSignIn}>
                            <Mutation mutation={SIGN_IN_MUTATION} onError={(error) => this.signInErrorHandler(error)}>
                                {(action, { data, loading, error }) => (
                                    <Button variant="contained" id="sign-btn"
                                        className={`${appStyles.mainButton} ${signStyles.signInButton}`}
                                        onClick={(e) => this.validForm(e, action, 'sign-in-form')}>
                                        <ProgressBarButton loading={loading} text='Submit' />
                                    </Button>
                                )}
                            </Mutation>
                        </Grid>
                        <Grid item xs={6} className={`${signStyles.socialSignIn}`}>
                            <svg viewBox="0 0 24 24">
                                <path fill="#000000" d="M5,3H19A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3M18,5H15.5A3.5,3.5 0 0,0 12,8.5V11H10V14H12V21H15V14H18V11H15V9A1,1 0 0,1 16,8H18V5Z" />
                            </svg>
                            <svg viewBox="0 0 24 24">
                                <path fill="#000000" d="M5,3H19A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3M19.5,12H18V10.5H17V12H15.5V13H17V14.5H18V13H19.5V12M9.65,11.36V12.9H12.22C12.09,13.54 11.45,14.83 9.65,14.83C8.11,14.83 6.89,13.54 6.89,12C6.89,10.46 8.11,9.17 9.65,9.17C10.55,9.17 11.13,9.56 11.45,9.88L12.67,8.72C11.9,7.95 10.87,7.5 9.65,7.5C7.14,7.5 5.15,9.5 5.15,12C5.15,14.5 7.14,16.5 9.65,16.5C12.22,16.5 13.96,14.7 13.96,12.13C13.96,11.81 13.96,11.61 13.89,11.36H9.65Z" />
                            </svg>
                            <svg viewBox="0 0 24 24">
                                <path fill="#000000" d="M5,3H19A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3M17.71,9.33C18.19,8.93 18.75,8.45 19,7.92C18.59,8.13 18.1,8.26 17.56,8.33C18.06,7.97 18.47,7.5 18.68,6.86C18.16,7.14 17.63,7.38 16.97,7.5C15.42,5.63 11.71,7.15 12.37,9.95C9.76,9.79 8.17,8.61 6.85,7.16C6.1,8.38 6.75,10.23 7.64,10.74C7.18,10.71 6.83,10.57 6.5,10.41C6.54,11.95 7.39,12.69 8.58,13.09C8.22,13.16 7.82,13.18 7.44,13.12C7.81,14.19 8.58,14.86 9.9,15C9,15.76 7.34,16.29 6,16.08C7.15,16.81 8.46,17.39 10.28,17.31C14.69,17.11 17.64,13.95 17.71,9.33Z" />
                            </svg>
                        </Grid>
                    </Grid>
                            <Link to="/sign/sign-up" className={signStyles.linkSignButton}>
                                <Button>
                                    Sign Up
                            </Button>
                            </Link>
                </div>
                        <Snackbar className={`${materialUIStyles.mySnackBar} ${materialUIStyles.topSnackBar}` + ` ${snackBarStatus == 'success' ? materialUIStyles.mySnackBarSucess : null}`}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                            open={this.state.open}
                            // autoHideDuration={autoHide}
                            onClose={this.handleClose}
                            TransitionComponent={TransitionUp}
                            message={<span id="message-id" className={materialUIStyles.messageBox}>
                                <label>{snackBarMessage}</label>
                            </span>}
                        />
            </Grid>
        </Fragment>
                }
            }
export default withApollo(withRouter(PublicUserSignInForm));