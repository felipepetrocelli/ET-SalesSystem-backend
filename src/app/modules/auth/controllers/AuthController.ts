import { Request, Response } from 'express';
import AuthService from '../services/AuthService';
import UserService from '../services/AuthService';

const authService = new AuthService

export default class AuthController {


  public async create(request: Request, response: Response): Promise<Response> {

    const user = request.body

    const newUser = await authService.create(user)

    return response.json(newUser)
  }

}
