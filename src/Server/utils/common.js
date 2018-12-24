import jwt from 'jsonwebtoken'
import path from 'path'
import fs from 'fs'
import mime from 'mime'
import cloudinary from 'cloudinary'
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
})
export const getFormattedDate = (date) => {
  let year = date.getFullYear();

  let month = (1 + date.getMonth()).toString();
  month = month.length > 1 ? month : '0' + month;

  let day = date.getDate().toString();
  day = day.length > 1 ? day : '0' + day;

  let hour = date.getHours().toString();
  hour = hour.length > 1 ? hour : '0' + hour;

  let minutes = date.getMinutes().toString();
  minutes = minutes.length > 1 ? minutes : '0' + minutes;

  let second = date.getSeconds().toString();
  second = second.length > 1 ? second : '0' + second;
  return `${month}/${day}/${year} ${hour}:${minutes}:${second}`;
}
export const genJWT = (payload, secretKey, expireTime) => {
  return jwt.sign(payload, secretKey, { expiresIn: expireTime })
}
export const convertToBase64URI = (fileName) => {
  let filePath = path.join('./public/images', fileName);
  let fileMime = mime.getType(filePath);
  let data = fs.readFileSync(filePath);
  let dataBase64 = `data:${fileMime};base64`
  let imgBase64 = `${dataBase64},${data.toString('base64')}`;
  return imgBase64;
}
export const uploadImage = async (base64Uri, option = {}) => {
  const result = await cloudinary.v2.uploader.upload(base64Uri, option);
  return result.secure_url;
}
export const convertPostTime = (dateTime) => {
  const currentDateTime = new Date();
  const h = currentDateTime - dateTime;
  const postTimeMin = Math.floor(h/60000);
  if(postTimeMin < 2){
    return `Just now`
  }
  else if(postTimeMin >= 2 && postTimeMin <60){
    return `${postTimeMin} mins`
  }
  else if(postTimeMin>=60 && postTimeMin < 60*24){
    const postTimeHour = Math.floor(postTimeMin/60);
    if(postTimeHour == 1){
      return '1 hour'
    }
    return `${postTimeHour} hours`
  }
  else if(postTimeMin >= 60*24 && postTimeMin < 60*24*2){
    return `1 day`
  }
  else{
    const date = new Date(dateTime);
    return date.toDateString();
  }
}
