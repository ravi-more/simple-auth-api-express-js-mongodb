import { Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { config } from '../config/config';
import User from '../models/User';
import ICustomRequest from '../interface/CustomeRequest';

export default class LoginRequired {
    async user(req: ICustomRequest, res: Response, next: NextFunction) {
        const token = req.headers.authorization?.split(' ')[1];

        if (token) {
            try {
                const tokenData: any = jwt.verify(token, config.server.token_secret_key);
                if (tokenData) {
                    return User.findOne({ _id: tokenData._id })
                        .then(async (user) => {
                            if (user) {
                                req.user = user;
                                next();
                            } else {
                                return res.status(401).json({ message: 'Unauthorized' });
                            }
                        })
                        .catch((error) => res.status(500).json({ message: error }));
                } else {
                    return res.status(401).json({ message: 'Unauthorized' });
                }
            } catch (error) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
        } else {
            return res.status(401).json({ message: 'Unauthorized' });
        }
    }
}
