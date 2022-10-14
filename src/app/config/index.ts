import express, { Express, NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import cors from 'cors'
import routes from "../shared/routes";
import connectMongoDb from '../database';
import AppError from '../shared/errors/AppError';



export default function appConfig(app: Express): void {

    connectMongoDb()

    app.use(cors())
    app.use(express.json())
    app.use(routes)

    app.use(
        (error: Error, request: Request, response: Response, next: NextFunction) => {
            if (error instanceof AppError) {
                console.error(error);
                return response.status(error.statusCode).json({
                    status: 'error',
                    message: error.message,
                });
            }

            console.error(error);
            return response.status(500).json({
                status: 'error',
                message: 'Internal server error',
            });
        },
    );

}