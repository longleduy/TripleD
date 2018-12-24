import React, { Fragment, PureComponent } from 'react'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Dropzone from 'react-dropzone'
import DatePicker from "react-datepicker"
import CircularProgress from '@material-ui/core/CircularProgress'
import { withApollo, Mutation } from "react-apollo"
import "react-datepicker/dist/react-datepicker-cssmodules.css"
//Todo: PropsRender
import MutationPropRender from '../../hocOrProprender/MutationPropRender.jsx'
//Todo: Styles
import indexStyles from '../../../Styles/Index.scss'
import appStyles from '../../../Styles/App.scss'
//Todo: GraphQl
import { UPDATE_USER_INFO_MUTATION } from '../../../graphql/mutations/user_mutation'
import {GET_LIMITED_POSTS} from '../../../graphql/querys/post_query'
import { QUERY_USER_INFO } from '../../../graphql/local/state_mutation'
class PrivateUserInfoForm extends PureComponent {
    state = {
        editStatus: false,
        editData: {
            genderEdit: '',
            dateOfBirthEdit: null,
            facebookAdressEdit: '',
            instagramAdressEdit: '',
            image: null
        }
    }
    handleChange = genderEdit => {
        this.setState({
            editData: {
                ... this.state.editData,
                genderEdit: this.state.editData.genderEdit === genderEdit ? '' : genderEdit
            }
        });
    };
    handleChangeDate = date => {
        this.setState({
            editData: {
                ... this.state.editData,
                dateOfBirthEdit: date
            }
        });;
    }
    showEditGender = (editStatus, gender) => {
        const { genderEdit } = this.state.editData;
        if (!editStatus) {
            return <label>{gender != null ? gender : '________'}</label>
        }
        return <div className={indexStyles.divGenderEdit}>
            <Button className={`${appStyles.buttonSvg} ${indexStyles.editGender} ${genderEdit === 'Male' ? indexStyles.genderSelected : null}`} onClick={() => this.handleChange('Male')}>
                <svg viewBox="0 0 24 24">
                    <path fill="#ccc" d="M12,4A6,6 0 0,1 18,10C18,12.97 15.84,15.44 13,15.92V18H15V20H13V22H11V20H9V18H11V15.92C8.16,15.44 6,12.97 6,10A6,6 0 0,1 12,4M12,6A4,4 0 0,0 8,10A4,4 0 0,0 12,14A4,4 0 0,0 16,10A4,4 0 0,0 12,6Z" />
                </svg>
                <label>M</label>
            </Button>
            <Button className={`${appStyles.buttonSvg} ${indexStyles.editGender} ${genderEdit === 'Female' ? indexStyles.genderSelected : null}`} onClick={() => this.handleChange('Female')}>
                <svg viewBox="0 0 24 24">
                    <path fill="#ccc" d="M9,9C10.29,9 11.5,9.41 12.47,10.11L17.58,5H13V3H21V11H19V6.41L13.89,11.5C14.59,12.5 15,13.7 15,15A6,6 0 0,1 9,21A6,6 0 0,1 3,15A6,6 0 0,1 9,9M9,11A4,4 0 0,0 5,15A4,4 0 0,0 9,19A4,4 0 0,0 13,15A4,4 0 0,0 9,11Z" />
                </svg>
                <label>F</label>
            </Button>
            <Button className={`${appStyles.buttonSvg} ${indexStyles.editGender} ${genderEdit === 'Other' ? indexStyles.genderSelected : null}`} onClick={() => this.handleChange('Other')}>
                <svg viewBox="0 0 24 24">
                    <path fill="#ccc" d="M17.58,4H14V2H21V9H19V5.41L15.17,9.24C15.69,10.03 16,11 16,12C16,14.42 14.28,16.44 12,16.9V19H14V21H12V23H10V21H8V19H10V16.9C7.72,16.44 6,14.42 6,12A5,5 0 0,1 11,7C12,7 12.96,7.3 13.75,7.83L17.58,4M11,9A3,3 0 0,0 8,12A3,3 0 0,0 11,15A3,3 0 0,0 14,12A3,3 0 0,0 11,9Z" />
                </svg>
                <label>O</label>
            </Button>
        </div>
    }
    showEditDateOfBirth = (editStatus, dateOfBirth) => {
        const { dateOfBirthEdit } = this.state.editData;
        if (!editStatus) {
            return <label>{dateOfBirth != null ? dateOfBirth : '________'}</label>
        }
        return <DatePicker
            className={indexStyles.dateOfBirthPicker}
            selected={dateOfBirthEdit}
            onChange={this.handleChangeDate}
            dateFormat="MMMM d, yyyy"
        />
    }
    showEditFacebook = (editStatus, facebookAdress) => {
        const { facebookAdressEdit } = this.state.editData;
        if (!editStatus) {
            return <label>{facebookAdress != null ? facebookAdress : '________________________________'}</label>
        }
        return <Fragment><label>facebook.com/</label><input type="text" name="facebookAdressEdit" value={facebookAdressEdit} onChange={this.handleChangeInput} className={indexStyles.inputEdit} /></Fragment>
    }
    showEditInsta = (editStatus, instagramAdress) => {
        const { instagramAdressEdit } = this.state.editData;
        if (!editStatus) {
            return <label>{instagramAdress != null ? instagramAdress : '________________________________'}</label>
        }
        return <Fragment><label>instagram.com/</label><input type="text" name="instagramAdressEdit" value={instagramAdressEdit} onChange={this.handleChangeInput} className={indexStyles.inputEdit} /></Fragment>
    }
    showButton = (action,editStatus) => {
        if (!editStatus) {
            return <Button className={`${appStyles.mainButton}`} 
                onClick={this.props.handleOpen}>
                <svg viewBox="0 0 24 24">
                    <path fill="#ccc" d="M16.84,2.73C16.45,2.73 16.07,2.88 15.77,3.17L13.65,5.29L18.95,10.6L21.07,8.5C21.67,7.89 21.67,6.94 21.07,6.36L17.9,3.17C17.6,2.88 17.22,2.73 16.84,2.73M12.94,6L4.84,14.11L7.4,14.39L7.58,16.68L9.86,16.85L10.15,19.41L18.25,11.3M4.25,15.04L2.5,21.73L9.2,19.94L8.96,17.78L6.65,17.61L6.47,15.29" />
                </svg>  Create post
        </Button>
        }
        return <Button className={`${appStyles.mainButton}`} 
            onClick={e => this.saveUpdateUserInfo(e, action)}>
            <svg viewBox="0 0 24 24">
                <path fill="#ccc" d="M17,7V3H7V7H17M14,17A3,3 0 0,0 17,14A3,3 0 0,0 14,11A3,3 0 0,0 11,14A3,3 0 0,0 14,17M19,1L23,5V17A2,2 0 0,1 21,19H7C5.89,19 5,18.1 5,17V3A2,2 0 0,1 7,1H19M1,7H3V21H17V23H3A2,2 0 0,1 1,21V7Z" />
            </svg>  Save
            </Button>
    }
    switchEditForm = () => {
        const { gender, dateOfBirth, facebookAdress, instagramAdress } = this.props.userInfo.queryUserInfo;
        this.setState({
            editStatus: true,
            editData: {
                genderEdit: gender ? gender : '',
                dateOfBirthEdit: null,
                facebookAdressEdit: facebookAdress ? facebookAdress.split('facebook.com/')[1] : '',
                instagramAdressEdit: instagramAdress ? instagramAdress.split('instagram.com/')[1] : '',
                image: null
            }
        })
    }
    cancelEditForm = () => {
        this.setState({
            editStatus: false,
            editData: {
                genderEdit: '',
                dateOfBirthEdit: null,
                facebookAdressEdit: '',
                instagramAdressEdit: '',
                image: null
            }
        })
    }
    handleChangeInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({
            editData: {
                ...this.state.editData,
                [name]: value
            }
        })
    }
    handleDrop = (files) => {
        let reader = new FileReader();
        reader.onloadend = () => {
            this.setState({
                editData: {
                    ...this.state.editData,
                    image: reader.result
                }

            })
        }
        try {
            reader.readAsDataURL(files[0])
        } catch (error) { }
    }
    cancelImage = (e) => {
        e.preventDefault();
        this.setState({
            editData: {
                ...this.state.editData,
                image: ''
            }

        })
    }
    saveUpdateUserInfo = async (e, action) => {
        const updateUserDataInput = this.getUpdateData();
        if (!$.isEmptyObject(updateUserDataInput)) {
            let result = await action({
                variables: { updateUserDataInput },
                update: (store, { data: { updateUserInfo } }) => {
                    const data = store.readQuery({ query: QUERY_USER_INFO });
                    $.map(updateUserInfo, (v, k) => {
                        if (v != null) {
                            data.queryUserInfo[`${k}`] = v;
                        }
                    })
                    store.writeQuery({ query: QUERY_USER_INFO, data });
                }
            });
        }
        this.setState({
            editStatus: false
        })
    }
    getUpdateData = () => {
        const { editData } = this.state;
        const userInfoProps = { ...this.props.userInfo.queryUserInfo };
        let updateUserDataInput = { ...editData };
        let newObject = {};
        $.map(updateUserDataInput, (value, index) => {
            const newKey = index.split("Edit")[0];
            let userInfoPropsVal = userInfoProps[newKey];
            if (index === "facebookAdressEdit" && userInfoPropsVal != null) {
                userInfoPropsVal = userInfoPropsVal.split("facebook.com/")[1];
            }
            if (index === "instagramAdressEdit" && userInfoPropsVal != null) {
                userInfoPropsVal = userInfoPropsVal.split("instagram.com/")[1];
            }
            if (value != "" && value != null && (index == "imageEdit" || userInfoPropsVal != value)) {
                if (newKey == "image") {
                    newObject["avatar"] = value;
                }
                else if (newKey === "facebookAdress") {
                    newObject[newKey] = "facebook.com/" + value;
                }
                else if (newKey === "instagramAdress") {
                    newObject[newKey] = "instagram.com/" + value;
                }
                else {
                    newObject[newKey] = value;
                }
            }
        });
        return newObject;
    }
    render() {
        const { avatar, profileName, gender, dateOfBirth, level, posts, point, rank, facebookAdress, instagramAdress, joinAt } = this.props.userInfo.queryUserInfo;
        const { image, genderEdit } = this.state.editData;
        const { editStatus } = this.state;
        if (profileName == null) return null;
        return <Fragment>
            <MutationPropRender mutation={UPDATE_USER_INFO_MUTATION}
                mutationPropRender={(action, { data, loading, error }) => (
                    <Grid item xs={2} className={indexStyles.rightContent} id="rightContent">
                        {loading && <div className={indexStyles.loading}>
                            <CircularProgress className={indexStyles.myCircularProgress} thickness={5} size={30} />
                        </div>}
                        <div className={indexStyles.divBanner}>
                            <img className={indexStyles.baner} src={require(`../../../../../public/images/maindoc/nodejs-baner.png`)} />
                        </div>
                        <div className={indexStyles.divAvatar}>
                            <label className={indexStyles.userName}>{profileName}</label>
                            <div className={indexStyles.divAvatarChild}>
                                {editStatus ?
                                    <Dropzone onDrop={this.handleDrop} onDropRejected={this.onDropRejected} maxSize={512000} className={indexStyles.avatarDropzone}
                                        accept="image/jpeg,image/jpg,image/tiff,image/gif,image/png" multiple={false}>
                                        {image ? <img className={indexStyles.avatar} src={image} /> : <img className={indexStyles.avatar} src={avatar?avatar:require(`../../../../../public/images/user/default-avatar.jpg`)} />}
                                        <svg viewBox="0 0 24 24" className={indexStyles.addAvatar}>
                                            <path fill="#ccc" d="M5,3A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H14.09C14.03,20.67 14,20.34 14,20C14,19.32 14.12,18.64 14.35,18H5L8.5,13.5L11,16.5L14.5,12L16.73,14.97C17.7,14.34 18.84,14 20,14C20.34,14 20.67,14.03 21,14.09V5C21,3.89 20.1,3 19,3H5M19,16V19H16V21H19V24H21V21H24V19H21V16H19Z" />
                                        </svg>
                                        {image && <svg viewBox="0 0 24 24" className={indexStyles.cancelAddAvatar} onClick={e => { this.cancelImage(e) }}>
                                            <path fill="#000000" d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z" />
                                        </svg>}
                                    </Dropzone>
                                    : <img className={indexStyles.avatar} src={avatar?avatar:require(`../../../../../public/images/user/default-avatar.jpg`)} />}
                            </div>
                        </div>
                        <Grid container className={indexStyles.divUserInfo}>
                            <Grid item xs={editStatus ? 12 : 5} className={indexStyles.userInfo}>
                                <svg viewBox="0 0 24 24" style={{ width: '24px' }} className={editStatus ? indexStyles.svgEdit : null}>
                                    <path fill="#000000" d="M17.58,4H14V2H21V9H19V5.41L15.17,9.24C15.69,10.03 16,11 16,12C16,14.42 14.28,16.44 12,16.9V19H14V21H12V23H10V21H8V19H10V16.9C7.72,16.44 6,14.42 6,12A5,5 0 0,1 11,7C12,7 12.96,7.3 13.75,7.83L17.58,4M11,9A3,3 0 0,0 8,12A3,3 0 0,0 11,15A3,3 0 0,0 14,12A3,3 0 0,0 11,9Z" />
                                </svg>
                                {this.showEditGender(editStatus, gender)}
                            </Grid>
                            <Grid item xs={editStatus ? 12 : 7} className={indexStyles.userInfo}>
                                <svg viewBox="0 0 24 24" className={editStatus ? indexStyles.svgEdit : null}>
                                    <path fill="#000000" d="M21,21V17C21,15.89 20.1,15 19,15H18V12C18,10.89 17.1,10 16,10H13V8H11V10H8C6.89,10 6,10.89 6,12V15H5C3.89,15 3,15.89 3,17V21H1V23H23V21M12,7A2,2 0 0,0 14,5C14,4.62 13.9,4.27 13.71,3.97L12,1L10.28,3.97C10.1,4.27 10,4.62 10,5A2,2 0 0,0 12,7Z" />
                                </svg>
                                {this.showEditDateOfBirth(editStatus, dateOfBirth)}
                            </Grid>
                            <Grid item xs={6} className={indexStyles.userInfo}>
                                <svg viewBox="0 0 24 24">
                                    <path fill="#000000" d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,5A3,3 0 0,1 15,8A3,3 0 0,1 12,11A3,3 0 0,1 9,8A3,3 0 0,1 12,5M17.13,17C15.92,18.85 14.11,20.24 12,20.92C9.89,20.24 8.08,18.85 6.87,17C6.53,16.5 6.24,16 6,15.47C6,13.82 8.71,12.47 12,12.47C15.29,12.47 18,13.79 18,15.47C17.76,16 17.47,16.5 17.13,17Z" />
                                </svg>
                                <label>{level}</label>
                            </Grid>
                            <Grid item xs={6} className={indexStyles.userInfo}>
                                <svg viewBox="0 0 24 24">
                                    <path fill="#000000" d="M6,2A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2H6M6,4H13V9H18V20H6V4M8,12V14H16V12H8M8,16V18H13V16H8Z" />
                                </svg>
                                <label>{posts > 1 ? `${posts} Posts` : `${posts} Post`}</label>
                            </Grid>
                            <Grid item xs={12} className={`${indexStyles.userInfo} ${indexStyles.userInfoFull}`}>
                                <svg viewBox="0 0 24 24">
                                    <path fill="#000000" d="M15,13H16.5V15.82L18.94,17.23L18.19,18.53L15,16.69V13M19,8H5V19H9.67C9.24,18.09 9,17.07 9,16A7,7 0 0,1 16,9C17.07,9 18.09,9.24 19,9.67V8M5,21C3.89,21 3,20.1 3,19V5C3,3.89 3.89,3 5,3H6V1H8V3H16V1H18V3H19A2,2 0 0,1 21,5V11.1C22.24,12.36 23,14.09 23,16A7,7 0 0,1 16,23C14.09,23 12.36,22.24 11.1,21H5M16,11.15A4.85,4.85 0 0,0 11.15,16C11.15,18.68 13.32,20.85 16,20.85A4.85,4.85 0 0,0 20.85,16C20.85,13.32 18.68,11.15 16,11.15Z" />
                                </svg>
                                <label>{joinAt}</label>
                            </Grid>
                            <Grid item xs={12} className={`${indexStyles.userInfo} ${indexStyles.userInfoFull}`}>
                                <svg viewBox="0 0 24 24">
                                    <path fill="#000000" d="M16.23,18L12,15.45L7.77,18L8.89,13.19L5.16,9.96L10.08,9.54L12,5L13.92,9.53L18.84,9.95L15.11,13.18L16.23,18M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
                                </svg>
                                <label>Point: {point}</label>
                            </Grid>
                            <div className={indexStyles.rank}>
                                <img src={require(`../../../../../public/images/rank/chevron-${rank}.svg`)} />
                                <label>Chevron{rank}</label>
                            </div>
                            <div className={indexStyles.creatPost}>
                                {this.showButton(action,editStatus)}
                            </div>
                            <div className={indexStyles.socialInfo}>
                                <span className={indexStyles.spanSocialInfo}>
                                    <svg viewBox="0 0 24 24" className={editStatus ? indexStyles.svgEdit : null}>
                                        <path fill="#ccc" d="M5,3H19A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3M18,5H15.5A3.5,3.5 0 0,0 12,8.5V11H10V14H12V21H15V14H18V11H15V9A1,1 0 0,1 16,8H18V5Z" />
                                    </svg>
                                    {this.showEditFacebook(editStatus, facebookAdress)}
                                </span>
                                <span className={indexStyles.spanSocialInfo}>
                                    <svg viewBox="0 0 24 24" className={editStatus ? indexStyles.svgEdit : null}>
                                        <path fill="#ccc" d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z" />
                                    </svg>
                                    {this.showEditInsta(editStatus, instagramAdress)}
                                </span>
                            </div>

                            <Button className={`${appStyles.buttonSvg} ${indexStyles.settingIcon}`} onClick={editStatus ? this.cancelEditForm : this.switchEditForm}>
                                <svg viewBox="0 0 24 24">
                                    {!editStatus ?
                                        <path fill="#ccc" d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z" />
                                        : <path fill="#ffe000" d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z" />}
                                </svg>
                            </Button>

                        </Grid>
                    </Grid>
                )} />
        </Fragment>
    }
}
export default withApollo(PrivateUserInfoForm);