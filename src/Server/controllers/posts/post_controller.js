import { mongo } from 'mongoose'
// //Todo: Model
import { postModel } from '../../models/post_model'
import { userModel } from '../../models/user_model'
import { client } from '../../utils/redis'
import { uploadImage } from '../../utils/common'
import * as Promise from 'bluebird'
import delay from 'delay'
import { convertPostTime } from '../../utils/common'
const asyncClient = Promise.promisifyAll(client);
export const createPost = async (postData, req = null, res = null) => {
    let imageUrl = null;
    if (postData.image != '') {
        imageUrl = await uploadImage(postData.image);
    }
    const newPost = postModel({
        userID: req.session.user._id,
        content: postData.content,
        location: postData.location,
        tag: postData.tag,
        image: imageUrl
    })
    const result = await newPost.save();
    if (result) {
        const date = new Date(result.createTime);
        const stringDate = date.toLocaleString();
        const postDate = convertPostTime(result.createTime);
        const postTime = stringDate.split(' ')[1];
        result['isAuthor'] = true;
        result['postDate'] = postDate;
        result['postTime'] = postTime;
        return result;
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
export const delPost = async (args, req = null, res = null) => {
    const { postID, likes, comments, views } = args;
    const _id = mongo.ObjectId(postID);
    const result = await postModel.findByIdAndDelete({ _id: _id });
    try {
        const postLikeID = getLikeID(postID);
        const resultRedis = likes == 0 || asyncClient.delAsync(postLikeID);
    } catch (error) { }
    return {
        status: true
    };
}
export const getLimitedPosts = async ({ limitNumber, skipNumber }, req = null, res = null) => {
    //await delay(1000);
    const result = await postModel.find().skip(skipNumber).limit(limitNumber).populate('userID', 'profileName avatar').sort({ _id: -1 });
    if (result.length > 0) {
        const { _id } = req.session.user;
        return result.map((data, idx) => {
            const date = new Date(data.createTime);
            const stringDate = date.toLocaleString();
            const postDate = convertPostTime(data.createTime);
            const postTime = stringDate.split(' ')[1];
            if (_id === data.userID.id) {
                data['isAuthor'] = true;
            }
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
    const cmtId = `post:${id}:comments`;
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
    const { profileName } = req.session.user;
    const cmtIdPattern = `post:${id}:comments:*`;
    const listCmt = await asyncClient.keysAsync(cmtIdPattern);
    const lastCmtId = `post:${id}:comments:${listCmt.length}`;
    let lastCmtInfo = await asyncClient.hgetallAsync(lastCmtId);
    let userInfo;
    if (lastCmtInfo != null) {
        const userID = mongo.ObjectId(lastCmtInfo.userID);
        userInfo = await userModel.findOne({ _id: userID }, { profileName: 1, avatar: 1 });
    } else if (!lastCmtInfo) {
        return null
    }
    const date = new Date(parseInt(lastCmtInfo.commentDate));
    const commentDate = convertPostTime(date);
    return {
        commentContent: lastCmtInfo.commentContent,
        userInfo: {
            profileName: userInfo.profileName,
            avatar: userInfo.avatar
        },
        commentDate,
        commentImage: lastCmtInfo.commentImage
    };
}
export const commentPost = async (commentData, req = null, res = null) => {
    const { postID, commentContent, commentImage, commentCount } = commentData;
    const userID = req.session.user._id;
    const commentID = getCommentID(postID, commentCount + 1);
    const currentDate = new Date();
    const stringDate = convertPostTime(currentDate);
    const commentDate = currentDate.getTime();
    const status = await asyncClient.hsetAsync(commentID, "userID", userID, "commentContent", commentContent, "commentImage", commentImage,"commentDate",commentDate);
    if(status > 0) return {
        commentContent:commentContent,
        commentImage: commentImage,
        commentDate:stringDate
    }
    throw new Error('Comment Error')
}
export const loadMoreComment = async ({ postID, limitNumber, skipNumber }, req = null, res = null) => {
    if(skipNumber == null){
        const cmtIdPattern = `post:${postID}:comments:*`;
        const listCmt = await asyncClient.keysAsync(cmtIdPattern);
        skipNumber = listCmt.length;
    }
    let i = skipNumber;
    let j = (skipNumber - limitNumber<1)?1:(skipNumber - limitNumber);
    let listComment = [];
    while(i>=j){
       const cmtID = `post:${postID}:comments:${j}`;
       const comment = await asyncClient.hgetallAsync(cmtID);
       const date = new Date(parseInt(comment.commentDate));
       const commentDate = convertPostTime(date);
       comment.commentDate = commentDate;
       const userID = mongo.ObjectId(comment.userID);
       const userInfo = await userModel.findOne({ _id: userID }, { profileName: 1, avatar: 1 });
       comment["userInfo"] = userInfo;
       listComment.push(comment);
       j++;
    }
    if(listComment.length > 0) return listComment;
    return null
}
export const getLikeID = (postID) => {
    return `post:${postID}:likes`;
}
export const getCommentID = (postID, commentCount) => {
    return `post:${postID}:comments:${commentCount}`;
}