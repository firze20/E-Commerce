import dotenv from 'dotenv';

dotenv.config();

/**
 * Configuration type definition.
 * @type {Object} AuthConfig
 * @property {string} jwtSecret - The secret key for JWT.
 * @property {string} refreshTokenSecret - The secret key for refresh tokens.
 * @property {number} jwtExpiration - The expiration time for the access token JWT.
 * @property {number} jwtRefreshExpiration - The expiration time for the refresh token JWT.
 */
type AuthConfig = {
  jwtSecret: string;
  refreshTokenSecret: string;
  jwtExpiration: number;
  jwtRefreshExpiration: number;
}

/**
 * The application configuration object.
 * This object contains critical environment variables for the application.
 * 
 * @type {AuthConfig}
 */
const config: AuthConfig = {
  jwtSecret: process.env.JWT_SECRET as string,
  refreshTokenSecret: process.env.REFRESH_SECRET as string,
  jwtExpiration: Number(process.env.JWT_EXPIRATION) * 1000,
  jwtRefreshExpiration: Number(process.env.JWT_REFRESH_EXPIRATION) * 1000,
};

// Check for missing environment variables and throw an error if any are undefined
if (!config.jwtSecret) {
  throw new Error('Missing environment variable: JWT_SECRET');
}

if (!config.refreshTokenSecret) {
  throw new Error('Missing environment variable: REFRESH_SECRET');
}

if(!config.jwtExpiration){
  throw new Error('Missing environment variable: JWT_EXPIRATION');
}

if(!config.jwtRefreshExpiration){
  throw new Error('Missing environment variable: JWT_REFRESH_EXPIRATION');
}

export default config;