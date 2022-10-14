import { Request, Response } from 'express';
import UserService from '../services/UserService';

const userService = new UserService

export default class UsersController {

  public async index(request: Request, response: Response): Promise<Response> {

    const listUsers = await userService.list()

    return response.json(listUsers)

  }

  public async show(request: Request, response: Response): Promise<Response> {

    const { id } = request.params
    console.log(id)
    const user = await userService.getById(id)

    return response.json(user)

  }

  public async create(request: Request, response: Response): Promise<Response> {

    const user = request.body

    const newUser = await userService.create(user)

    return response.json(newUser)
  }

  public async update(request: Request, response: Response): Promise<Response> {

    const user = request.body
    const { id } = request.params

    const updatedUser = await userService.update(id, user)

    return response.json(updatedUser)
  }

  public async delete(request: Request, response: Response): Promise<Response> {

    const { id } = request.params

    const deletedUser = await userService.delete(id)

    return response.json(deletedUser)
  }
}
