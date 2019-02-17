import * as Contants from '../contants/validate_contants'
import styles from '../../Styles/Validate.scss'
export const validEmail = (e, text) => {
    let email = $(e).val();
    let emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if (!emailReg.test(email)) {
        $(e).parent().prev('label').attr('name', 'warning-label');
        $(e).addClass(`${styles.warningLabel}`);
        $(e).parent().prev('label').text(Contants.EMAIL_NOT_AVAILABLE);
        return false;
    }
    else {
        $(e).parent().prev('label').text(text);
        $(e).removeClass(`${styles.warningLabel}`);
        $(e).parent().prev('label').removeAttr('name');
        return true;
    }
}
export const validPassWord = (e, otherPassWord, text) => {
    let passWord = e.val().trim();
    let passWord2 = otherPassWord.val().trim();
    let passWordLength = passWord.length;
    if (passWordLength < 6 && passWordLength > 0) {
        e.parent().prev('label').attr('name', 'warning-label');
        e.addClass(`${styles.warningLabel}`);
        e.parent().prev('label').text(Contants.ERROR_6_CHARACTER);
        return false;
    }
    else if (passWord.length > 0 && passWord !== passWord2) {
        e.parent().prev('label').attr('name', 'warning-label');
        e.parent().prev('label').text(text);
        otherPassWord.parent().prev('label').attr('name', 'warning-label');
        e.addClass(`${styles.warningLabel}`);
        otherPassWord.addClass(`${styles.warningLabel}`);
        return false;
    }
    else {
        e.parent().prev('label').text(text);
        e.removeClass(`${styles.warningLabel}`);
        otherPassWord.removeClass(`${styles.warningLabel}`);
        e.parent().prev('label').removeAttr('name');
        otherPassWord.parent().prev('label').removeAttr('name');
        return true;
    }
}
export const validEmptyForm = (elementID) => {
    let arrInputData = $(`#${elementID} input[type="text"],#${elementID} input[type="password"],#${elementID} input[type="number"]`);
    let isPass = true;
    let index = null;
    arrInputData.each((idx, ele) => {
        let eleVal = $(ele).val().trim();
        if (eleVal === '') {
            if (index === null) {
                index = idx;
            }
            isPass = false;
            $(ele).parent().prev('label').addClass(`${styles.warningLabel}`);
        }
    })
    if (!isPass) {
        arrInputData.eq(index).focus();
    }
    return isPass;
}
export const verifyEmail = (target, status) => {
    if (status === 'exist') {
        target.parent().prev('label').attr('name', 'warning-label');
        target.addClass(`${styles.warningLabel}`);
        target.parent().prev('label').text(Contants.EMAIL_EXISTS);
    }
    else {
        let hasClass = target.hasClass('warning-label')
        if (hasClass) {
            target.parent().prev('label').text('Email address');
            target.removeClass(`${styles.warningLabel}`);
            target.parent().prev('label').removeAttr('name');
        }
    }
}
export const cleanErrorById = (id, text) => {
    if ($(`#${id}`).parent().prev('label').attr('name') === 'warning-label') {
        $(`#${id}`).parent().prev('label').removeAttr('name')
    }
    if ($(`#${id}`).hasClass(`${styles.warningLabel}`)) {
        $(`#${id}`).removeClass(`${styles.warningLabel}`);
        $(`#${id}`).parent().prev('label').text(text);
    }
}
export const dataFormInvalid = (field, errorMessage) => {
    $(`#${field}`).parent().prev('label').attr('name', 'warning-label');
    $(`#${field}`).addClass(`${styles.warningLabel}`);
    $(`#${field}`).parent().prev('label').text(errorMessage);
}
export const cleanError = (e, text) => {
    if ($(e.target).parent().prev('label').attr('name') === 'warning-label') {
        $(e.target).parent().prev('label').removeAttr('name')
    }
    if ($(e.target).hasClass(`${styles.warningLabel}`)) {
        $(e.target).removeClass(`${styles.warningLabel}`);
        $(e.target).parent().prev('label').text(text);
    }
}
export const onlyLetter = (e) => {
    if(e.which < 65 || e.which == 91 || e.which == 92 || e.which == 93 || e.which == 94 || e.which > 122 /* z */) {
        e.preventDefault();
    }
}