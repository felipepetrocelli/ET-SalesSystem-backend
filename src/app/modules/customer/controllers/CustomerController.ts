import { Request, Response } from 'express';
import CustomerService from '../services/CustomerService';
import UserService from '../services/CustomerService';

const userService = new CustomerService

export default class CustomerController {

  public async index(request: Request, response: Response): Promise<Response> {

    const listUsers = await userService.list()

    return response.json(listUsers)

  }

  public async show(request: Request, response: Response): Promise<Response> {

    const { id } = request.params
    
    const user = await userService.getById(id)

    return response.json(user)

  }

  public async create(request: Request, response: Response): Promise<Response> {

    console.log(request.headers.authorization)

    const customer = request.body
    console.log(request.body)

    const newCustomer = await userService.create(customer)

    return response.json(newCustomer)
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
