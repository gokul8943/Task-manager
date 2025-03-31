import { Document } from "mongoose";

interface taskInterface extends Document{
    title:String,
    description:String,
    status:String,
    priority:String,
    dueDate:Date,
    createdBy:Document
    assignedTo:Document
    comments:Document
    attachments:Document
    progress:Number
}

export default taskInterface