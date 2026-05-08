import dotenv from 'dotenv';

dotenv.config();

const requiredVariables = [
  'MONGODB_URI',
  'API_USER',
  'API_PASSWORD',
  'JWT_SECRET',
  'PORT',
] as const;

type RequiredEnv = (typeof requiredVariables)[number];

const missing = requiredVariables.filter(
  (key): key is RequiredEnv => !process.env[key] || process.env[key].trim() === '',
);

if (missing.length > 0) {
  throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
}

const port = Number(process.env.PORT);
if (Number.isNaN(port) || port <= 0) {
  throw new Error('PORT must be a valid positive number');
}

const mongodbUri = process.env.MONGODB_URI as string;
const apiUser = process.env.API_USER as string;
const apiPassword = process.env.API_PASSWORD as string;
const jwtSecret = process.env.JWT_SECRET as string;

export const config = {
  mongodbUri,
  apiUser,
  apiPassword,
  jwtSecret,
  port,
};
