import { Router } from "express";
import CustomerController from "../controllers/CustomerController";


const customerRouter = Router();
const customerController = new CustomerController();

customerRouter.get('/list', customerController.index);

customerRouter.get(
    '/:id',
    customerController.show,
);

customerRouter.post(
    '/create',
    customerController.create,
);

customerRouter.put(
    '/update/:id',
    customerController.update,
);

customerRouter.delete(
    '/delete/:id',
    customerController.delete,
);

export default customerRouter;