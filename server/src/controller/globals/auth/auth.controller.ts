import { Request, Response } from "express";
import User from "../../../database/models/user.model";
import bcrypt from "bcrypt"

class AuthController{
    static async registerUser(req:Request,res:Response) {
        const {username , email , password} = req.body;
        if(!username || !email || !password) {
            res.status(400).json({
                message : "Please provide username , email & password"
            })
            return
        }
        const userExists = await User.findAll({
            where : {
                email
            }
        })
        if(userExists.length > 0) {
            res.status(400).json({
                message : "User with this email already exists !!"
            })
            return
        }
        const user = await User.create({
            username, 
            email,
            password : bcrypt.hashSync(password,8)
        })
        res.status(200).json({
            message : "User created successfully !!",
            data : user
        })
    }

    static async loginUser(req:Request,res:Response) {
        const {email , password} = req.body;
        if(!email || !password) {
            res.status(400).json({
                message : "Please provide email & password"
            })
            return
        }
        const userExists = await User.findAll({
            where : {
                email
            }
        })
        if(userExists.length == 0) {
            res.status(404).json({
                message : "User with this email doesn't exists !!"
            })
            return
        }
        //@ts-ignore
        const isPasswordMatched = bcrypt.compareSync(password,userExists[0].password);
        if(!isPasswordMatched) {
            res.status(400).json({
                message : "Password doesn't matched !!"
            })
            return
        }
        res.status(200).json({
            message : "User loggedIn successfully !!"
        })
    }
}

export default AuthController