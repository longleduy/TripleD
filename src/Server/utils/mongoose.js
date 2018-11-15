import mongoose from 'mongoose'
import {MONGODB_PATH} from '../../Configs/_host_contants'
export const connectMongooseDB = async () => {
    mongoose.set('useCreateIndex', true);
    mongoose.set('useFindAndModify', false);
    mongoose.set('useNewUrlParser', true);
    mongoose.connect(MONGODB_PATH, { useNewUrlParser: true });
}


