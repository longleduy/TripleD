import React, { PureComponent, Fragment } from 'react'
import {GET_MESSAGE_BY_CHANEL_ID } from '../../graphql/querys/chat_query'
import QueryPropRender from '../../components/hocOrProprender/QueryPropRender.jsx'
import ChatBoxForm from '../../components/header/ChatBoxForm.jsx'
export default class ChatBox2 extends PureComponent {
    render() {
        const { toUser,userID,avatar,listMessages } = this.props;
        return  <QueryPropRender
        query={GET_MESSAGE_BY_CHANEL_ID}
        variables={{ from:userID,to:toUser.id,limitNumber: 10, skipNumber: 0 }}
        queryPropRender={({ loading, data, fetchMore, subscribeToMore }) => {
            if(loading) return null;
            return <Fragment><ChatBoxForm loading={loading} subscribeToMore={subscribeToMore} fetchMore={fetchMore} data={data} toUser={toUser} userID={userID} avatar={avatar} listMessages={listMessages}/>
        </Fragment>
        }} />
    }
}