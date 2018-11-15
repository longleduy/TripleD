import mongoose from 'mongoose';
const postSchema = mongoose.Schema({
    //author: {type: String,require:true},
    userID: {type: mongoose.Schema.Types.ObjectId, ref:'account_infors'},
    content: {type: String,require:true},
    date: {type: Date,default:Date.now},
    role: {type: String,require:true},
    tag:[{type: String}],
    image:{type: String}
});

export const postModel = mongoose.model('posts', postSchema);