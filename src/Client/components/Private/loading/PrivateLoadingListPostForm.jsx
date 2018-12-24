import React, { Fragment, Component } from 'react'
import Grid from '@material-ui/core/Grid'
import Chip from '@material-ui/core/Chip'
import Button from '@material-ui/core/Button'
import Textarea from 'react-textarea-autosize'
import CircularProgress from '@material-ui/core/CircularProgress'
import postStyles from '../../../Styles/Post.scss'
import appStyles from '../../../Styles/App.scss'
export const PrivateLoadingListPostForm = React.memo((props) => {
    return [1,2].map((post, key) => { return <Fragment key={key}>
        <Grid container className={postStyles.postDiv}>
        <div className={postStyles.loadingDiv}>
            <CircularProgress className={postStyles.myCircularProgress} thickness={5} size={24} />
        </div>
            <Grid item xs={6} className={postStyles.postUserInfo}>
                <img src={require(`../../../../../public/images/user/default-avatar.jpg`)} className={postStyles.imgAvatar} />
                <div className={postStyles.postUserName}>
                    <label className={postStyles.loadingUserName}></label>
                    <label className={postStyles.loadingDate}></label>
                </div>
            </Grid>
            <Grid item xs={6}>
            <span className={postStyles.editPost}>
                    <Button className={`${appStyles.buttonSvg} ${postStyles.postEditBtn}`}>
                        <svg viewBox="0 0 24 24">
                            <path fill="#000000" d="M7,14.94L13.06,8.88L15.12,10.94L9.06,17H7V14.94M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M16.7,9.35L15.7,10.35L13.65,8.3L14.65,7.3C14.86,7.08 15.21,7.08 15.42,7.3L16.7,8.58C16.92,8.79 16.92,9.14 16.7,9.35M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2" />
                        </svg>
                    </Button>
                    <Button className={`${appStyles.buttonSvg} ${postStyles.postEditBtn}`}>
                        <svg viewBox="0 0 24 24">
                            <path fill="#000000" d="M14,4V8C7,9 4,14 3,19C5.5,15.5 9,13.9 14,13.9V18L21,11L14,4M16,8.83L18.17,11L16,13.17V11.9H14C11.93,11.9 10.07,12.28 8.34,12.85C9.74,11.46 11.54,10.37 14.28,10L16,9.73V8.83Z" />
                        </svg>
                    </Button>
                </span>
            </Grid>
            <Grid item xs={12} className={postStyles.contentDiv}>
                <label className={postStyles.loadingContent}></label>
                <label className={postStyles.loadingContent}></label>
                <label className={postStyles.loadingContentW50}></label>
            </Grid>
            <Grid item xs={12} className={postStyles.postTagDiv}>
                <span className={postStyles.spanBorder}>.</span>
                <Grid container>
                    <Grid item xs={9}>
                        <Chip label="#" className={`${postStyles.postTag} ${postStyles.loadingPostTag}` } />
                        <Chip label="#" className={`${postStyles.postTag} ${postStyles.loadingPostTag}` } />
                        <Chip label="#" className={`${postStyles.postTag} ${postStyles.loadingPostTag}` } />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} className={postStyles.postCommentBox}>
                <Textarea placeholder="Type your comments..." />
            </Grid>
            <span className={`${postStyles.buttonLike}`}>
                <Button className={`${appStyles.buttonSvg}`}>
                    <svg viewBox="0 0 24 24">
                        <path fill="#cccc" d="M12,21.1L10.5,22.4C3.9,16.5 0.5,13.4 0.5,9.6C0.5,8.4 0.9,7.3 1.5,6.4C1.5,6.6 1.5,6.8 1.5,7C1.5,11.7 5.4,15.2 12,21.1M13.6,17C18.3,12.7 21.5,9.9 21.6,7C21.6,5 20.1,3.5 18.1,3.5C16.5,3.5 15,4.5 14.5,5.9H12.6C12,4.5 10.5,3.5 9,3.5C7,3.5 5.5,5 5.5,7C5.5,9.9 8.6,12.7 13.4,17L13.5,17.1M18,1.5C21.1,1.5 23.5,3.9 23.5,7C23.5,10.7 20.1,13.8 13.5,19.8C6.9,13.9 3.5,10.8 3.5,7C3.5,3.9 5.9,1.5 9,1.5C10.7,1.5 12.4,2.3 13.5,3.6C14.6,2.3 16.3,1.5 18,1.5Z" />
                    </svg>
                    <label >__ likes</label>
                </Button>
                <Button className={`${appStyles.buttonSvg}`}>
                    <svg viewBox="0 0 24 24" >
                        <path fill="#cccc" d="M9,22A1,1 0 0,1 8,21V18H4A2,2 0 0,1 2,16V4C2,2.89 2.9,2 4,2H20A2,2 0 0,1 22,4V16A2,2 0 0,1 20,18H13.9L10.2,21.71C10,21.9 9.75,22 9.5,22V22H9M10,16V19.08L13.08,16H20V4H4V16H10M6,7H18V9H6V7M6,11H15V13H6V11Z" />
                    </svg>
                    <label>__ comments</label>
                </Button>
                <Button className={`${appStyles.buttonSvg}`}>
                    <svg viewBox="0 0 24 24">
                        <path fill="#cccc" d="M17.81,4.47C17.73,4.47 17.65,4.45 17.58,4.41C15.66,3.42 14,3 12,3C10.03,3 8.15,3.47 6.44,4.41C6.2,4.54 5.9,4.45 5.76,4.21C5.63,3.97 5.72,3.66 5.96,3.53C7.82,2.5 9.86,2 12,2C14.14,2 16,2.47 18.04,3.5C18.29,3.65 18.38,3.95 18.25,4.19C18.16,4.37 18,4.47 17.81,4.47M3.5,9.72C3.4,9.72 3.3,9.69 3.21,9.63C3,9.47 2.93,9.16 3.09,8.93C4.08,7.53 5.34,6.43 6.84,5.66C10,4.04 14,4.03 17.15,5.65C18.65,6.42 19.91,7.5 20.9,8.9C21.06,9.12 21,9.44 20.78,9.6C20.55,9.76 20.24,9.71 20.08,9.5C19.18,8.22 18.04,7.23 16.69,6.54C13.82,5.07 10.15,5.07 7.29,6.55C5.93,7.25 4.79,8.25 3.89,9.5C3.81,9.65 3.66,9.72 3.5,9.72M9.75,21.79C9.62,21.79 9.5,21.74 9.4,21.64C8.53,20.77 8.06,20.21 7.39,19C6.7,17.77 6.34,16.27 6.34,14.66C6.34,11.69 8.88,9.27 12,9.27C15.12,9.27 17.66,11.69 17.66,14.66A0.5,0.5 0 0,1 17.16,15.16A0.5,0.5 0 0,1 16.66,14.66C16.66,12.24 14.57,10.27 12,10.27C9.43,10.27 7.34,12.24 7.34,14.66C7.34,16.1 7.66,17.43 8.27,18.5C8.91,19.66 9.35,20.15 10.12,20.93C10.31,21.13 10.31,21.44 10.12,21.64C10,21.74 9.88,21.79 9.75,21.79M16.92,19.94C15.73,19.94 14.68,19.64 13.82,19.05C12.33,18.04 11.44,16.4 11.44,14.66A0.5,0.5 0 0,1 11.94,14.16A0.5,0.5 0 0,1 12.44,14.66C12.44,16.07 13.16,17.4 14.38,18.22C15.09,18.7 15.92,18.93 16.92,18.93C17.16,18.93 17.56,18.9 17.96,18.83C18.23,18.78 18.5,18.96 18.54,19.24C18.59,19.5 18.41,19.77 18.13,19.82C17.56,19.93 17.06,19.94 16.92,19.94M14.91,22C14.87,22 14.82,22 14.78,22C13.19,21.54 12.15,20.95 11.06,19.88C9.66,18.5 8.89,16.64 8.89,14.66C8.89,13.04 10.27,11.72 11.97,11.72C13.67,11.72 15.05,13.04 15.05,14.66C15.05,15.73 16,16.6 17.13,16.6C18.28,16.6 19.21,15.73 19.21,14.66C19.21,10.89 15.96,7.83 11.96,7.83C9.12,7.83 6.5,9.41 5.35,11.86C4.96,12.67 4.76,13.62 4.76,14.66C4.76,15.44 4.83,16.67 5.43,18.27C5.53,18.53 5.4,18.82 5.14,18.91C4.88,19 4.59,18.87 4.5,18.62C4,17.31 3.77,16 3.77,14.66C3.77,13.46 4,12.37 4.45,11.42C5.78,8.63 8.73,6.82 11.96,6.82C16.5,6.82 20.21,10.33 20.21,14.65C20.21,16.27 18.83,17.59 17.13,17.59C15.43,17.59 14.05,16.27 14.05,14.65C14.05,13.58 13.12,12.71 11.97,12.71C10.82,12.71 9.89,13.58 9.89,14.65C9.89,16.36 10.55,17.96 11.76,19.16C12.71,20.1 13.62,20.62 15.03,21C15.3,21.08 15.45,21.36 15.38,21.62C15.33,21.85 15.12,22 14.91,22Z" />
                    </svg>
                    <label>__ views</label>
                </Button>
            </span>
        </Grid>
    </Fragment>
    })
})