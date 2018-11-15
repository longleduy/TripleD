import cloudinary from 'cloudinary'
//Todo: Model
import { userModel } from '../../models/user_model'
//Todo: Utils
import * as passWordUtil from '../../utils/password_util'
import { emailSender } from '../../utils/email_sender'
import { AuthenticationError } from 'apollo-server-express'
import * as commonUtils from '../../utils/common'
import * as errorHandler from '../../utils/error_handler'
import delay from 'delay'
//Todo: Contants
import {ACCOUNT_NOT_AVAILABLE, WRONG_PASSWORD, ERROR_EMAIL_NOT_VERIFY} from '../../utils/contants/error_message_contants'

// cloudinary.utils({
//     cloud_name: 'seatechit',
//     api_key: '697115945411315',
//     api_secret: '4X8rw_3mR8WC5G19C5JohhRYHlg'
// })
export const checkEmail = async (email) => {
    const result = await userModel.find({ email });
    if (result.length > 0) {
        return {
            status: true
        }
    }
    return {
        status: false
    }
}
export const addNewUserAccount = async (args) => {
    const passWord = await passWordUtil.hashPassWordAsync(args.passWord);
    let newUserAccount = new userModel({
        firstName: args.firstName,
        lastName: args.lastName,
        email: args.email,
        profileName: `${args.firstName} ${args.lastName}`,
        passWord: passWord,
        gender: null,
        level: "member",
        active: false,
        avatar: null
    });
    let result = await newUserAccount.save();
    let { email } = args;
    let emailEncoded = new Buffer(email).toString('base64');
    emailSender(email, emailEncoded, 'SIGN_UP_VERIFY');
    return result;
};
export const verifyEmail = async (secretKey) => {
    const emailEncoded = secretKey;
    const email = new Buffer(emailEncoded, 'base64').toString('ascii');
    const data = await userModel.findOneAndUpdate({ email: email, active: false }, { $set: { active: true } });
    if (!data) {
        throw new Error('Email verify invalid')
    }
    return {
        status: "Active"
    }
}
export const signIn = async (formData) => {
    const { email, passWord } = formData;
    const result = await userModel.findOne({ email });
    if (result) {
        if (!result.active) {
            throw new errorHandler.dataFormInvalid({
                message: ERROR_EMAIL_NOT_VERIFY,
                data: {
                    field: 'email'
                }
            })
        }
        else {
            const verifyPasswordStatus = await passWordUtil.comparePassWordAsync(passWord, result.passWord);
            if (!verifyPasswordStatus) {
                throw new errorHandler.dataFormInvalid({
                    message: WRONG_PASSWORD,
                    data: {
                        field: 'passWord'
                    }
                })
            }
            else {
                const payload = {
                    email: result.email,
                    profileName: result.profileName,
                    level: result.level
                }
                const jwt = commonUtils.genJWT(payload, process.env.SECRET_KEY, '10h');
                result["jwt"] = jwt
                return result;
            }
        }

    }
    else {
        throw new errorHandler.dataFormInvalid({
            message: ACCOUNT_NOT_AVAILABLE,
            data: {
                field: 'email'
            }
        })
    }
}
