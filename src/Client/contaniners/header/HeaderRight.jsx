import React, { Fragment, PureComponent, useEffect } from 'react'
import HeaderRightForm from '../../components/header/HeaderRightForm.jsx'
import HeaderRightLoadingForm from '../../components/header/HeaderRightLoadingForm.jsx'
import QueryPropRender from '../../components/hocOrProprender/QueryPropRender.jsx'
//Todo: GraphQL
import { GET_NOTIFICATION_INFO } from '../../graphql/querys/user_query'

export const HeaderRight = React.memo((props) => {
    const setTitle = (newNotifications) => {
        if (newNotifications > 0) {
            document.title = `(${newNotifications}) - TripleD`
        }
        else {
            document.title = `TripleD`
        }
    }
    useEffect(() => {
        return () => {
            document.title = `TripleD`
        }
    })
    if (location.pathname == '/error') {
        return <HeaderRightLoadingForm />
    }
    return <QueryPropRender
        query={GET_NOTIFICATION_INFO}
        queryPropRender={({ loading, data, fetchMore, subscribeToMore }) => {
            if (loading) return <HeaderRightLoadingForm />;
            return < Fragment >
                <HeaderRightForm
                    loadingNotifi={loading}
                    notifData={data}
                    userID={props.userID}
                    subscribeToMore={subscribeToMore} />
                {data && setTitle(data.getNotificationInfo.newNotifications)}
            </Fragment>
        }} />
})
