const jwt = require('jsonwebtoken');
const userService = require('../services/user.service')
const { comparePassword } = require('../helpers/user.helper');
const { JWT_SECRET, JWT_OPTIONS } = require('../constant/jwt.config');
const { MESSAGES } = require('../constant/messages');
const customResponse = require('../util/customResponse')
const httpStatusCodes = require('../constant/httpStatusCodes');


exports.createUser = async(req,res) =>{
    try{
                //check email already exist or not
        const emailData = await userService.getUserByEmail(req);
        if (emailData) {
            return customResponse.sendResponse(
                res,
                {
                    userDetails: emailData,
                },
                MESSAGES.EMAIL_ALREADY_EXIST,
                false,
                httpStatusCodes.INTERNAL_SERVER_ERROR
            );
        } else {
          let userData = await userService.createUser(req);
          return customResponse.sendResponse(
                res,
                {
                    message: MESSAGES.USER_CREATED_SUCCESSFULLY,
                    userId: userData,
                },
                MESSAGES.USER_CREATED_SUCCESSFULLY,
                true,
                httpStatusCodes.OK
            );  
        }
    }catch(error){
        return customResponse.sendResponse(
            res,
            {
                data: "",
                errorMsg: error.message
            },
            MESSAGES.SOMETHING_WENT_WRONG, true,
            httpStatusCodes.BAD_REQUEST
        );
    }
}


exports.loginUser = async(req,res) =>{
    try{
            const emailData = req['emailData'];
            const checkPassword = await comparePassword(req.body.password, emailData.password)
            if (checkPassword) {
                const tokenData = {
                    id: emailData.id,
                    firstName: emailData.firstName,
                    lastName: emailData.lastName
                }
                const token = jwt.sign(
                    tokenData,
                    JWT_SECRET,
                    JWT_OPTIONS
                )
                return customResponse.sendResponse(res, {
                    data: tokenData,
                    loginPlatform: loginPlatform,
                    token: token
                }, MESSAGES.LOGIN_SUCCESSFULLY, false, httpStatusCodes.OK)
            }else{
                return customResponse.sendResponse(res, {
                    data: ""
                }, MESSAGES.INCORRECT_PASSWORD, false, httpStatusCodes.BAD_REQUEST)
            }
    }catch(error){
         return customResponse.sendResponse(res, {
            data: "",
            errorMsg: error.message
        }, MESSAGES.SOMETHING_WENT_WRONG, true, httpStatusCodes.BAD_REQUEST)
    }
}