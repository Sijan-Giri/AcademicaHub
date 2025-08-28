import { NextFunction, Request, Response } from "express";

const errorHandler = (fn:Function) => {
    return (req:Request,res:Response,next:NextFunction) => {
        fn(req,res,next).catch((err:Error) => {
            return res.status(500).json({
                message : "Something went wrong !!",
                errorMessage : err.message,
                fullerror : err
            })
        })
    }
}

export default errorHandler;