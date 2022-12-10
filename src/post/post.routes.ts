import { Router } from 'express';
import authenticateToken from '../middleware/authMiddleWare';
import { createPost } from '../schema/post.schema';
import { PostController } from './post.controller';

const PostRoute = Router();

PostRoute.get('/', authenticateToken, PostController.fetchPosts);
PostRoute.post('/create', authenticateToken, PostController.CreatePost);
PostRoute.put('/edit/:id', authenticateToken, PostController.updatePost);
PostRoute.delete('/delete/:id', authenticateToken, PostController.deletePost);

export default PostRoute;
