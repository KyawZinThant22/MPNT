import { Post } from './post.service';
import { PrismaClient } from '@prisma/client';
import { Response, Request } from 'express';
import { Responser } from '../utilities';

const post = new Post();

const fetchPosts = async (req: Request, res: Response) => {
    try {
        await post.FetchPosts({
            callback: (err: any, data: any) => {
                if (err) {
                    return Responser({
                        res: res,
                        status: 400,
                        body: null,
                        message: err,
                        devMessage: err,
                    });
                } else if (data) {
                    return Responser({
                        res: res,
                        status: 201,
                        body: data,
                        message: 'Unit Fetch Success!',
                        devMessage: '',
                    });
                } else {
                    return Responser({
                        res: res,
                        status: 500,
                        body: null,
                        message: err,
                        devMessage: err.message,
                    });
                }
            },
        });
    } catch (err) {
        return Responser({
            res,
            body: null,
            message: err.message,
            devMessage: err,
            status: 400,
        });
    }
};

const CreatePost = async (req: Request, res: Response) => {
    try {
        const { title, content, authorId } = req.body;

        const resData = post.CreatePost({
            authorId,
            title,
            content,
            callback: (err, data) => {
                if (err) {
                    console.log(err);
                    return Responser({
                        res,
                        message: err,
                        status: 400,
                        body: null,
                        devMessage: null,
                    });
                } else if (data) {
                    return Responser({
                        res,
                        message: 'Create Success',
                        body: data,
                        devMessage: 'good',
                        status: 201,
                    });
                } else {
                    return Responser({
                        res,
                        body: null,
                        devMessage: err.message,
                        status: 400,
                        message: '',
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

const updatePost = async (req: Request, res: Response) => {
    try {
        const { title, content } = req.body;
        const { id } = req.params;
        const data = await post.UpdatePost({
            id,
            title,
            content,
            callback: (err, data) => {
                if (err) {
                    return Responser({
                        res,
                        body: null,
                        devMessage: null,
                        message: err,
                        status: 400,
                    });
                } else if (data) {
                    return Responser({
                        res,
                        body: data,
                        devMessage: 'Update success',
                        message: err,
                        status: 200,
                    });
                } else {
                    return Responser({
                        res,
                        body: null,
                        message: err.message,
                        status: 400,
                        devMessage: null,
                    });
                }
            },
        });
    } catch (errors) {
        return Responser({
            res,
            message: errors.message,
            body: null,
            devMessage: null,
            status: 400,
        });
    }
};

const deletePost = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await post.DeletePost({
            id,
            callback: (err, data) => {
                if (err) {
                    return Responser({
                        res,
                        message: err,
                        devMessage: null,
                        status: 400,
                        body: null,
                    });
                } else if (data) {
                    return Responser({
                        res: res,
                        status: 200,
                        devMessage: 'good',
                        message: 'Delete Success',
                        body: data,
                    });
                } else {
                    return Responser({
                        res: res,
                        status: 500,
                        body: null,
                        message: err,
                        devMessage: err.message,
                    });
                }
            },
        });
    } catch (err) {
        return Responser({
            res,
            body: null,
            devMessage: null,
            status: 400,
            message: err.message,
        });
    }
};

export const PostController = {
    CreatePost,
    updatePost,
    deletePost,
    fetchPosts,
};
