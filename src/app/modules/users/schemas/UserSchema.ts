import mongoose, { model, Schema, Document } from "mongoose";
import { IUser } from "../models/UserModel";

export interface IUserModel extends IUser, Document { }

const UserSchema = new Schema({
    name: String,
    email: String,
    password: String
}, { timestamps: true }
)

export default mongoose.model<IUserModel>('User', UserSchema)