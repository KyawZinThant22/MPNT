import { User } from './user.service';
import { Request, Response } from 'express';
import { Responser } from '../utilities';
import { PrismaClient } from '@prisma/client';

const { user } = new PrismaClient();

const registerUser = async (req: Request, res: Response) => {
    try {
        const { name, password, email } = req.body;
        const user = new User();

        const resData = user.register({
            name,
            email,
            password,
            callback: (err: any, data: any) => {
                if (err) {
                    return Responser({
                        res,
                        message: err,
                        body: null,
                        devMessage: null,
                        status: 400,
                    });
                } else if (data) {
                    return Responser({
                        res,
                        message: 'Create Success',
                        body: data,
                        devMessage: 'Good boy',
                        status: 201,
                    });
                } else {
                    return Responser({
                        res,
                        message: '',
                        body: null,
                        devMessage: err.message,
                        status: 400,
                    });
                }
            },
        });
    } catch (error) {
        return Responser({
            res,
            message: error,
            body: null,
            devMessage: null,
            status: 400,
        });
    }
};

const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = new User();

        const data = await user.Login({
            email,
            password,
            callback: (err: any, data: any) => {
                if (err) {
                    return Responser({
                        res: res,
                        body: null,
                        status: 400,
                        message: err,
                        devMessage: err,
                    });
                } else if (data) {
                    return Responser({
                        res: res,
                        body: data,
                        status: 200,
                        message: 'Login Success',
                        devMessage: '',
                    });
                } else {
                    return Responser({
                        res: res,
                        body: null,
                        status: 500,
                        message: err,
                        devMessage: err,
                    });
                }
            },
        });
    } catch (error) {
        return Responser({
            res,
            message: error.message,
            body: null,
            devMessage: null,
            status: 400,
        });
    }
};

const me = async (req: Request, res: Response) => {
    try {
        const userData = await user.findUnique({
            where: {
                id: res.locals.user.id,
            },
            include: {
                posts: true,
            },
        });
        if (userData) {
            return Responser({
                res,
                status: 200,
                body: userData,
                message: 'user fetch success',
                devMessage: '',
            });
        } else {
            return Responser({
                res,
                status: 400,
                body: null,
                message: 'user fetch fail',
                devMessage: '',
            });
        }
    } catch (error) {
        return Responser({
            res,
            message: error,
            body: null,
            devMessage: null,
            status: 400,
        });
    }
};

const deleteAllUser = async (req: Request, res: Response) => {
    try {
        const deleteUser = await user.deleteMany();
        if (deleteAllUser) {
            return Responser({
                res,
                status: 200,
                body: deleteAllUser,
                message: 'Delete Success',
                devMessage: '',
            });
        } else {
            return Responser({
                res,
                message: 'User Delete Failed',
                body: null,
                devMessage: null,
                status: 400,
            });
        }
    } catch (error) {
        return Responser({
            res,
            message: error,
            body: null,
            devMessage: null,
            status: 400,
        });
    }
};

export const UserController = { registerUser, loginUser, me, deleteAllUser };
