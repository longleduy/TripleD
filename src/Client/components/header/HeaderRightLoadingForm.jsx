import React, { Fragment, PureComponent } from 'react'
import { Link, } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
//Todo: Scss
import styles from '../../Styles/Header.scss'
import appStyles from '../../Styles/App.scss'
//Todo: Utils
class HeaderRightLoadingForm extends PureComponent {
    render() {
         return <Fragment>
            <div className={styles.notifiactionDiv}>
                <div className={styles.newestNotifiactionDiv}>
                    <Grid container className={styles.newestNotifiactionChild}>
                            <div className={styles.notifiactionUser}>
                            </div>
                    </Grid>
                </div>
                <Link to="/test">
                    <Button className={`${appStyles.buttonSvg} ${styles.menuButton}`}>
                        <svg viewBox="0 0 24 24">
                            <path fill="#ccc" d="M21,19V20H3V19L5,17V11C5,7.9 7.03,5.17 10,4.29C10,4.19 10,4.1 10,4A2,2 0 0,1 12,2A2,2 0 0,1 14,4C14,4.1 14,4.19 14,4.29C16.97,5.17 19,7.9 19,11V17L21,19M14,21A2,2 0 0,1 12,23A2,2 0 0,1 10,21" />
                        </svg>
                        <label className={styles.buttonLabel}>Notification</label>
                    </Button>
                </Link>
                <Button className={`${appStyles.buttonSvg}  ${styles.menuButton}`}>
                    <svg viewBox="0 0 24 24">
                        <path fill="#ccc" d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z" />
                    </svg>
                    <label className={styles.buttonLabel}>Messages</label>
                </Button>
            </div>
        </Fragment>
    }
}
export default HeaderRightLoadingForm;