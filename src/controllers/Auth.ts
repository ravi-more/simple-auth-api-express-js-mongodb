import { NextFunction, Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import User from '../models/User';
import { config } from '../config/config';

const login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    return User.findOne({ email })
        .then(async (user) => {
            if (user) {
                if (await bcrypt.compare(password, user.password)) {
                    const payload = { _id: user._id, email: user.email };
                    const token = jwt.sign(payload, config.server.token_secret_key, { expiresIn: '24h' });
                    return res.status(200).json({ token });
                } else {
                    return res.status(422).json({ message: 'Wrong username or password' });
                }
            } else {
                return res.status(422).json({ message: 'Wrong username or password' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

export default { login };
