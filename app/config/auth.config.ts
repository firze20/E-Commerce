import dotenv from 'dotenv';

dotenv.config();

/**
 * Configuration type definition.
 * @type {Object} Config
 * @property {string} jwtSecret - The secret key for JWT.
 * @property {string} refreshTokenSecret - The secret key for refresh tokens.
 */
type Config = {
  jwtSecret: string;
  refreshTokenSecret: string;
}

/**
 * The application configuration object.
 * This object contains critical environment variables for the application.
 * 
 * @type {Config}
 */
const config: Config = {
  jwtSecret: process.env.JWT_SECRET as string,
  refreshTokenSecret: process.env.REFRESH_SECRET as string,
};

// Check for missing environment variables and throw an error if any are undefined
if (!config.jwtSecret) {
  throw new Error('Missing environment variable: JWT_SECRET');
}

if (!config.refreshTokenSecret) {
  throw new Error('Missing environment variable: REFRESH_SECRET');
}

export default config;