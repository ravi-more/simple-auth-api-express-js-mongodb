import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import User from '../models/User';
import Logging from '../library/Logging';
import ICustomRequest from '../interface/CustomeRequest';
const saltRounds = 11;

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    const { firstName, lastName, email, mobile, password } = req.body;

    return bcrypt.hash(password, saltRounds, async (err: any, hash: string) => {
        if (err) {
            Logging.error(`Error hashing password: ${err}`);
            return res.status(500).json({ message: 'Something went wrong' });
        } else {
            let lastLoginAt = new Date();

            let userByEmail = User.findOne({ email });
            if (await userByEmail) {
                return res.status(422).json({ message: 'Email already exists' });
            }

            let userByMobile = User.findOne({ mobile });
            if (await userByMobile) {
                return res.status(422).json({ message: 'Mobile already exists' });
            }

            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                firstName,
                lastName,
                email,
                mobile,
                password: hash,
                lastLoginAt
            });

            return user
                .save()
                .then((user) => res.status(201).json({ user }))
                .catch((error) => res.status(500).json({ error }));
        }
    });
};

const readUser = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;
    return User.findById(userId)
        .then((user) => (user ? res.status(200).json(user) : res.status(404).json({ message: 'Not found' })))
        .catch((error) => res.status(500).json({ error }));
};

const readAllUser = async (req: Request, res: Response, next: NextFunction) => {
    return User.find()
        .then((users) => res.status(200).json({ users }))
        .catch((error) => res.status(500).json({ error }));
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;
    return User.findById(userId)
        .then(async (user) => {

            if (user) {
                const { firstName, lastName, email, mobile } = req.body;
                let userByEmail = User.findOne({ email });
                if ((await userByEmail) && email != user.email) {
                    return res.status(422).json({ message: 'Email already exists' });
                }
                let userByMobile = User.findOne({ mobile });
                if ((await userByMobile) && mobile != user.mobile) {
                    return res.status(422).json({ message: 'Mobile already exists' });
                }
                user.set({ firstName, lastName, email, mobile });
                return user.save().then((user) => res.status(201).json(user));
            } else {
                return res.status(404).json({ message: 'Not found' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

const changeUserPassword = async (req: ICustomRequest, res: Response, next: NextFunction) => {
    const { currentPassword, newPassword, confirmNewPassword } = req.body;
    const user = req.user;

    if (newPassword !== confirmNewPassword) {
        return res.status(422).json({ message: 'Password does not match' })
    }

    if (user?.password && await bcrypt.compare(currentPassword, user?.password)) {
        return bcrypt.hash(newPassword, saltRounds, async (err: any, hash: string) => {
            if (err) {
                Logging.error(`Error hashing password: ${err}`);
                return res.status(500).json({ message: 'Something went wrong' });
            } else {
                return User.updateOne({ '_id': user?._id }, { '$set': { password: hash } })
                    .then(async (user) => {

                        if (user) {
                            return res.status(200).json({ message: 'Password changed successfully!' });
                        } else {
                            return res.status(404).json({ message: 'Not found' });
                        }
                    })
                    .catch((error) => res.status(500).json({ error }));
            }
        });
    } else {
        return res.status(422).json({ message: 'Wrong password' });
    }
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;
    return User.findByIdAndDelete(userId).then((user) => (user ? res.status(201).json({ message: 'Deleted' }) : res.status(404).json({ message: 'Not found' })));
};

export default { createUser, updateUser, readUser, readAllUser, deleteUser, changeUserPassword };
