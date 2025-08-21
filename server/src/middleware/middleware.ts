import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import { envConfig } from "../config/config";
import User from "../database/models/user.model";

export interface IExtendedRequest extends Request{
    user ?: {
        userId ?: string,
        email : string,
        username : string,
        role : string | null,
        currentInstituteNumber : string
    }
}

class Middleware {
    static async isLoggedIn(req:IExtendedRequest,res:Response,next:NextFunction) {
        const token = req.headers.authorization;
        if(!token) {
            res.status(400).json({
                message : "Please provide token !!"
            })
            return
        }
        jwt.verify(token,envConfig.secretKey as string,async(error,result:any) => {
            if(error) {
                res.status(400).json({
                    message : "Invalid token !!"
                })
            }
            else {
                const userData = await User.findByPk(result.id);
                console.log("Hello iam sijan",userData)
                if(!userData) {
                    res.status(404).json({
                        message : "No users found with that id !!"
                    })
                }
                else {
                    req.user = userData;
                    next()
                }
            }
        })
    }
}


export default Middleware