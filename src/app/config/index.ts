import dotenv from 'dotenv';
import path from 'path'; //built in by express

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
  port: process.env.PORT,
  databaseUrl: process.env.DATABASE_URL,
  node_env: process.env.NODE_ENV,
};

//"mongoose": "^8.14.1"
