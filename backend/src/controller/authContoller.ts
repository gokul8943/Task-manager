import { Request, Response } from "express";
import UserModel from "../model/User/userModel";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


export const register = async (req: Request, res: Response) => {

    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            res.status(400)
                .json({ message: 'Please add all fields' })
        }
        const existingUser = await UserModel.findOne({ email })
        if (existingUser) {
            res.status(400).json({ message: "user already exist" })
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await UserModel.create({
            name,
            email,
            password: hashedPassword
        })
        res.status(201).json(user)
        const User = await user.save();
        if (User) {
            res.status(200).json({ message: "User created successfully", User })
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
            expiresIn: "1d",
        });

        res.status(201).json({
            success: true,
            token,
            user: { id: user._id, name: user.name, email: user.email },
        });

    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            res.status(400)
                .json({ message: 'Please add all fields' })
        }
        const user = await UserModel.findOne({ email })
        if (!user) {
            res.status(400).json({ message: "user does not exist" })
        }
        const isPasswordCorrect = await bcrypt.compare(password, password as string);
        if (user && isPasswordCorrect) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
                expiresIn: "1d",
            });            res.status(200).json({
                success: true,
                token,
                user: { id: user._id, name: user.name, email: user.email },
            })
        }
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}
