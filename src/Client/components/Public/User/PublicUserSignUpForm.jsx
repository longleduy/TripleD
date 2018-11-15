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
import {ProgressBarButton} from '../../Commons/ProgressBarButton.jsx'
//Todo: GraphQl
import {SIGN_UP_MUTATION} from '../../../graphql/mutations/user_mutation'
import {CHECK_EMAIL_QUERY} from '../../../graphql/querys/user_query'
//Todo: PropsRender
import MutationPropRender from '../../HocOrProprender/MutationPropRender.jsx'

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
                        <Link to="/sign/sign-in" className={signStyles.forgotPass}>Have account? Sign In.</Link>
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
                        </Grid>                      
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