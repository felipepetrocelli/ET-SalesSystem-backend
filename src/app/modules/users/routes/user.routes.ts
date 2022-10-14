import { Router } from "express";
import UsersController from "../controllers/UsersController"

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.get('/list', usersController.index);

usersRouter.get(
    '/:id',
    usersController.show,
);

usersRouter.post(
    '/create',
    usersController.create,
);

usersRouter.put(
    '/update/:id',
    usersController.update,
);

usersRouter.delete(
    '/delete/:id',
    usersController.delete,
);

export default usersRouter;