import app from './app'
import dotenv from 'dotenv'
import { envs } from './config';
import { connectDB } from "./config/db.config";

dotenv.config()

const PORT = envs.NODEJS_SERVER_PORT || 3000

connectDB().then(() => {
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  });