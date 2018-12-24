import React, { Fragment, PureComponent } from 'react'
import Drawer from '@material-ui/core/Drawer'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Chip from '@material-ui/core/Chip'
import TextField from '@material-ui/core/TextField'
import Dropzone from 'react-dropzone'
//Todo:Styles
import drawerStyles from '../../../Styles/CustomizeUI/Drawer.scss'
//Todo: Component
import { ProgressBarButton } from '../../commons/ProgressBarButton.jsx'
//Todo: PropRender
import MutationPropRender from '../../hocOrProprender/MutationPropRender.jsx'
//Todo: GraplQl
import { CREATE_POST_MUTATION } from '../../../graphql/mutations/post_mutation'
import {GET_LIMITED_POSTS} from '../../../graphql/querys/post_query'

export default class PrivatePostForm extends PureComponent {
    state = {
        open: false,
        postData: {
            content: '',
            image: '',
            location: ''
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.isOpen !== this.props.isOpen) {
            this.setState({ open: nextProps.isOpen });
        }
    }
    handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({
            postData: {
                ...this.state.postData,
                [name]: value
            }
        })
    }
    handleDrop = (files) => {
        let reader = new FileReader();
        reader.onloadend = () => {
            this.setState({
                postData: {
                    ...this.state.postData,
                    image: reader.result
                }

            })
        }
        try {
            reader.readAsDataURL(files[0])
        } catch (error) { }
    }
    // onDropRejected = () => {
    //     this.setState({
    //         openSnackBar: true,
    //         statusSnackBar: 'error',
    //         messageSnackBar: 'Maximum file upload size is 500Kb'
    //     })
    // }
    cancelImage = (e) => {
        e.preventDefault();
        return this.setState({
            postData: {
                ...this.state.postData,
                image: ''
            }

        })
    }
    chooseTag = (e) => {
        const tagName = $(e.target).prop('tagName');
        let hasActive = false;
        if (tagName == 'DIV') {
            hasActive = $(e.target).hasClass(drawerStyles.tagChipActive);
        }
        else {
            hasActive = $(e.target).parent().hasClass(drawerStyles.tagChipActive);
        }
        if (tagName == 'DIV') {
            if (hasActive) {
                return $(e.target).removeClass(drawerStyles.tagChipActive);
            }
            return $(e.target).addClass(drawerStyles.tagChipActive);
        }
        else {
            if (hasActive) {
                return $(e.target).parent().removeClass(drawerStyles.tagChipActive);
            }
            return $(e.target).parent().addClass(drawerStyles.tagChipActive);
        }

    }
    postSubmit = async (e, action) => {
        e.preventDefault();
        const postData = this.getPostData();
        if (!this.validForm(postData)) {
            return false
        }
        let result = await action(
            {
                variables: { postData: postData },
                update: (store, { data: { createPost } }) => {
                    let result = store.readQuery({
                        query: GET_LIMITED_POSTS,
                        variables:{ limitNumber: 5,skipNumber:0 }
                    });
                    result.getLimitedPost.unshift(createPost);
                    store.writeQuery({
                        query: GET_LIMITED_POSTS,
                        variables:{ limitNumber: 5,skipNumber:0 },
                        data: result
                    })
                }
            });
        if (result != null) {
            this.setState({
                postData: {
                    content: '',
                    image: '',
                    location: ''
                }
            })
            return this.props.handleOpenSnackBar('success', 'Post success');
        }
    }
    getPostData = () => {
        const arrTag = $('[name="tag-post"]');
        let arr = [];
        const tagText = $('#tag-post-text').val();
        let { postData } = this.state;
        arrTag.each((idx, ele) => {
            if ($(ele).hasClass(drawerStyles.tagChipActive)) {
                arr.push($(ele).children().text());
            }
        });
        if (tagText != '') {
            arr.push(tagText);
        }
        postData["tag"] = arr;
        return postData;
    }
    validForm = (postData) => {
        if (postData.content == '' || postData.content == null) {
            this.props.handleOpenSnackBar('error', 'Post content cannot be empty');
            return false;
        }
        else if (postData.tag.length < 1) {
            this.props.handleOpenSnackBar('error', 'Post tag cannot be empty');
            return false;
        }
        return true;
    }
    render() {
        const { image, content, location } = this.state.postData;
        return <MutationPropRender mutation={CREATE_POST_MUTATION}
            mutationPropRender={(action, { data, loading, error }) => (
                <Drawer anchor="bottom" open={this.state.open} onClose={this.toggleDrawer} className={drawerStyles.drawerMain}>
                    <div className={drawerStyles.drawer}>
                        <Grid container className={drawerStyles.drawerContainer}>
                            <Grid item xs={3} className={drawerStyles.drawerLogo}>
                                <svg viewBox="0 0 24 24" >
                                    <path fill="#ff3b00" d="M10.25,2C10.44,2 10.61,2.11 10.69,2.26L12.91,6.22L13,6.5L12.91,6.78L10.69,10.74C10.61,10.89 10.44,11 10.25,11H5.75C5.56,11 5.39,10.89 5.31,10.74L3.09,6.78L3,6.5L3.09,6.22L5.31,2.26C5.39,2.11 5.56,2 5.75,2H10.25M10.25,13C10.44,13 10.61,13.11 10.69,13.26L12.91,17.22L13,17.5L12.91,17.78L10.69,21.74C10.61,21.89 10.44,22 10.25,22H5.75C5.56,22 5.39,21.89 5.31,21.74L3.09,17.78L3,17.5L3.09,17.22L5.31,13.26C5.39,13.11 5.56,13 5.75,13H10.25M19.5,7.5C19.69,7.5 19.86,7.61 19.94,7.76L22.16,11.72L22.25,12L22.16,12.28L19.94,16.24C19.86,16.39 19.69,16.5 19.5,16.5H15C14.81,16.5 14.64,16.39 14.56,16.24L12.34,12.28L12.25,12L12.34,11.72L14.56,7.76C14.64,7.61 14.81,7.5 15,7.5H19.5Z" />
                                </svg>
                                <label>TripleD Community</label>
                            </Grid>
                            <Grid item xs={6} className={drawerStyles.postForm}>
                                <div>
                                    <TextField
                                        id="outlined-multiline-flexible"
                                        label="What's on your mind?"
                                        multiline
                                        value={content}
                                        name="content"
                                        className={drawerStyles.postInput}
                                        rows="3"
                                        onChange={this.handleChange}
                                        margin="normal"
                                        variant="outlined"
                                    />
                                    <div className={drawerStyles.tagPost}>
                                        <svg viewBox="0 0 24 24">
                                            <path fill="#333" d="M5.5,7A1.5,1.5 0 0,0 7,5.5A1.5,1.5 0 0,0 5.5,4A1.5,1.5 0 0,0 4,5.5A1.5,1.5 0 0,0 5.5,7M21.41,11.58C21.77,11.94 22,12.44 22,13C22,13.55 21.78,14.05 21.41,14.41L14.41,21.41C14.05,21.77 13.55,22 13,22C12.45,22 11.95,21.77 11.58,21.41L2.59,12.41C2.22,12.05 2,11.55 2,11V4C2,2.89 2.89,2 4,2H11C11.55,2 12.05,2.22 12.41,2.58L21.41,11.58M13,20L20,13L11.5,4.5L4.5,11.5L13,20Z" />
                                        </svg>
                                        <Chip label="NodeJs" onClick={e => { this.chooseTag(e) }} name="tag-post" className={`${drawerStyles.tagChip}`} />
                                        <Chip label="ReactJs" onClick={e => { this.chooseTag(e) }} name="tag-post" className={drawerStyles.tagChip} />
                                        <Chip label="Java" onClick={e => { this.chooseTag(e) }} name="tag-post" className={drawerStyles.tagChip} />
                                        <Chip label="AngularJs" onClick={e => { this.chooseTag(e) }} name="tag-post" className={drawerStyles.tagChip} />
                                        <Chip label="Graphql" onClick={e => { this.chooseTag(e) }} name="tag-post" className={`${drawerStyles.tagChip}`} />
                                        <Chip label="Python" onClick={e => { this.chooseTag(e) }} name="tag-post" className={drawerStyles.tagChip} />
                                        <Chip label="Golang" onClick={e => { this.chooseTag(e) }} name="tag-post" className={drawerStyles.tagChip} />
                                        <Chip label="Scala" onClick={e => { this.chooseTag(e) }} name="tag-post" className={drawerStyles.tagChip} />
                                        <Chip label="Koltin" onClick={e => { this.chooseTag(e) }} name="tag-post" className={drawerStyles.tagChip} />
                                        <input type="text" placeholder="Other tag..." id="tag-post-text" />
                                    </div>
                                    <div className={drawerStyles.locationPost}>
                                        <svg viewBox="0 0 24 24">
                                            <path fill="#333" d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z" />
                                        </svg>
                                        <input type="text" placeholder="Where are you?" name="location" value={location} onChange={this.handleChange} />
                                    </div>
                                    <div className={drawerStyles.submitDiv}>
                                        {loading ?
                                            <Button variant="contained" disabled onClick={(e) => this.postSubmit(e, action)}>
                                                <ProgressBarButton loading={loading} text='Submit' />
                                            </Button> :
                                            <Button variant="contained" onClick={(e) => this.postSubmit(e, action)}>
                                                <ProgressBarButton loading={loading} text='Submit' />
                                            </Button>}

                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={3} className={`${drawerStyles.addImageForm} ${image ? drawerStyles.addImageFormNoBorder : null}`}>
                                <Dropzone onDrop={this.handleDrop} onDropRejected={this.onDropRejected} maxSize={512000}
                                    accept="image/jpeg,image/jpg,image/tiff,image/gif,image/png" multiple={false}>
                                    {image && <img src={image} />}
                                    <svg viewBox="0 0 24 24">
                                        <path fill="#ccc" d="M5,3A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H14.09C14.03,20.67 14,20.34 14,20C14,19.32 14.12,18.64 14.35,18H5L8.5,13.5L11,16.5L14.5,12L16.73,14.97C17.7,14.34 18.84,14 20,14C20.34,14 20.67,14.03 21,14.09V5C21,3.89 20.1,3 19,3H5M19,16V19H16V21H19V24H21V21H24V19H21V16H19Z" />
                                    </svg>
                                    {image && <svg viewBox="0 0 24 24" className={drawerStyles.cancelImage} onClick={this.cancelImage}>
                                        <path fill="#000000" d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z" />
                                    </svg>}
                                </Dropzone>
                            </Grid>
                            <Button className={drawerStyles.cancelButton} onClick={this.props.toggleDrawer}>
                                <svg viewBox="0 0 24 24">
                                    <path fill="#000000" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                                </svg>
                            </Button>
                        </Grid>
                    </div>
                </Drawer>
            )} />
    }
}