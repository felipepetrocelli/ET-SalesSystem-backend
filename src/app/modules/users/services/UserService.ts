import AppError from "../../../shared/errors/AppError";
import { IUserModel } from "../schemas/UserSchema";
import User from '../schemas/UserSchema'
import { IUser } from "../models/UserModel";
import BcryptHashProvider from "../providers/implementations/BcryptHashProvider";

export default class UserService {


    public async create(user: IUserModel): Promise<IUserModel> {

        const hashProvider = new BcryptHashProvider()
        const userByEmail = await User.findOne({ email: user.email })

        if (userByEmail) {
            throw new AppError(`Usuário com email ${user.email} ja foi criado `);
        }

        const hashedPassword = await hashProvider.generateHash(user.password)

        const nUser: IUser = {
            name: user.name,
            email: user.email,
            password: hashedPassword
        }

        const newUser = await User.create(nUser)

        return newUser
    }

    public async update(id: string, user: IUser): Promise<IUser | null> {

        if (!id) {
            throw new AppError('Não pode ser atualizado.');
        }

        const updatedUser = await User.findOneAndUpdate({ _id: id }, user, {
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

    public async list(): Promise<IUser[]> {

        const listUsers = await User.find()

        return listUsers

    }

    public async getById(id: string): Promise<IUserModel | null> {

        if (!id) {
            throw new AppError('Necessário passar o ID.');
        }

        const user = await User.findOne({ _id: id })
        return user
    }

    public async findByEmail(email: string): Promise<IUserModel> {

        const userByEmail = await User.findOne({ email: email })

        if (!userByEmail) {
            throw new AppError('Usuário com este email não encontrado');
        }

        return userByEmail
    }

}