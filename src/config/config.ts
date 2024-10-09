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
})

export type DatabaseConfig = ReturnType<typeof config>['database']

export type CorsConfig = ReturnType<typeof config>['cors']

export default config
