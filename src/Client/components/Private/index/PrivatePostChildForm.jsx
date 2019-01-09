import React, { Fragment, Component, useState, useEffect } from 'react'
import { withApollo, Mutation } from "react-apollo"
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Chip from '@material-ui/core/Chip'
import Textarea from 'react-textarea-autosize'
//Todo: Styles
import postStyles from '../../../Styles/Post.scss'
import appStyles from '../../../Styles/App.scss'
//Todo: Component
import { PrivatePostChildCommentBox } from '../../../contaniners/private/index/post/PrivatePostChildCommentBox.jsx'
//Todo: RenderProps 
import MutationPropRender from '../../hocOrProprender/MutationPropRender.jsx'
//Todo: GraphQl
import { GET_LIMITED_POSTS, LOAD_MORE_CMT_QUERY } from '../../../graphql/querys/post_query'
import { LIKE_POST_MUTATION, DEL_POST_MUTATION, COMMENT_POST_MUTATION } from '../../../graphql/mutations/post_mutation'
import { isBuffer } from 'util';
let count;
export const PrivatePostChildForm = withApollo(React.memo((props) => {
    const { post, index } = props;
    count = count || post.count.comments;
    const [delPost, setDelPost] = useState(false);
    const [viewComment, setViewComment] = useState(false);
    const showTagPost = (listTag) => {
        return listTag.map((tag, key) => {
            return <Chip key={key} label={`#${tag}`} className={`${postStyles.postTag}`} />
        })
    }
    const likePost = (e, postID, likeAction, index, action) => {
        e.preventDefault();
        const result = action({
            variables: { likeData: { postID, action: likeAction } },
            update: (store, { data: { likePost } }) => {
                let result = store.readQuery({
                    query: GET_LIMITED_POSTS,
                    variables: { limitNumber: 5, skipNumber: 0 }
                });
                result.getLimitedPost[index].count.likes = likePost.likes;
                result.getLimitedPost[index].count.liked = likePost.liked;
                store.writeQuery({
                    query: GET_LIMITED_POSTS,
                    variables: { limitNumber: 5, skipNumber: 0 },
                    data: result
                })
            }
        });
    }
    const delPostMutation = (e, postID, likes, comments, views, action, index) => {
        e.preventDefault();
        const result = action(
            {
                variables: { postID, likes, comments, views },
                update: (store, { data: { delPost } }) => {
                    let result = store.readQuery({
                        query: GET_LIMITED_POSTS,
                        variables: { limitNumber: 5, skipNumber: 0 }
                    });
                    if (delPost.status) {
                        result.getLimitedPost.splice(index, 1);
                        store.writeQuery({
                            query: GET_LIMITED_POSTS,
                            variables: { limitNumber: 5, skipNumber: 0 },
                            data: result
                        })
                    }

                }
            });
        setDelPost(false);
    }
    const delPostHandle = () => {
        setDelPost(true)
    }
    const cancelDelPostHandle = () => {
        setDelPost(false)
    }
    const commentPost = (e, postID, commentCount, index, action) => {
        const commentContent = $(e.target).val();
        if (commentContent != '') {
            const result = action({
                variables: { postID, commentContent, commentImage: '', commentCount },
                 update: (store, { data: { commentPost } }) => {
                    if (!viewComment) {
                    let result = store.readQuery({
                        query: GET_LIMITED_POSTS,
                        variables: { limitNumber: 5, skipNumber: 0 }
                    });
                    if (result != null) {
                        result.getLimitedPost[index].count.comments += 1;
                        store.writeQuery({
                            query: GET_LIMITED_POSTS,
                            variables: { limitNumber: 5, skipNumber: 0 },
                            data: result
                        });
                           setViewComment(true);
                        }
                    }
                    // if (!viewComment) {
                    //     let result2 = store.readQuery({
                    //         query: LOAD_MORE_CMT_QUERY,
                    //         variables: { postID, limitNumber: 3, skipNumber: null }
                    //     });
                    //     if (result2 != null) {
                    //         result2.loadMoreComment.push(commentPost);
                    //         store.writeQuery({
                    //             query: LOAD_MORE_CMT_QUERY,
                    //             variables: { postID, limitNumber: 3, skipNumber: null },
                    //             data: result2
                    //         });
                    //     }
                    // }
                }
            })
        }
        $(e.target).val('')
    }
    return <Fragment>
        <form onSubmit={commentPost} id={`form-${index}`}>
            <Grid container className={postStyles.postDiv}>
                <Grid item xs={6} className={postStyles.postUserInfo}>
                    {post.userInfo.avatar ? <img src={`${post.userInfo.avatar}`} className={postStyles.imgAvatar} />
                        :
                        <label className={postStyles.labelAvatar}>{post.userInfo.profileName.charAt(0)}</label>}
                    <div className={postStyles.postUserName}>
                        <label className={postStyles.profileName}>{post.userInfo.profileName}</label>
                        <label className={postStyles.postDate} name="postDate">{post.postDate}</label>
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <span className={postStyles.editPost}>
                        {delPost ? <Fragment>
                            <label className={postStyles.labelDelPost}>Delete this post?</label>
                            <MutationPropRender mutation={DEL_POST_MUTATION}
                                mutationPropRender={(action) => (
                                    <Button className={`${appStyles.buttonSvg} ${postStyles.postEditBtn} ${postStyles.delPostYes}`}
                                        onClick={e => { delPostMutation(e, post.id, post.count.likes, post.count.comments, post.count.views, action, index) }}>
                                        Yes
                                </Button>
                                )} />
                            <Button className={`${appStyles.buttonSvg} ${postStyles.postEditBtn} ${postStyles.delPostNo}`} onClick={cancelDelPostHandle}>
                                No
                        </Button>
                        </Fragment> :
                            <Fragment>
                                <Button className={`${appStyles.buttonSvg} ${postStyles.postEditBtn}`}>
                                    <svg viewBox="0 0 24 24">
                                        <path fill="#000000" d="M7,14.94L13.06,8.88L15.12,10.94L9.06,17H7V14.94M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M16.7,9.35L15.7,10.35L13.65,8.3L14.65,7.3C14.86,7.08 15.21,7.08 15.42,7.3L16.7,8.58C16.92,8.79 16.92,9.14 16.7,9.35M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2" />
                                    </svg>
                                </Button>
                                {post.isAuthor && <Button className={`${appStyles.buttonSvg} ${postStyles.postEditBtn}`} onClick={delPostHandle}>
                                    <svg viewBox="0 0 24 24">
                                        <path fill="#000000" d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M16,10V17A1,1 0 0,1 15,18H9A1,1 0 0,1 8,17V10H16M13.5,6L14.5,7H17V9H7V7H9.5L10.5,6H13.5Z" />
                                    </svg>
                                </Button>}
                                <Button className={`${appStyles.buttonSvg} ${postStyles.postEditBtn}`}>
                                    <svg viewBox="0 0 24 24">
                                        <path fill="#000000" d="M14,4V8C7,9 4,14 3,19C5.5,15.5 9,13.9 14,13.9V18L21,11L14,4M16,8.83L18.17,11L16,13.17V11.9H14C11.93,11.9 10.07,12.28 8.34,12.85C9.74,11.46 11.54,10.37 14.28,10L16,9.73V8.83Z" />
                                    </svg>
                                </Button>
                            </Fragment>
                        }
                    </span>
                </Grid>
                <Grid item xs={12} className={postStyles.contentDiv}>
                    <label className={postStyles.content}>{post.content}</label>
                </Grid>
                {post.image && <Grid item xs={12} className={postStyles.postImageDiv}>
                    <img src={`${post.image}`} className={postStyles.postImage} />
                </Grid>}
                <Grid item xs={12} className={postStyles.postTagDiv}>
                    <span className={postStyles.spanBorder}>.</span>
                    <Grid container>
                        <Grid item xs={9}>
                            {showTagPost(post.tag)}
                        </Grid>
                    </Grid>
                </Grid>
                <span className={`${postStyles.buttonLike}`}>
                    <MutationPropRender mutation={LIKE_POST_MUTATION}
                        mutationPropRender={(action) => (
                            <Button className={`${appStyles.buttonSvg}`}
                                onClick={(e) => {
                                    const likeAction = post.count.liked ? 'dislike' : 'like'
                                    return likePost(e, post.id, likeAction, index, action)
                                }}>
                                <svg viewBox="0 0 24 24">
                                    {post.count.liked ?
                                        <path fill="#ffe000" d="M13.5,20C6.9,13.9 3.5,10.8 3.5,7.1C3.5,4 5.9,1.6 9,1.6C10.7,1.6 12.4,2.4 13.5,3.7C14.6,2.4 16.3,1.6 18,1.6C21.1,1.6 23.5,4 23.5,7.1C23.5,10.9 20.1,14 13.5,20M12,21.1C5.4,15.2 1.5,11.7 1.5,7C1.5,6.8 1.5,6.6 1.5,6.4C0.9,7.3 0.5,8.4 0.5,9.6C0.5,13.4 3.9,16.5 10.5,22.4L12,21.1Z" />
                                        : <path fill="#cccc" d="M12,21.1L10.5,22.4C3.9,16.5 0.5,13.4 0.5,9.6C0.5,8.4 0.9,7.3 1.5,6.4C1.5,6.6 1.5,6.8 1.5,7C1.5,11.7 5.4,15.2 12,21.1M13.6,17C18.3,12.7 21.5,9.9 21.6,7C21.6,5 20.1,3.5 18.1,3.5C16.5,3.5 15,4.5 14.5,5.9H12.6C12,4.5 10.5,3.5 9,3.5C7,3.5 5.5,5 5.5,7C5.5,9.9 8.6,12.7 13.4,17L13.5,17.1M18,1.5C21.1,1.5 23.5,3.9 23.5,7C23.5,10.7 20.1,13.8 13.5,19.8C6.9,13.9 3.5,10.8 3.5,7C3.5,3.9 5.9,1.5 9,1.5C10.7,1.5 12.4,2.3 13.5,3.6C14.6,2.3 16.3,1.5 18,1.5Z" />
                                    }
                                </svg>
                                <label className={post.count.liked ? postStyles.labelLiked : null}>{post.count.likes} votes</label>
                            </Button>
                        )} />
                    <Button className={`${appStyles.buttonSvg}`} onClick={() => setViewComment(true)}>
                        <svg viewBox="0 0 24 24" >
                            <path fill="#cccc" d="M9,22A1,1 0 0,1 8,21V18H4A2,2 0 0,1 2,16V4C2,2.89 2.9,2 4,2H20A2,2 0 0,1 22,4V16A2,2 0 0,1 20,18H13.9L10.2,21.71C10,21.9 9.75,22 9.5,22V22H9M10,16V19.08L13.08,16H20V4H4V16H10M6,7H18V9H6V7M6,11H15V13H6V11Z" />
                        </svg>
                        <label>{post.count.comments} comments</label>
                    </Button>
                    <Button className={`${appStyles.buttonSvg} ${postStyles.buttonReport}`}>
                        <svg viewBox="0 0 24 24">
                            <path fill="#cccc" d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C8.17,3 8.82,3.12 9.44,3.33L13,9.35L9,14.35L12,21.35V21.35M16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35L11,14.35L15.5,9.35L12.85,4.27C13.87,3.47 15.17,3 16.5,3Z" />
                        </svg>
                        <label>{post.count.views} reports</label>
                    </Button>
                </span>
                {viewComment && post.count.comments > 0 && <PrivatePostChildCommentBox countCount={post.count} postID={post.id} idx={index}/>}
                <Grid item xs={12} className={postStyles.postCommentBox}>
                    <MutationPropRender mutation={COMMENT_POST_MUTATION}
                        mutationPropRender={(action) => (
                            <Textarea placeholder="Type your comments..." minRows={2}
                                onKeyPress={(e) => {
                                    if (e.which == 13 && !e.shiftKey) {
                                        e.preventDefault();
                                        return commentPost(e, post.id, post.count.comments, index, action);
                                    }
                                }}
                            />
                        )} />
                </Grid>
            </Grid>
        </form>
    </Fragment>
}))