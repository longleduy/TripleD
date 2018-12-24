import React, { Fragment, Component } from 'react'
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'
//Todo: Component
import { PrivateUserInfo } from '../../contaniners/private/user/PrivateUserInfo.jsx'
import {PrivateIndexListPost} from '../../contaniners/private/index/PrivateIndexListPost.jsx'
import {PrivateIndexTopMember} from '../../contaniners/private/index/PrivateIndexTopMember.jsx'
import {PrivateIndexAdsForm} from './index/PrivateIndexAdsForm.jsx'
import PrivatePostForm from './index/PrivatePostForm.jsx'
import MySnackBar from '../commons/MySnackBar.jsx'

import indexStyles from '../../Styles/Index.scss'
import materialUIStyles from '../../Styles/MaterialUICustomize.scss'

class PrivateIndexForm extends Component {
    state = {
        open: false,
        snackBarOption: {
            open: false,
            snackBarStatus: '',
            snackBarMessage: ''
        }
    }
    handleOpen = () => {
        this.setState({
            open: true
        });
    };
    handleCloseSnackBar = () => {
        this.setState({
            snackBarOption: {
                ...this.state.snackBarOption,
                open: false
            }
        });
    };
    handleOpenSnackBar = (snackBarStatus, snackBarMessage) => {
        if(snackBarStatus == 'success'){
            this.setState({
                open:false,
                snackBarOption: {
                    open: true,
                    snackBarStatus,
                    snackBarMessage
                }
            });
        }
        else{
            this.setState({
                snackBarOption: {
                    open: true,
                    snackBarStatus,
                    snackBarMessage
                }
            });
        }
    }
    toggleDrawer = () => {
        this.setState({
            open: false
        });
    };
    render() {
        return <Fragment>
            <Grid container className={indexStyles.indexContent}>
                <PrivateUserInfo handleOpen={this.handleOpen} />
                <Grid container className={indexStyles.mainContent}>
                    <Grid item xs={6} className={indexStyles.mainContentLeft}>
                        <CircularProgress id="more-post-loading" className={`${materialUIStyles.myCircularProgress} ${indexStyles.circularProgress}`} thickness={5} size={20} />
                        <PrivateIndexListPost/>
                    </Grid>
                    <Grid item xs={3} className={indexStyles.topMember}>
                        <PrivateIndexTopMember />
                    </Grid>
                    <Grid item xs={3} className={indexStyles.ads}>
                        <PrivateIndexAdsForm/>
                    </Grid>
                </Grid>
            </Grid>
            <PrivatePostForm isOpen={this.state.open}
                toggleDrawer={this.toggleDrawer}
                handleOpenSnackBar={(snackBarStatus, snackBarMessage) => this.handleOpenSnackBar(snackBarStatus, snackBarMessage)}
            />
            <MySnackBar snackBarOption={this.state.snackBarOption}
                handleCloseSnackBar={this.handleCloseSnackBar} />
        </Fragment>
    }
}
export default PrivateIndexForm;
