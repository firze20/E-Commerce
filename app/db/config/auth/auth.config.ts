interface jwtConfig {
    secret: string;
    jwtExpiration: number;
    jwtRefreshExpiration: number;
    jwtValidationExpiration: number;
}

const jwtConfiguraiton: jwtConfig = {
    secret: process.env.JWT_SECRET as string,
    jwtExpiration: parseInt(process.env.JWT_EXPIRATION as string),
    jwtRefreshExpiration: parseInt(process.env.JWT_REFRESH_EXPIRATION as string),
    jwtValidationExpiration: parseInt(process.env.JWT_VALIDATION_EXPIRATION as string),
}

export default jwtConfiguraiton;

