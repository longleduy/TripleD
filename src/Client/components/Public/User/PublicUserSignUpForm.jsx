import React, { Fragment, Component, PureComponent } from 'react'
import { withApollo, Mutation } from "react-apollo"
import { Route, Link, withRouter } from 'react-router-dom'
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
import {ProgressBarButton} from '../../commons/ProgressBarButton.jsx'
//Todo: GraphQl
import {SIGN_UP_MUTATION} from '../../../graphql/mutations/user_mutation'
import {CHECK_EMAIL_QUERY} from '../../../graphql/querys/user_query'
//Todo: PropsRender
import MutationPropRender from '../../hocOrProprender/MutationPropRender.jsx'

function TransitionUp(props) {
    return <Slide {...props} direction="down" />;
  }
class PublicUserSignUpForm extends PureComponent {
    state = {
        emailValid: true,
        passWordValid: true,
        emailExist:false,
        open:false,
        snackBarMessage:'',
        snackBarStatus:'error',
        signUpSuccess:false,
        autoHide: 2000,
        signUpData: {
            firstName: 'Duy',
            lastName: 'Long',
            email: 'longldseatechit@gmail.com',
            passWord: 'longkhanh'
        }
    }
    //Todo: UI function
    handleClose = () => {
        this.setState({ open: false });
    };
    handleChangeDataForm = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({
            signUpData: {
                ...this.state.signUpData,
                [name]: value
            }
        })
    }
    //Todo: Data functiom
    validEmail = (e, text) => {
        let isPass = Validator.validEmail($(e.target),text);
        this.setState({ emailValid: isPass });
    }
    checkExistEmail = async (e) => {
        let email = $(e.target).val();
        let target = $(e.target);
        let status = await this.verifyEmail(email);
        if (status) {
            Validator.verifyEmail(target, 'exist');
            this.setState({ emailExist: true })
        }
        else {
            Validator.verifyEmail(target, 'not exist')
            this.setState({ emailExist: false })
        }

    }
    verifyEmail = async (email) => {
        let result = await this.props.client.query({
            query: CHECK_EMAIL_QUERY,
            variables: { email },
            fetchPolicy: 'network-only'
        })
        return result.data.checkEmail.status;
    }
    validPassWord = (e,rePass,text)=>{
        let isPass = Validator.validPassWord($(e.target),rePass,text);
        this.setState({ passWordValid: isPass });
    }
    validForm = (e, action, elementID) => {
        let isPass = Validator.validEmptyForm(elementID);
        if (!this.state.emailValid || !this.state.passWordValid || !isPass || this.state.emailExist) {
           return this.setState({ 
               open: true, 
               snackBarMessage:'Sorry. You need finish this form to continue',
               autoHide:2000
             });
        }
        return this.signUp(e,action);
    }
    signUp = async (e, action) => {
        let { firstName, lastName, email, passWord } = this.state.signUpData;
        e.preventDefault();
        let {signUpData} = this.state;
        let result = await action({ variables: { formData: signUpData } });
        if (result != null && result != '') {
            this.setState({ 
                signUpSuccess: true,
                open: true,
                snackBarStatus:'success',
                snackBarMessage:'Thank You! Please check your email to activate your account',
                autoHide:null,
                signUpData: {
                    firstName: '',
                    lastName: '',
                    email: '',
                    passWord: ''
                }
             })
        }
    }
    render() {
        const {firstName,lastName,email,passWord} = this.state.signUpData;
        const {open,snackBarMessage,snackBarStatus,signUpSuccess,autoHide} = this.state;
        return <Fragment>
            <Grid item xs={6} className={`${styles.content} ${styles.signIn} ${appStyles.flexDivCol}`}>
                <div className={styles.signHeader}>
                     <svg viewBox="0 0 24 24">
                        <path fill="#cccccc" d="M10.25,2C10.44,2 10.61,2.11 10.69,2.26L12.91,6.22L13,6.5L12.91,6.78L10.69,10.74C10.61,10.89 10.44,11 10.25,11H5.75C5.56,11 5.39,10.89 5.31,10.74L3.09,6.78L3,6.5L3.09,6.22L5.31,2.26C5.39,2.11 5.56,2 5.75,2H10.25M10.25,13C10.44,13 10.61,13.11 10.69,13.26L12.91,17.22L13,17.5L12.91,17.78L10.69,21.74C10.61,21.89 10.44,22 10.25,22H5.75C5.56,22 5.39,21.89 5.31,21.74L3.09,17.78L3,17.5L3.09,17.22L5.31,13.26C5.39,13.11 5.56,13 5.75,13H10.25M19.5,7.5C19.69,7.5 19.86,7.61 19.94,7.76L22.16,11.72L22.25,12L22.16,12.28L19.94,16.24C19.86,16.39 19.69,16.5 19.5,16.5H15C14.81,16.5 14.64,16.39 14.56,16.24L12.34,12.28L12.25,12L12.34,11.72L14.56,7.76C14.64,7.61 14.81,7.5 15,7.5H19.5Z" />
                    </svg>
                </div>
                <label className={`${styles.signTitle}`}>
                    Sign Up
                </label>
                <div className={signStyles.signForm} id="sign-up-form">
                    <Grid container className={signStyles.passForm}>
                        <Grid item xs={6}>
                            <TextField
                            id="firstName"
                            name="firstName"
                            value={firstName}
                            label="First name"
                            margin="normal"
                            className={`${signStyles.textField} ${appStyles.myTextField}`}
                            onChange={this.handleChangeDataForm}
                            onKeyPress={(e) => Validator.onlyLetter(e)}
                        />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                            id="lastName"
                            name="lastName"
                            value={lastName}
                            label="Last name"
                            margin="normal"
                            className={`${signStyles.textField} ${appStyles.myTextField} ${signStyles.pass2}`}
                            onChange={this.handleChangeDataForm}
                            onKeyPress={(e) => Validator.onlyLetter(e)}
                        />
                        </Grid>
                    </Grid> 
                    <TextField
                        id="email"
                        name="email"
                        value={email}
                        label="Email address"
                        margin="normal"
                        className={`${signStyles.textField} ${signStyles.email} ${appStyles.myTextField}`}
                        onKeyUp={(e) => this.validEmail(e, 'Email address')}
                        onChange={this.handleChangeDataForm}
                        onBlur={(e) => this.checkExistEmail(e)}
                    />
                    <span className={signStyles.noteSign}>
                            <svg viewBox="0 0 24 24">
                                <path fill="#ccc" d="M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z" />
                            </svg>
                            <label>You can use letters, numbers & periods</label>
                        </span>  
                    <Grid container className={signStyles.passForm}>
                        <Grid item xs={6}>
                            <TextField
                            id="passWord"
                            name="passWord"
                            value={passWord}
                            label="Pass word"
                            type="password"
                            margin="normal"
                            className={`${signStyles.textField} ${appStyles.myTextField}`}
                            onChange={this.handleChangeDataForm}
                            onKeyUp={(e) => this.validPassWord(e, $('#rePassword'), 'Password')}
                        />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                            id="rePassword"
                            name="rePassword"
                            value={passWord} 
                            label="RePass word"
                            type="password"
                            margin="normal"
                            className={`${signStyles.textField} ${appStyles.myTextField} ${signStyles.pass2}`}
                            onChange={this.handleChangeDataForm}
                            onKeyUp={(e) => this.validPassWord(e, $('#password'), 'RePass word')}
                        />
                        </Grid>
                        <span className={signStyles.noteSign}>
                            <svg viewBox="0 0 24 24">
                                <path fill="#ccc" d="M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z" />
                            </svg>
                            <label>Use 8 or more characters with a mix of letters, numbers & symbols</label>
                        </span>          
                    </Grid>   
                    <Grid container className={signStyles.buttonDiv}>
                            <Grid item xs={6} className={signStyles.defaultSignIn}>
                            <MutationPropRender mutation={SIGN_UP_MUTATION} 
                                                mutationPropRender={(action, { data, loading, error }) => (
                                <Button variant="contained"  id="sign-in-button"
                                        className={`${appStyles.mainButton} ${signStyles.signInButton}`}
                                        onClick={(e) => this.validForm(e,action,'sign-up-form')}>
                                    <ProgressBarButton loading={loading} text='Submit'/>                              
                                 </Button>
                                )}/>
                            </Grid>
                            {/* <Grid item xs={6} className={styles.linkSignButton}>
                                <Link to="/sign/sign-in">
                                    <Button>
                                        Sign In                          
                                    </Button>
                                </Link>
                            </Grid> */}
                        </Grid> 
                        <Link to="/sign/sign-in" className={signStyles.linkSignButton}>
                            <Button>
                                Sign In                          
                            </Button>
                        </Link>                     
                </div>
                <Snackbar  className={`${materialUIStyles.mySnackBar} ${materialUIStyles.topSnackBar}`+` ${snackBarStatus == 'success'?materialUIStyles.mySnackBarSucess:null}`}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                            open={this.state.open}
                            autoHideDuration={autoHide}
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
export default withApollo(PublicUserSignUpForm);