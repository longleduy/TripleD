import React, { Fragment, PureComponent } from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import Slide from '@material-ui/core/Slide'
import PropTypes from 'prop-types'
import materialUIStyles from '../../Styles/MaterialUICustomize.scss'

function TransitionUp(props) {
    return <Slide {...props} direction="down" />;
}

export default class MySnackBar extends PureComponent {
    state = {
        open: false,
        snackBarStatus: 'error',
        snackBarMessage: ''
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.snackBarOption.open !== this.props.open) {
            this.setState({
                open: nextProps.snackBarOption.open,
                snackBarStatus: nextProps.snackBarOption.snackBarStatus,
                snackBarMessage: nextProps.snackBarOption.snackBarMessage
            });
        }
    }
    render() {
        const { open, snackBarStatus, snackBarMessage } = this.state;
        return <Snackbar className={`${materialUIStyles.mySnackBar} ${materialUIStyles.topSnackBar}` + ` ${snackBarStatus == 'success' ? materialUIStyles.mySnackBarSucess : null}`}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
            open={open}
            autoHideDuration={4000}
            onClose={this.props.handleCloseSnackBar}
            TransitionComponent={TransitionUp}
            message={<span id="message-id" className={materialUIStyles.messageBox}>
                <svg viewBox="0 0 24 24">
                {snackBarStatus != 'success'?<path fill="#fff" d="M13,13H11V7H13M12,17.3A1.3,1.3 0 0,1 10.7,16A1.3,1.3 0 0,1 12,14.7A1.3,1.3 0 0,1 13.3,16A1.3,1.3 0 0,1 12,17.3M15.73,3H8.27L3,8.27V15.73L8.27,21H15.73L21,15.73V8.27L15.73,3Z" />
                :<path fill="#fff" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />}</svg>
                <label>{snackBarMessage}</label>
            </span>}
        />
    }
}
MySnackBar.propTypes = {
    snackBarOption: PropTypes.shape({
        open: PropTypes.bool,
        snackBarStatus: PropTypes.string,
        snackBarMessage: PropTypes.string
      }),
  };
