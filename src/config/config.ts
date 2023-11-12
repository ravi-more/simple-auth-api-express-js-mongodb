import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || '';
const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 1337;
const TOKEN_SECRET_KEY = process.env.TOKEN_SECRET_KEY;

if (TOKEN_SECRET_KEY === undefined) throw 'TOKEN_SECRET_KEY - is missing';

export const config = {
    mongo: {
        url: MONGO_URI
    },
    server: {
        port: SERVER_PORT,
        token_secret_key: TOKEN_SECRET_KEY
    }
};
