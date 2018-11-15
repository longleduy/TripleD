import mongoose from 'mongoose';
const libFrameSchema = mongoose.Schema({
    img: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, required: false},
    date: { type: String, required: false },
    li1: { type: String, required: true },
});
export const libFrameModel = mongoose.model('lib_framework_realeases', libFrameSchema);