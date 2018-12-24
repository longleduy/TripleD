import React, { Fragment, Component, PureComponent } from 'react'
import {Route, Link, withRouter} from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import PublicUserSignInForm from './user/PublicUserSignInForm.jsx'
import PublicUserSignUpForm from './user/PublicUserSignUpForm.jsx'
import appStyles from '../../Styles/App.scss'
import styles from '../../Styles/Public/HomePublic.scss'
class HomePublicForm extends Component {
    render() {
        const url = this.props.match;
        return <Fragment>
            <div className={`${styles.homePublic}`}>
                <Grid container
                    className={`${appStyles.container} ${styles.container}`}>
                    <Route path="/" exact render={() => <PublicUserSignInForm/>}/>
                    <Route path="/sign/sign-in" exact render={() => <PublicUserSignInForm/>}/>
                    <Route path="/sign/sign-up" exact render={() => <PublicUserSignUpForm/>}/> 
                    <Grid item xs={6} className={styles.rightDiv}>
                        <div className={styles.signDivContent}>
                            <label className={styles.bigTitle}>
                                TripleD Community
                            </label>
                            <Grid container>
                            <Grid item xs={6} className={styles.contentInfo}>
                                    <svg viewBox="0 0 24 24">
                                        <path fill="#ccc" d="M8,16.61V15.37L14,11.91V7.23L9,10.12L4,7.23V13L3,13.58L2,13V5L3.07,4.38L9,7.81L12.93,5.54L14.93,4.38L16,5V13.06L10.92,16L14.97,18.33L20,15.43V11L21,10.42L22,11V16.58L14.97,20.64L8,16.61M22,9.75L21,10.33L20,9.75V8.58L21,8L22,8.58V9.75Z" />
                                    </svg>
                                    <label>Material Ui</label>
                                </Grid>     
                                
                                <Grid item xs={6} className={styles.contentInfo}>
                                    <svg viewBox="0 0 24 24">
                                        <path fill="#ccc" d="M12,1.85C11.73,1.85 11.45,1.92 11.22,2.05L3.78,6.35C3.3,6.63 3,7.15 3,7.71V16.29C3,16.85 3.3,17.37 3.78,17.65L5.73,18.77C6.68,19.23 7,19.24 7.44,19.24C8.84,19.24 9.65,18.39 9.65,16.91V8.44C9.65,8.32 9.55,8.22 9.43,8.22H8.5C8.37,8.22 8.27,8.32 8.27,8.44V16.91C8.27,17.57 7.59,18.22 6.5,17.67L4.45,16.5C4.38,16.45 4.34,16.37 4.34,16.29V7.71C4.34,7.62 4.38,7.54 4.45,7.5L11.89,3.21C11.95,3.17 12.05,3.17 12.11,3.21L19.55,7.5C19.62,7.54 19.66,7.62 19.66,7.71V16.29C19.66,16.37 19.62,16.45 19.55,16.5L12.11,20.79C12.05,20.83 11.95,20.83 11.88,20.79L10,19.65C9.92,19.62 9.84,19.61 9.79,19.64C9.26,19.94 9.16,20 8.67,20.15C8.55,20.19 8.36,20.26 8.74,20.47L11.22,21.94C11.46,22.08 11.72,22.15 12,22.15C12.28,22.15 12.54,22.08 12.78,21.94L20.22,17.65C20.7,17.37 21,16.85 21,16.29V7.71C21,7.15 20.7,6.63 20.22,6.35L12.78,2.05C12.55,1.92 12.28,1.85 12,1.85M14,8C11.88,8 10.61,8.89 10.61,10.39C10.61,12 11.87,12.47 13.91,12.67C16.34,12.91 16.53,13.27 16.53,13.75C16.53,14.58 15.86,14.93 14.3,14.93C12.32,14.93 11.9,14.44 11.75,13.46C11.73,13.36 11.64,13.28 11.53,13.28H10.57C10.45,13.28 10.36,13.37 10.36,13.5C10.36,14.74 11.04,16.24 14.3,16.24C16.65,16.24 18,15.31 18,13.69C18,12.08 16.92,11.66 14.63,11.35C12.32,11.05 12.09,10.89 12.09,10.35C12.09,9.9 12.29,9.3 14,9.3C15.5,9.3 16.09,9.63 16.32,10.66C16.34,10.76 16.43,10.83 16.53,10.83H17.5C17.55,10.83 17.61,10.81 17.65,10.76C17.69,10.72 17.72,10.66 17.7,10.6C17.56,8.82 16.38,8 14,8Z" />
                                    </svg>
                                    <label>MERN stack</label>
                                </Grid> 
                                <Grid item xs={6} className={styles.contentInfo}>
                                    <svg viewBox="0 0 24 24">
                                        <path fill="#ccc" d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.1 14.8,9.5V11C15.4,11 16,11.6 16,12.3V15.8C16,16.4 15.4,17 14.7,17H9.2C8.6,17 8,16.4 8,15.7V12.2C8,11.6 8.6,11 9.2,11V9.5C9.2,8.1 10.6,7 12,7M12,8.2C11.2,8.2 10.5,8.7 10.5,9.5V11H13.5V9.5C13.5,8.7 12.8,8.2 12,8.2Z" />
                                    </svg>
                                    <label>JWT secure</label>
                                </Grid> 
                                <Grid item xs={6} className={styles.contentInfo}>
                                    <svg viewBox="0 0 24 24">
                                        <path fill="#ccc" d="M19.35,10.04C18.67,6.59 15.64,4 12,4C9.11,4 6.6,5.64 5.35,8.04C2.34,8.36 0,10.91 0,14A6,6 0 0,0 6,20H19A5,5 0 0,0 24,15C24,12.36 21.95,10.22 19.35,10.04M19,18H6A4,4 0 0,1 2,14C2,11.95 3.53,10.24 5.56,10.03L6.63,9.92L7.13,8.97C8.08,7.14 9.94,6 12,6C14.62,6 16.88,7.86 17.39,10.43L17.69,11.93L19.22,12.04C20.78,12.14 22,13.45 22,15A3,3 0 0,1 19,18M8,13H10.55V16H13.45V13H16L12,9L8,13Z" />
                                    </svg>
                                    <label>Async upload</label>
                                </Grid>
                                <Grid item xs={6} className={styles.contentInfo}>
                                    <svg viewBox="0 0 24 24">
                                        <path fill="#ccc" d="M4.94,6.35C4.55,5.96 4.55,5.32 4.94,4.93C5.33,4.54 5.96,4.54 6.35,4.93L13.07,10.31L13.42,10.59C14.2,11.37 14.2,12.64 13.42,13.42C12.64,14.2 11.37,14.2 10.59,13.42L10.31,13.07L4.94,6.35M12,20A8,8 0 0,0 20,12C20,9.79 19.1,7.79 17.66,6.34L19.07,4.93C20.88,6.74 22,9.24 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12H4A8,8 0 0,0 12,20M12,1A2,2 0 0,1 14,3A2,2 0 0,1 12,5A2,2 0 0,1 10,3A2,2 0 0,1 12,1Z" />
                                    </svg>
                                    <label>Realtime Application</label>
                                </Grid>
                                <Grid item xs={6} className={styles.contentInfo}>
                                    <svg viewBox="0 0 24 24">
                                        <path fill="#ccc" d="M18,19C16.89,19 16,18.1 16,17C16,15.89 16.89,15 18,15A2,2 0 0,1 20,17A2,2 0 0,1 18,19M18,13A4,4 0 0,0 14,17A4,4 0 0,0 18,21A4,4 0 0,0 22,17A4,4 0 0,0 18,13M12,11.1A1.9,1.9 0 0,0 10.1,13A1.9,1.9 0 0,0 12,14.9A1.9,1.9 0 0,0 13.9,13A1.9,1.9 0 0,0 12,11.1M6,19C4.89,19 4,18.1 4,17C4,15.89 4.89,15 6,15A2,2 0 0,1 8,17A2,2 0 0,1 6,19M6,13A4,4 0 0,0 2,17A4,4 0 0,0 6,21A4,4 0 0,0 10,17A4,4 0 0,0 6,13M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8C10.89,8 10,7.1 10,6C10,4.89 10.89,4 12,4M12,10A4,4 0 0,0 16,6A4,4 0 0,0 12,2A4,4 0 0,0 8,6A4,4 0 0,0 12,10Z" />
                                    </svg>
                                    <label>Social Authentication</label>
                                </Grid>
                                <div>
                               </div>
                            </Grid>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </Fragment>
    }
}
export default withRouter(HomePublicForm);
