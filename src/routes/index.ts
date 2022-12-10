import { Router } from 'express';
import PostRoute from '../post/post.routes';
import userRoute from '../user/user.routes';

const routes = Router();

routes.use('/auth', userRoute);
routes.use('/post/', PostRoute);

export default routes;
