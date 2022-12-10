import { Router } from 'express';
import authenticateToken from '../middleware/authMiddleWare';
import {
    registerValidator,
    loginValidator,
} from '../middleware/validatorMiddlewares';
import { UserController } from './user.controller';

const userRoute = Router();

userRoute.post('/register', registerValidator, UserController.registerUser);
userRoute.post('/login', loginValidator, UserController.loginUser);
userRoute.get('/me', authenticateToken, UserController.me);
userRoute.post('/deleteAll', authenticateToken, UserController.deleteAllUser);

export default userRoute;
