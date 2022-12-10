import * as yup from 'yup';

export const createPost = yup.object().shape({
    title: yup.string().required(),
    content: yup.string().required(),
    authorId: yup.string().required(),
});
