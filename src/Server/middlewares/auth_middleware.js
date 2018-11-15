import jwt from 'jsonwebtoken'
import {AuthenticationError} from 'apollo-server-express'
import { accountModel } from '../models/user_model'
import * as commonUtils from '../config/common'
export const authorizationMiddleWare = async (req,res,childFunction,args = null) => {
    let token;
    try {
        // let jwtReq = req.headers.authorization;
        // token = jwtReq.replace("Beare ", "");
        // let payload = await jwt.verify(token, process.env.SECRET_KEY);
        // let { profile_name } = payload;
        // let userInfo = req.session.user
        // if (profile_name != userInfo.profile_name) {
        //     throw new Error('Bad token!');
        // }
        return childFunction(args,req,res);
    } catch (error){
        if(error.name === "TokenExpiredError"){
            const userInfo = await jwt.decode(token);
            const payload2 = {
                email: userInfo.email,
                profile_name: userInfo.profile_name,
                level: userInfo.level
            }
            const newJWT = commonUtils.genJWT(payload2,process.env.SECRET_KEY,'1h')
            res.set('Access-Control-Expose-Headers','x-refresh-token');
            res.set('x-refresh-token', newJWT);
            return childFunction(req,res,args);
        }
        else{
            console.log(error);
            throw new AuthenticationError(error.message);
        }
    }

}


