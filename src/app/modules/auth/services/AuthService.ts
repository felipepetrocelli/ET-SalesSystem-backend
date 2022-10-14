import AppError from "../../../shared/errors/AppError";
import BcryptHashProvider from "../../users/providers/implementations/BcryptHashProvider";
import UserService from "../../users/services/UserService";
import { IUserLogin, IUserToken, IUserTokenResponse } from "../models/UserTokenModel";
import Auth from '../schemas/AuthSchema'
import authConfig from '../../../config/auth'
import { sign, Secret } from 'jsonwebtoken';


export default class AuthService {

    public async create(user: IUserLogin): Promise<IUserTokenResponse> {

        const userService = new UserService()
        const hashPassword = new BcryptHashProvider()

        const findedUser = await userService.findByEmail(user.email)

        if (!findedUser) {
            throw new AppError(`Usuário com email ${user.email} não encontrado `);
        }

        const confirmPassword = await hashPassword.compareHash(user.password, findedUser.password)

        if (!confirmPassword) {
            throw new AppError(`Usuário ou senha incorretos`);
        }

        const token = sign({}, '8Zz5tw0Ionm3XPZZfN0NOml3z9FMfmpgXwovR9fp6ryDIoGRM8EPHAB6iHsc0fb' as Secret, {
            subject: findedUser.email,
            expiresIn: authConfig.jwt.expiresIn,
        });

        const newToken: IUserToken = {
            userId: findedUser._id,
            token: token
        }

        const logedUser = await Auth.findOneAndUpdate({ email: findedUser.email }, newToken, {
            new: true,
            upsert: true
        })

        const userToken: IUserTokenResponse = {
            email: findedUser.email,
            token: token,
            id: findedUser.id
        }

        return userToken
    }

}