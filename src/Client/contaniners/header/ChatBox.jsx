import React, { PureComponent } from 'react'
import { Query } from "react-apollo"
import ChatBox2 from './ChatBox2.jsx'
import { QUERY_CHATBOX_INFO } from '../../graphql/local/state_mutation'
export default class ChatBox extends PureComponent {
    render() {
        const { avatar, userID } = this.props;
        return <Query query={QUERY_CHATBOX_INFO}>
            {({ loading, error, data }) => {
                if (loading) return null
                if (!data.chatChanel.isOpen) return null
                if (data.chatChanel.isOpen) return <ChatBox2
                        toUser={data.chatChanel.toUser} avatar={avatar} userID={userID} />
            }}
            
        </Query>
    }
}