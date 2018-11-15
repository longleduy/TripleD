import nodemailer from 'nodemailer'
//Todo: Utils
import * as EmailInfo from '../utils/contants/email_info_contants'
import * as EmailHTML from './contants/email_content'

export const emailSender = (to, data, fn) => {
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: EmailInfo.USER_NAME,
            pass: EmailInfo.PASS_WORD
        }
    });
    let html;
    let subject;
    if (fn == 'SIGN_UP_VERIFY') {
        subject = 'Verify email address'
        html = htmlSignUpVerify(to,data)
    }
    else if (fn == 'CHANGE_PASSWORD_CONFIRM') {
        html = htmlChangePasswordConfirm(data)
        subject = 'Reset password confirm'
    }
    else if (fn = 'RESET_PASSWORD_CONFIRM') {
        html = htmlResetPasswordKey(data)
        subject = 'Reset password key'
    }
    let mailOptions = {
        from: EmailInfo.EMAIL_FROM,
        to: to,
        subject,
        html
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log(`Email was sended to ${to}`);
    });

}
const htmlSignUpVerify = (to,data) => {
    return EmailHTML.htmlSignUpVerify(to,data)
}
const htmlChangePasswordConfirm = (data) => {
    return EmailHTML.htmlChangePassWordConfirm(data)
}
const htmlResetPasswordKey = (data) => {
    return EmailHTML.htmlResetPasswordKey(data)
}