import { PrismaClient } from '@prisma/client';
import { ILogin, IRegister } from '../@types/auth/auth';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const { user } = new PrismaClient();

const saltRounds = 10;

export class User {
    async register({ name, password, email, callback }: IRegister) {
        const emailExist = await user.findFirst({
            where: {
                email: email,
            },
        });

        if (emailExist) {
            callback('Emalil already registered', null);
        }
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = bcrypt.hashSync(password, salt);
        await user
            .create({
                data: {
                    email: email,
                    userName: name,
                    passwrod: hash,
                },
            })
            .then((data) => callback(null, data))
            .catch((err) => callback(err, null));
    }

    async Login({ email, password, callback }: ILogin) {
        const emailExit = await user.findFirstOrThrow({
            where: {
                email: email,
            },
        });

        if (!emailExit) {
            callback('Email not found', null);
        } else {
            const checkPassword = bcrypt.compareSync(
                password,
                emailExit?.passwrod
            );
            if (checkPassword) {
                const token = jwt.sign(
                    {
                        id: emailExit?.id.toString(),
                    },
                    process.env.TOKEN_SECRET || 'KZT',
                    { expiresIn: '12hr' }
                );
                callback(null, { ...emailExit, token: token });
            } else {
                callback('Wrong Password', null);
            }
        }
    }
}
