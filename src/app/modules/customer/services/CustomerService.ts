import AppError from "../../../shared/errors/AppError";
import User from '../schemas/UserSchema'
import { ICustomer } from "../models/ICustomer";
import Customer from '../schemas/UserSchema'

export default class CustomerService {


    public async create(customer: ICustomer): Promise<ICustomer> {
       

        const newCustomer = await Customer.create(customer)

        return newCustomer
    }

    public async update(id: string, user: ICustomer): Promise<ICustomer | null> {

        if (!id) {
            throw new AppError('Não pode ser atualizado.');
        }

        const updatedUser = await Customer.findOneAndUpdate({ _id: id }, user, {
            new: false,
            upsert: true
        })


        if (!updatedUser) {
            throw new AppError('Usuário não encontrado.');
        }

        console.log(updatedUser)

        return updatedUser
    }

    public async delete(id: string): Promise<string> {

        const { deletedCount } = await User.deleteOne({ _id: id })

        if (deletedCount === 0) {
            throw new AppError('Usuário não encontrado.');
        }

        return "Usuário deletado com sucesso"
    }

    public async list(): Promise<ICustomer[]> {

        const listUsers = await Customer.find()

        return listUsers

    }

    public async getById(id: string): Promise<ICustomer | null> {

        if (!id) {
            throw new AppError('Necessário passar o ID.');
        }

        const user = await Customer.findOne({ _id: id })
        return user
    }

    public async findByEmail(email: string): Promise<ICustomer> {

        const userByEmail = await Customer.findOne({ email: email })

        if (!userByEmail) {
            throw new AppError('Usuário com este email não encontrado');
        }

        return userByEmail
    }

}