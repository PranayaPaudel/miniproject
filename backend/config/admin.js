import dotenv from 'dotenv';

dotenv.config();

export const ADMIN_CREDENTIALS = {
  username: process.env.ADMIN_USERNAME || 'admin@admin.com',
  password: process.env.ADMIN_PASSWORD || 'admin123',
};
