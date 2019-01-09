import React, { Fragment } from 'react'
//Todo: Propsrender
import QueryPropRender from '../../../../components/hocOrProprender/QueryPropRender.jsx'
//Todo: Styles
import postStyles from '../../../../Styles/Post.scss'
//Todo: GraphQl
import { LOAD_MORE_CMT_QUERY } from '../../../../graphql/querys/post_query'
import PrivatePostChildCommentBoxForm from '../../../../components/private/index/Post/PrivatePostChildCommentBoxForm.jsx'
export const PrivatePostChildCommentBox = React.memo((props) => {
    const { countCount, postID, idx } = props;
    return <Fragment>
        <div className={postStyles.listComment}>
            <QueryPropRender
                query={LOAD_MORE_CMT_QUERY} variables={{ postID, limitNumber: 3, skipNumber: null }}
                queryPropRender={({ loading, data, fetchMore,subscribeToMore }) => {
                    if (loading) return null
                    if (!data) {
                        throw new Error('Client Error')
                    }
                    return <PrivatePostChildCommentBoxForm 
                                subscribeToMore = {subscribeToMore}
                                fetchMore = {fetchMore}
                                countCount = {countCount} 
                                postID = {postID} 
                                listCmt = {data.loadMoreComment}
                                index = {idx}/>
                               
                }} />
        </div>
    </Fragment>
})