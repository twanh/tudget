declare namespace NodeJS {
  export interface ProcessEnv {
    PG_USERNAME: string;
    PG_PASSWORD: string;
    PG_DATABASE: string;
    PORT: string;
    REDIS_PORT: string;
    COOCKIE_NAME: string;
    COOCKIE_SECRET: string;
  }
}
