import { Document } from "mongoose";

interface userInterface {
    name: string;
    email: string;
    password: string;
    role: string;
    profileImage: string;
}

export default userInterface