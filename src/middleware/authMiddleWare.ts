import { Request, Response, NextFunction } from 'express';
import { Responser } from '../utilities';
import jwt from 'jsonwebtoken';

function authenticateToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    let token = authHeader && authHeader?.split(' ')[1];

    if (token == null)
        return Responser({
            res,
            message: 'Provided Token',
            body: null,
            devMessage: '',
            status: 401,
        });

    jwt.verify(
        token,
        (process.env.TOKEN_SECRET as string) || 'KZT',
        (err: any, user: any) => {
            if (err)
                return Responser({
                    res,
                    message: 'Provided Token is expired',
                    body: null,
                    status: 401,
                    devMessage: '',
                });
            res.locals.user = user;
            next();
        }
    );
}

export default authenticateToken;
