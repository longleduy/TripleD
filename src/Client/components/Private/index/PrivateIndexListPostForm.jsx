import React, { Fragment, Component } from 'react'
import {PrivatePostChildForm} from './PrivatePostChildForm.jsx'
export const PrivateIndexListPostForm = React.memo((props) => {
   const { listPost } = props;
    return listPost.map((post, key) => {
        const likes = post.count.likes;
        const comments = post.count.comments;
        const liked = post.count.liked;
        return <PrivatePostChildForm key={key} post={post} likes={likes} comments={comments} index = {key} liked={liked}/>
    })

})