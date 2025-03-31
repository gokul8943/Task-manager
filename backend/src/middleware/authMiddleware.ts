import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
// import User from "../model/user.model";

interface DecodedToken {
    id: string;
    role?: string;
}

// Extend Express Request to include user
interface AuthRequest extends Request {
    user?: DecodedToken;
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        let token = req.headers.authorization;
        if (token) {
            token = token.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;
            req.user = decoded; // Attach decoded user info to request
            next();
        } else {
            res.status(401);
            throw new Error("Not authorized");
        }
    } catch (error) {
        res.status(401).json({ message: "Token is not valid" });
    }
};

export const adminOnly = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        if (req.user && req.user.role === "admin") {
            next();
        } else {
            res.status(401).json({ message: "You are not an admin" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
