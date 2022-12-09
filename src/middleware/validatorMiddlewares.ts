import { NextFunction, Request, Response } from 'express';
import { loginSchema, registerSchema } from '../schema/auth.schema';
import { Responser } from '../utilities';

export const loginValidator = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    await loginSchema
        .validate(req.body, { abortEarly: false })
        .then(() => {
            return next();
        })
        .catch(function (err) {
            return Responser({
                res,
                status: 400,
                body: err.errors,
                message: err.name,
                devMessage: '',
            });
        });
};

export const registerValidator = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    await registerSchema
        .validate(req.body, { abortEarly: false })
        .then(() => {
            return next();
        })
        .catch(function (err) {
            return Responser({
                res,
                status: 400,
                body: err.errors,
                message: err.name,
                devMessage: '',
            });
        });
};
