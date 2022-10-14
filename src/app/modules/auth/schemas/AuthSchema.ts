
import mongoose, { Schema, Document } from "mongoose";
import { IUserToken } from "../models/UserTokenModel";

export interface IUserTokenModel extends IUserToken, Document { }

const AuthSchema = new Schema({
    email: String,
    token: String
}, { timestamps: true }
)

export default mongoose.model<IUserTokenModel>('Auth', AuthSchema)