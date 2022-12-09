declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: string;
            DATABASE_URL: string;
            NODE_ENV: string;
            TOKEN_SECRET: string;
        }
    }
}
export {};
