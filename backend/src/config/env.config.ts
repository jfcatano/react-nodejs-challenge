import 'dotenv/config';

export const envs = {
    NODEJS_SERVER_PORT: process.env.NODEJS_SERVER_PORT || 3000,
    MONGO_URI: process.env.MONGO_URI || '',
}
