import { config as dotenvConfig } from 'dotenv';
import { join } from 'path';

dotenvConfig({ path: join(process.cwd(), '.env') });


  export const WEB_URL = process.env.WEB_URL;
  export const EMAIL = process.env.EMAIL ?? 'customer@practicesoftwaretesting.com';
  export const USER_PASSWORD = process.env.USER_PASSWORD;
  export const USER_NAME= process.env.USER_NAME;
