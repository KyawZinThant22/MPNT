import { PrismaClient } from '@prisma/client';
import { IDelete, Iproduct, IUpdate } from '../@types/product/product';

const { post } = new PrismaClient();

export class Post {
    async FetchPosts({ callback }) {
        await post
            .findMany({
                orderBy: {
                    created_at: 'asc',
                },
            })
            .then((data) => {
                return callback(null, data);
            })
            .catch((e) => {
                return callback(e, null);
            });
    }

    async CreatePost({ title, content, callback, authorId }: Iproduct) {
        await post
            .create({
                data: {
                    title: title,
                    content: content,
                    author: {
                        connect: {
                            id: authorId,
                        },
                    },
                },
            })
            .then((data) => {
                return callback(null, data);
            })
            .catch((err) => {
                return callback(err, null);
            });
    }

    async UpdatePost({ id, callback, title, content }: IUpdate) {
        await post
            .update({
                where: {
                    id: id,
                },
                data: {
                    title,
                    content,
                },
            })
            .then((data) => {
                return callback(null, data);
            })
            .catch((err) => {
                return callback(err, null);
            });
    }

    async DeletePost({ id, callback }: IDelete) {
        await post
            .delete({
                where: {
                    id: id,
                },
            })
            .then((data) => {
                return callback(null, data);
            })
            .catch((err) => {
                return callback(err, null);
            });
    }
}
