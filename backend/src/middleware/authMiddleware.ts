import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
// import User from "../model/user.model";


const protect = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let token = req.headers.authorization;
        if(token) {
            token = token.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
            // req.user = await User.findById(decoded.id).select('-password');
            next();
        }else{
            res.status(401);
            throw new Error('Not authorized');
        }
    } catch (error) {
       res.status(401).json({ message: 'token is not valid' }); 
    }
}