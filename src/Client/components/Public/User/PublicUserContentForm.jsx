import React, { Fragment, Component, PureComponent } from 'react'
import { Route, Link, withRouter } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import appStyles from '../../../Styles/App.scss'
import styles from '../../../Styles/Public/HomePublic.scss'
class PublicUserContentForm extends PureComponent {
    render() {
        return <Fragment>
            <Grid item xs={6} className={`${styles.content} ${appStyles.flexDivCol}`}>
                <div>
                    <label class={styles.contentBigTitle}>
                        Hi!
                    </label>
                    <label class={styles.contentNomTitle}>
                        Click the Sign In button to start our website and learn more about our example,
                        if you don't have account click on "Sign Up" to create free Unicron account !
                    </label>
                </div>
                <div>
                    <Link to='/sign-in'>
                        <Button variant="contained" className={`${appStyles.mainButton}`}>
                            Sign In
                         </Button>
                    </Link>
                    <Link to='/sign-up'>
                        <Button variant="contained" className={`${appStyles.mainButtonBorder}`}>
                            Sign Up
                         </Button>
                    </Link>
                </div>
            </Grid>
        </Fragment>
    }
}
export default PublicUserContentForm;