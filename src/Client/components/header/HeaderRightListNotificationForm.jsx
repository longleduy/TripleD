
import React, { PureComponent } from 'react'
import { withApollo } from "react-apollo"
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
//Todo: PropsRender
import QueryPropRender from '../../components/hocOrProprender/QueryPropRender.jsx'
import MutationPropRender from '../../components/hocOrProprender/MutationPropRender.jsx'
//Todo: Graphql
import { GET_NOTIFICATION_POSTS,GET_MESSAGE_POSTS } from '../../graphql/querys/notification_query'
import {UPDATE_CHAT_BOX_MUTATION} from '../../graphql/mutations/user_mutation'
//Todo: Styles
import styles from '../../Styles/Header/NotificationList.scss'
//Todo: Utils
import { getActionIcon } from '../../utils/commons/common'
function Transition(props) {
    return <Slide direction="up" {...props} />;
}
let loadMore;
class HeaderRightListNotificationForm extends PureComponent {
    state = {
        open: false,
        status:''
    }
    handleClose = () => {
        this.setState({ open: false,status:'' })
    }
    handleOpen = (status,newNotifications) => {
        this.setState({ open: true,status });
    }
    addEventLoadMore = (fetchMore,length) => {
        $('#listNotification').off("scroll",loadMore);
        $('#listNotification').on("scroll", loadMore = function(){
            if (($('#listNotification').scrollTop()) >= ($('#listNotification').get(0).scrollHeight - 500)) {
                $('#listNotification').off("scroll",loadMore);
                fetchMore({
                  variables: { limitNumber: 10, skipNumber:length },
                  updateQuery: (previousResult, { fetchMoreResult }) => {
                      const prevPost = previousResult.getNotification;
                      const newPost = fetchMoreResult.getNotification;
                      return {
                        getNotification: [...prevPost, ...newPost]
                      }
                  }
              })
            }
         })
      }
      addEventLoadMoreMessage = (fetchMore,length) => {
        $('#listNotification').off("scroll",loadMore);
        $('#listNotification').on("scroll", loadMore = function(){
            if (($('#listNotification').scrollTop()) >= ($('#listNotification').get(0).scrollHeight - 500)) {
                $('#listNotification').off("scroll",loadMore);
                fetchMore({
                  variables: { limitNumber: 10, skipNumber:length },
                  updateQuery: (previousResult, { fetchMoreResult }) => {
                      const prevPost = previousResult.getMessage;
                      const newPost = fetchMoreResult.getMessage;
                      return {
                        getMessage: [...prevPost, ...newPost]
                      }
                  }
              })
            }
         })
      }
      openChatBox = async (action,to) => {
        let result = await action({
            variables: { isOpen: true, to}
        });
        this.handleClose();
      }
    render() {
        return <Dialog
            open={this.state.open}
            className={styles.dialogListNotification}
            TransitionComponent={Transition}
            keepMounted
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title">{this.state.status == 'message'?"Messages":"Notifications"}</DialogTitle>
            <DialogContent className={styles.dialogContent} id="listNotification">
                 {this.state.open && this.state.status != 'message' && <QueryPropRender
                    query={GET_NOTIFICATION_POSTS}
                    variables={{ limitNumber: 10, skipNumber: 0 }}
                    queryPropRender={({ loading, data, fetchMore, subscribeToMore }) => {
                        if (loading) return <div className={styles.loadingListNotification}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                                <path transform="translate(2)" d="M0 12 V20 H4 V12z">
                                    <animate attributeName="d" values="M0 12 V20 H4 V12z; M0 4 V28 H4 V4z; M0 12 V20 H4 V12z; M0 12 V20 H4 V12z" dur="1.2s" repeatCount="indefinite" begin="0" keyTimes="0;.2;.5;1" keySplines="0.2 0.2 0.4 0.8;0.2 0.6 0.4 0.8;0.2 0.8 0.4 0.8" calcMode="spline" />
                                </path>
                                <path transform="translate(8)" d="M0 12 V20 H4 V12z">
                                    <animate attributeName="d" values="M0 12 V20 H4 V12z; M0 4 V28 H4 V4z; M0 12 V20 H4 V12z; M0 12 V20 H4 V12z" dur="1.2s" repeatCount="indefinite" begin="0.2" keyTimes="0;.2;.5;1" keySplines="0.2 0.2 0.4 0.8;0.2 0.6 0.4 0.8;0.2 0.8 0.4 0.8" calcMode="spline" />
                                </path>
                                <path transform="translate(14)" d="M0 12 V20 H4 V12z">
                                    <animate attributeName="d" values="M0 12 V20 H4 V12z; M0 4 V28 H4 V4z; M0 12 V20 H4 V12z; M0 12 V20 H4 V12z" dur="1.2s" repeatCount="indefinite" begin="0.4" keyTimes="0;.2;.5;1" keySplines="0.2 0.2 0.4 0.8;0.2 0.6 0.4 0.8;0.2 0.8 0.4 0.8" calcMode="spline" />
                                </path>
                                <path transform="translate(20)" d="M0 12 V20 H4 V12z">
                                    <animate attributeName="d" values="M0 12 V20 H4 V12z; M0 4 V28 H4 V4z; M0 12 V20 H4 V12z; M0 12 V20 H4 V12z" dur="1.2s" repeatCount="indefinite" begin="0.6" keyTimes="0;.2;.5;1" keySplines="0.2 0.2 0.4 0.8;0.2 0.6 0.4 0.8;0.2 0.8 0.4 0.8" calcMode="spline" />
                                </path>
                                <path transform="translate(26)" d="M0 12 V20 H4 V12z">
                                    <animate attributeName="d" values="M0 12 V20 H4 V12z; M0 4 V28 H4 V4z; M0 12 V20 H4 V12z; M0 12 V20 H4 V12z" dur="1.2s" repeatCount="indefinite" begin="0.8" keyTimes="0;.2;.5;1" keySplines="0.2 0.2 0.4 0.8;0.2 0.6 0.4 0.8;0.2 0.8 0.4 0.8" calcMode="spline" />
                                </path>
                            </svg>
                        </div>
                        else if (data.getNotification.length == 0) return <div className={styles.loadingListNotification}>
                            <svg viewBox="0 0 24 24" className={styles.emptyNotification}>
                                <path d="M20.37,8.91L19.37,10.64L7.24,3.64L8.24,1.91L11.28,3.66L12.64,3.29L16.97,5.79L17.34,7.16L20.37,8.91M6,19V7H11.07L18,11V19A2,2 0 0,1 16,21H8A2,2 0 0,1 6,19Z" />
                            </svg>
                        </div>
                        return <div className={styles.listNotificationsDiv}>
                            {data.getNotification.map((notification, key) => {
                                return <div key={key} className={`${styles.notificationDiv} ${notification.isReadNotif ? null : styles.notReadNotification}`}>
                                    {notification.fromUser.avatar ?
                                        <img src={`${notification.fromUser.avatar}`} className={styles.formUserAvatar} /> :
                                        <label className={styles.notifiactionLabelAvatar}>{notification.fromUser.profileName.charAt(0)}</label>}
                                    <span className={styles.notifiactionContent}>
                                        <label className={styles.notifiactionUserName}>{notification.fromUser.profileName}</label>
                                        <label>{notification.content}</label>
                                        <label className={styles.notifiactionTime} name="postDate">{notification.actionTime}</label>
                                        <span className={`${styles.postIDSpan} ${notification.action == 'LIKE' ? styles.LIKE : styles.COMMENT}`}>
                                            {getActionIcon(notification.action)}<label className={styles.postIDLabel}>PostID: {notification.postID}</label>
                                        </span>
                                    </span>
                                    
                                </div>
                            })}
                            {this.addEventLoadMore(fetchMore,data.getNotification.length)}
                        </div>

                    }} />
                } 

                {this.state.open && this.state.status == 'message' && <QueryPropRender
                    query={GET_MESSAGE_POSTS}
                    variables={{ limitNumber: 10, skipNumber: 0 }}
                    queryPropRender={({ loading, data, fetchMore, subscribeToMore }) => {
                        if (loading) return <div className={styles.loadingListNotification}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                                <path transform="translate(2)" d="M0 12 V20 H4 V12z">
                                    <animate attributeName="d" values="M0 12 V20 H4 V12z; M0 4 V28 H4 V4z; M0 12 V20 H4 V12z; M0 12 V20 H4 V12z" dur="1.2s" repeatCount="indefinite" begin="0" keyTimes="0;.2;.5;1" keySplines="0.2 0.2 0.4 0.8;0.2 0.6 0.4 0.8;0.2 0.8 0.4 0.8" calcMode="spline" />
                                </path>
                                <path transform="translate(8)" d="M0 12 V20 H4 V12z">
                                    <animate attributeName="d" values="M0 12 V20 H4 V12z; M0 4 V28 H4 V4z; M0 12 V20 H4 V12z; M0 12 V20 H4 V12z" dur="1.2s" repeatCount="indefinite" begin="0.2" keyTimes="0;.2;.5;1" keySplines="0.2 0.2 0.4 0.8;0.2 0.6 0.4 0.8;0.2 0.8 0.4 0.8" calcMode="spline" />
                                </path>
                                <path transform="translate(14)" d="M0 12 V20 H4 V12z">
                                    <animate attributeName="d" values="M0 12 V20 H4 V12z; M0 4 V28 H4 V4z; M0 12 V20 H4 V12z; M0 12 V20 H4 V12z" dur="1.2s" repeatCount="indefinite" begin="0.4" keyTimes="0;.2;.5;1" keySplines="0.2 0.2 0.4 0.8;0.2 0.6 0.4 0.8;0.2 0.8 0.4 0.8" calcMode="spline" />
                                </path>
                                <path transform="translate(20)" d="M0 12 V20 H4 V12z">
                                    <animate attributeName="d" values="M0 12 V20 H4 V12z; M0 4 V28 H4 V4z; M0 12 V20 H4 V12z; M0 12 V20 H4 V12z" dur="1.2s" repeatCount="indefinite" begin="0.6" keyTimes="0;.2;.5;1" keySplines="0.2 0.2 0.4 0.8;0.2 0.6 0.4 0.8;0.2 0.8 0.4 0.8" calcMode="spline" />
                                </path>
                                <path transform="translate(26)" d="M0 12 V20 H4 V12z">
                                    <animate attributeName="d" values="M0 12 V20 H4 V12z; M0 4 V28 H4 V4z; M0 12 V20 H4 V12z; M0 12 V20 H4 V12z" dur="1.2s" repeatCount="indefinite" begin="0.8" keyTimes="0;.2;.5;1" keySplines="0.2 0.2 0.4 0.8;0.2 0.6 0.4 0.8;0.2 0.8 0.4 0.8" calcMode="spline" />
                                </path>
                            </svg>
                        </div>
                        else if (data.getMessage.length == 0) return <div className={styles.loadingListNotification}>
                            <svg viewBox="0 0 24 24" className={styles.emptyNotification}>
                                <path d="M20.37,8.91L19.37,10.64L7.24,3.64L8.24,1.91L11.28,3.66L12.64,3.29L16.97,5.79L17.34,7.16L20.37,8.91M6,19V7H11.07L18,11V19A2,2 0 0,1 16,21H8A2,2 0 0,1 6,19Z" />
                            </svg>
                        </div>
                        return <MutationPropRender mutation={UPDATE_CHAT_BOX_MUTATION}
                        mutationPropRender={(action, { data2, loading, error }) => (
                        <div className={styles.listNotificationsDiv}>
                            {data.getMessage.map((notification, key) => {
                                return <div key={key} 
                                        onClick={() => this.openChatBox(action,notification.fromUser)}
                                className={`${styles.notificationDiv} ${notification.isReadNotif ? null : styles.notReadNotification}`}>
                                    {notification.fromUser.avatar ?
                                        <img src={`${notification.fromUser.avatar}`} className={styles.formUserAvatar} /> :
                                        <label className={styles.notifiactionLabelAvatar}>{notification.fromUser.profileName.charAt(0)}</label>}
                                    <span className={styles.notifiactionContent}>
                                        <label className={styles.notifiactionUserName}>{notification.fromUser.profileName}</label>
                                        <label>{notification.content}</label>
                                        <label className={styles.notifiactionTime} name="postDate">{notification.actionTime}</label>
                                    </span>
                                    
                                </div>
                            })}
                             {this.addEventLoadMoreMessage(fetchMore,data.getMessage.length)} 
                        </div>
                        )} />
                    }} />
                }
            </DialogContent>
            <DialogActions >

            </DialogActions>
        </Dialog>
    }

}
export default HeaderRightListNotificationForm;
