import mongoose, { model, Schema, Document } from "mongoose";
import { ICustomer } from "../models/ICustomer";


export interface ICustomerModel extends ICustomer, Document { }

const CustomerSchema = new Schema({
    name: String,
    email: String,
    phone: String,
    cpfCnpj:String,
    desc: String,
    cep: Number,
    city: String,
    state: String,
    road: String,
    number: String,
    district:String

}, { timestamps: true }
)

export default mongoose.model<ICustomerModel>('Customer', CustomerSchema)