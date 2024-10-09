const config = () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    database: {
        url: process.env.DATABASE_URL || '',
    },
    cors: {
        origin: process.env.CORS_ORIGINS?.split(',') || '*',
        methods: process.env.CORS_METHODS || 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: process.env.CORS_CREDENTIALS === 'true' || true,
    },
    jwt: {
        accessSecret: process.env.JWT_ACCESS_SECRET || 'accessSecret',
        refreshSecret: process.env.JWT_REFRESH_SECRET || 'refreshSecret',
    },
})

export type DatabaseConfig = ReturnType<typeof config>['database']

export type CorsConfig = ReturnType<typeof config>['cors']

export type AuthConfig = ReturnType<typeof config>['jwt']

export default config
