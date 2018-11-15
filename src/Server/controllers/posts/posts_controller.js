import { mongo } from 'mongoose'
//Todo: Model
import { postModel } from '../../models/posts_model'
import { accountModel } from '../../models/user_model'
import { client } from '../../config/redis'
import { uploadImage } from '../../config/common'
import * as Promise from 'bluebird'
import delay from 'delay'
import { convertPostTime } from '../../config/common'
const asyncClient = Promise.promisifyAll(client);
export const createPost = async (postData, req = null, res = null) => {
    let imageUrl = null;
    if (postData.image != '') {
        imageUrl = await uploadImage(postData.image);
    }
    const newPost = postModel({
        //author: "LongLD",
        userID: req.session.user._id,
        content: postData.content,
        role: postData.role,
        tag: postData.tag,
        image: imageUrl
    })
    const data = await newPost.save();
    if (data) {
        const date = new Date(data.date);
        const stringDate = date.toLocaleString();
        const postDate = convertPostTime(data.date);
        const postTime = stringDate.split(' ')[1];
        data['postDate'] = postDate;
        data['postTime'] = postTime;
        return data;
    }
    throw new Error();
}
export const likePost = async (likeData, req = null, res = null) => {
    const { postID, action } = likeData;
    const userID = req.session.user._id;
    const likeID = getLikeID(postID);
    let status = null;
    let liked;
    if (action === 'like') {
        status = await asyncClient.saddAsync(likeID, userID);
        liked = true;
    }
    else {
        status = await asyncClient.sremAsync(likeID, userID);
        liked = false;
    }
    const likes = asyncClient.scardAsync(likeID);
    return {
        likes: likes ? likes : 0,
        liked
    }
}
export const getAllPost = async () => {
    const result = await postModel.find().sort({ date: -1 });
    if (result.length > 0) {
        return result.map((data, idx) => {
            const date = new Date(data.date);
            const stringDate = date.toLocaleString();
            const postDate = convertPostTime(data.date);
            const postTime = stringDate.split(' ')[1];
            data['postDate'] = postDate;
            data['postTime'] = postTime;
            console.log(data);
            return data;
        })
    }
    throw new Error('Empty list')
}
export const getLimitedPosts = async (limitNumber, req = null, res = null) => {
    const result = await postModel.find().limit(limitNumber).populate('userID', 'profile_name avatar').sort({ date: -1 });
    if (result.length > 0) {
        return result.map((data, idx) => {
            const currentTime = new Date();
            const date = new Date(data.date);
            const stringDate = date.toLocaleString();
            const postDate = convertPostTime(data.date);
            const postTime = stringDate.split(' ')[1];
            data['postDate'] = postDate;
            data['postTime'] = postTime;
            return data;
        })
    }
    throw new Error('Empty list')
}
export const getCountInfo = async (req, id) => {
    const { _id } = req.session.user;
    const likeId = `post:${id}:likes`;
    const cmtId = `post:${id}:cmts`;
    const viewId = `post:${id}:views`;
    const likeCountAsync = asyncClient.scardAsync(likeId);
    const likedAsync = asyncClient.sismemberAsync(likeId, _id);
    const cmtCountAsync = asyncClient.keysAsync(`${cmtId}*`);
    const viewCountAsync = asyncClient.llenAsync(viewId);
    const likeCount = await likeCountAsync;
    const liked = await likedAsync;
    const cmtCount = await cmtCountAsync;
    const viewCount = await viewCountAsync;
    return {
        likes: likeCount ? likeCount : 0,
        liked: liked == 1 ? true : false,
        comments: cmtCount ? cmtCount.length : 0,
        views: viewCount ? viewCount : 0
    };
}
export const getNewComment = async (req, id) => {
    const { profile_name } = req.session.user;
    const cmtIdPattern = `post:${id}:cmts*`;
    const listCmt = await asyncClient.keysAsync(cmtIdPattern);
    const lastCmtId = listCmt[0];
    let lastCmtInfo = await asyncClient.hgetallAsync(lastCmtId);
    let userInfo;
    if (lastCmtInfo) {
        const userID = mongo.ObjectId(lastCmtInfo.member);
        userInfo = await accountModel.findOne({ _id: userID }, { profile_name: 1, avatar: 1 });
    } else if (!lastCmtInfo) {
        return null
    }
    return {
        commentContent: lastCmtInfo.content,
        commentUserInfo: {
            profile_name: userInfo.profile_name,
            avatar: userInfo.avatar
        },
        commentDate: lastCmtInfo.commentDate,
        commentTime: lastCmtInfo.commentTime
    };
}
export const loadMorePost = async (args) => {
    const postID = mongo.ObjectId(args.start);
    const result = await postModel.find({ _id: { $lt: postID } }).limit(args.limitNumber)
                        .populate('userID', 'profile_name avatar').sort({ date: -1 });
    if (result.length > 0) {
        return result.map((data, idx) => {
            const date = new Date(data.date);
            const stringDate = date.toLocaleString();
            const postDate = convertPostTime(data.date);
            const postTime = stringDate.split(' ')[1];
            data['postDate'] = postDate;
            data['postTime'] = postTime;
            return data;
        })
    }
    throw new Error('Empty list')
}
export const getLikeID = (postID) => {
    return `post:${postID}:likes`;
}