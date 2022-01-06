export const configuration = () => ({
    /*NODE_ENV: process.env.NODE_ENV,
    port: parseInt(process.env.PORT, 10) || 3001,
     jwt: {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRES_IN,
    },*/
    database: {
        host: process.env.MSSQL_HOST,
        port: parseInt(process.env.MSSQL_PORT, 10),
        username: process.env.MSSQL_USER,
        password: process.env.MSSQL_PASSWORD,
        database: process.env.MSSQL_DATABASE,
    },
    redis: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      defaultTtl: process.env.REDIS_TTL
  }
  });