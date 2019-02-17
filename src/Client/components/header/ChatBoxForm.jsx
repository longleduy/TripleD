import React, { PureComponent, Fragment } from 'react'
import { Query } from "react-apollo"
import Grid from '@material-ui/core/Grid'
import Textarea from 'react-textarea-autosize'
import MutationPropRender from '../hocOrProprender/MutationPropRender.jsx'
import MutationPropRender2 from '../hocOrProprender/MutationPropRender2.jsx'
//Todo: Graphql
import { UPDATE_CHAT_BOX_MUTATION } from '../../graphql/mutations/user_mutation'
import {SEND_MESSAGES_MUTATION} from '../../graphql/mutations/message_mutation'
import {NEW_MESSAGE_SUBSCRIPTION} from '../../graphql/subscriptions/message_subcription'
import styles from '../../Styles/Header/ChatBox.scss'
let loadMore;
export default class ChatBoxForm extends PureComponent {
    constructor(props) {
        super(props);
        this.contentRef = React.createRef();
    }
    componentWillMount() {
        let { toUser, userID } = this.props;
        this.props.subscribeToMore({
            document: NEW_MESSAGE_SUBSCRIPTION,
            variables: { from : userID,to: toUser.id},
            updateQuery: (prev, result) => {
                let newMessage = result.subscriptionData.data.newMessageSub;
                if(newMessage){
                    let newList = [...prev.getChatMessageByChanelId];
                    newList.unshift(newMessage);
                    return {
                        getChatMessageByChanelId: newList
                    }
                }

            }
        });
    }
    componentDidMount() {
        let { fetchMore, data } = this.props;
        let length = data.getChatMessageByChanelId.length;
        this.addEventLoadMoreMessage(fetchMore, length);
    }
    closeChatBox = async (action) => {
        let result = await action({
            variables: { isOpen: false }
        });
    }
    addEventLoadMoreMessage = (fetchMore, length) => {
        $('#myMessages').off("scroll", loadMore);
        $('#myMessages').on("scroll", loadMore = function () {
            if (($('#myMessages').scrollTop()) >= ($('#myMessages').get(0).scrollHeight - 300)) {
                $('#myMessages').off("scroll", loadMore);
                fetchMore({
                    variables: { limitNumber: 10, skipNumber: length },
                    updateQuery: (previousResult, { fetchMoreResult }) => {
                        const prevPost = previousResult.getChatMessageByChanelId;
                        const newPost = fetchMoreResult.getChatMessageByChanelId;
                        return {
                            getChatMessageByChanelId: [...prevPost, ...newPost]
                        }
                    }
                })
            }
        })
    }
    sendMessage = async (e,actionMutation) => {
        e.preventDefault();
        let { toUser, userID } = this.props;
        let contentMessage = this.contentRef.current._ref.value;
        if(contentMessage !== '' && contentMessage != null){
            let result = await actionMutation({
                variables:{
                    from: userID,
                    to: toUser.id,
                    content:contentMessage
                }
            })
            this.contentRef.current._ref.value = '';
        }
    }
    render() {
        let { toUser, userID, avatar, listMessages, loading, data, fetchMore } = this.props;
        let length = data.getChatMessageByChanelId.length;
        { this.addEventLoadMoreMessage(fetchMore, length) }
        const myInfo = {
            id: userID,
            avatar
        }
        if (loading) return null;
        return <Fragment>
            <div className={styles.mainChatBox}>
                <MutationPropRender mutation={UPDATE_CHAT_BOX_MUTATION}
                    mutationPropRender={(action) => (
                        <svg viewBox="0 0 24 24" className={styles.cancelMessageBox} onClick={() => this.closeChatBox(action)}>
                            <path fill="#000000" d="M19,3H16.3H7.7H5A2,2 0 0,0 3,5V7.7V16.4V19A2,2 0 0,0 5,21H7.7H16.4H19A2,2 0 0,0 21,19V16.3V7.7V5A2,2 0 0,0 19,3M15.6,17L12,13.4L8.4,17L7,15.6L10.6,12L7,8.4L8.4,7L12,10.6L15.6,7L17,8.4L13.4,12L17,15.6L15.6,17Z" />
                        </svg>
                    )} />
                <MutationPropRender mutation={SEND_MESSAGES_MUTATION}
                    mutationPropRender={(action2) => (
                        <Fragment>
                            <Textarea className={styles.chatBox} placeholder="Type your messages..." minRows={3} ref={this.contentRef}
                                onKeyPress={(e) => {
                                    if (e.which == 13 && !e.shiftKey) {
                                        e.preventDefault();
                                        return this.sendMessage(e,action2);
                                    }
                                }}
                            />
                        </Fragment>
                    )} />
                <Grid container className={styles.messagesList}>
                    <Grid item xs={12} className={styles.myMessages} id="myMessages">
                        {data.getChatMessageByChanelId.map((message, key) => {
                            return <Fragment key={key}> {message.fromUserId != myInfo.id ?
                                <span className={styles.messageInfoFrom}>
                                    {toUser.avatar?<img src={`${toUser.avatar}`} className={styles.avatar} />:
                                    <label className={styles.avatarLabel}>{toUser.profileName.charAt(0)}</label>
                                    }
                                    <label title={message.chatTime} className={styles.content}>{message.content}</label>
                                </span> :
                                <span className={styles.messageInfoMain}>
                                    <label title={message.chatTime} className={styles.content}>{message.content}</label>
                                    {/* <img src={`${myInfo.avatar}`} className={styles.avatar} /> */}
                                </span>
                            }
                            </Fragment>
                        })}
                    </Grid>
                </Grid>

                <span className={styles.toUserInfo}>
                    {toUser.avatar?<img src={`${toUser.avatar}`} className={styles.toUserInfoAvatar} />:
                    <label className={styles.avatarLabelInfo}>{toUser.profileName.charAt(0)}</label>
                                    }
                    <label className={styles.toUserInfoName}>{toUser.profileName}</label>
                </span>
            </div>
        </Fragment>
    }
}