import React, { Fragment, PureComponent, Component } from 'react'
import { Link, } from 'react-router-dom'
import { withApollo } from "react-apollo"
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'

import HeaderRightListNotificationForm from './HeaderRightListNotificationForm.jsx'

//Todo: Scss
import styles from '../../Styles/Header.scss'
import appStyles from '../../Styles/App.scss'
//Todo: Utils
import { getActionIcon ,getActionIcon2} from '../../utils/commons/common'
//Todo: GraphQL
import { NOTIFICATION_SUBSCRIPTION } from '../../graphql/subscriptions/user_subcription'
import { GET_NOTIFICATION_INFO } from '../../graphql/querys/user_query'
class HeaderRightForm extends PureComponent {
    constructor(props) {
        super(props);
        this.testRef = React.createRef();
    }
    handleOpen = (status,count) => {
        this.testRef.current.handleOpen(status,count);
        if (status != 'message' && count != 0) {
            const data = this.props.client.readQuery({ query: GET_NOTIFICATION_INFO });
            const dataClone = { ...data }
            dataClone.getNotificationInfo.newNotifications.likeAndComments = 0;
            this.props.client.writeQuery({ query: GET_NOTIFICATION_INFO, data: dataClone });
        }
        else if (status == 'message' && count != 0) {
            const data = this.props.client.readQuery({ query: GET_NOTIFICATION_INFO });
            const dataClone = { ...data }
            dataClone.getNotificationInfo.newNotifications.messages = 0;
            this.props.client.writeQuery({ query: GET_NOTIFICATION_INFO, data: dataClone });
        }
    }
    componentWillMount() {
        const { userID } = this.props;
        this.props.subscribeToMore({
            document: NOTIFICATION_SUBSCRIPTION,
            variables: { userID },
            updateQuery: (prev, result) => {
                const notificationInfo = result.subscriptionData.data.notificationPostSub;
                let newData = { ...prev.getNotificationInfo };
                if (result.subscriptionData.data.notificationPostSub.action && result.subscriptionData.data.notificationPostSub.action != 'CHAT') {
                    newData.newNotifications.likeAndComments = prev.getNotificationInfo.newNotifications.likeAndComments + 1;
                }
                else if(result.subscriptionData.data.notificationPostSub.action && result.subscriptionData.data.notificationPostSub.action == 'CHAT'){
                    newData.newNotifications.messages = prev.getNotificationInfo.newNotifications.messages + 1;
                }
                newData.newestNotificationInfo = notificationInfo;
                $(`.${styles.notifiactionUser}`).addClass(`${styles.notifiactionUserNewNotiti}`);
                setTimeout(() => {
                    $(`.${styles.notifiactionUser}`).removeClass(`${styles.notifiactionUserNewNotiti}`);
                }, 3000);
                var x = document.getElementById("myAudio");
                x.play();
                return {
                    getNotificationInfo: newData
                }
            }
        });
    }
    render() {
        const { notifData } = this.props;
        const likeAndComments = !$.isEmptyObject(notifData) ? notifData.getNotificationInfo.newNotifications.likeAndComments : 0;
        const messages = !$.isEmptyObject(notifData) ? notifData.getNotificationInfo.newNotifications.messages : 0;
        const newestNotificationInfo = !$.isEmptyObject(notifData) ? notifData.getNotificationInfo.newestNotificationInfo : null;
        return <Fragment>
            <div className={styles.notifiactionDiv}>
                <div className={styles.newestNotifiactionDiv}>
                    <Grid container className={styles.newestNotifiactionChild}>
                        {newestNotificationInfo && <Fragment>
                            <div className={styles.notifiactionUser}>
                                {newestNotificationInfo.formUserAvatar ?
                                    <img src={`${newestNotificationInfo.formUserAvatar}`} className={styles.formUserAvatar} /> :
                                    <label class={styles.notifiactionLabelAvatar}>{newestNotificationInfo.formUserName.charAt(0)}</label>}
                                <span className={styles.notifiactionContent}>
                                    <label className={styles.notifiactionUserName}>{newestNotificationInfo.formUserName}</label>
                                    <label>{newestNotificationInfo.content}</label>
                                    <label className={styles.notifiactionTime}>{newestNotificationInfo.actionTime}</label>
                                </span>
                                {getActionIcon2(newestNotificationInfo.action)}
                                {newestNotificationInfo.postID && <label className={styles.postIDLabel}>PostID: {newestNotificationInfo.postID}</label>}
                            </div>
                        </Fragment>}
                    </Grid>
                </div>
                <Button className={`${appStyles.buttonSvg} ${styles.menuButton}`} onClick={() => this.handleOpen('like_cmt',likeAndComments > 0 ? likeAndComments : 0)}>
                    <svg viewBox="0 0 24 24">
                        <path fill="#ccc" d="M21,19V20H3V19L5,17V11C5,7.9 7.03,5.17 10,4.29C10,4.19 10,4.1 10,4A2,2 0 0,1 12,2A2,2 0 0,1 14,4C14,4.1 14,4.19 14,4.29C16.97,5.17 19,7.9 19,11V17L21,19M14,21A2,2 0 0,1 12,23A2,2 0 0,1 10,21" />
                    </svg>
                    <label className={styles.buttonLabel}>Notification</label>
                    {likeAndComments > 0 && <label className={styles.countNoti}>{likeAndComments}</label>}
                </Button>
                <Button className={`${appStyles.buttonSvg}  ${styles.menuButton}`} onClick={() => this.handleOpen('message',messages > 0 ? messages : 0)}>
                    <svg viewBox="0 0 24 24">
                        <path fill="#ccc" d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z" />
                    </svg>
                    <label className={styles.buttonLabel}>Messages</label>
                    {messages > 0 && <label className={styles.countMess}>{messages}</label>}
                </Button>
            </div>
            <audio id="myAudio">
                <source src={require(`../../../../public/audio/notification/plucky.mp3`)} type="audio/mpeg" />
            </audio>
            <HeaderRightListNotificationForm ref={this.testRef} />
        </Fragment >
    }
}
export default withApollo(HeaderRightForm);