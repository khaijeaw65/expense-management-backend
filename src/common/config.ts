import { PoolConfig } from 'mariadb';

type Config = {
  app: {
    port: number,
    env: string,
    authenKey: string,
    domain: string,
  },
  db: PoolConfig,
};

function checkEnvVariable(key: string) {
  const variable = process.env[key];

  if (!variable) {
    throw new Error(`environment variable ${key} is missing`);
  }

  return variable;
}

const config: Config = {
  app: {
    port: Number(checkEnvVariable('PORT')),
    env: checkEnvVariable('NODE_ENV'),
    authenKey: checkEnvVariable('AUTHEN_KEY'),
    domain: checkEnvVariable('DOMAIN'),
  },
  db: {
    host: checkEnvVariable('DB_HOST'),
    port: Number(checkEnvVariable('DB_PORT')),
    user: checkEnvVariable('DB_USER'),
    password: checkEnvVariable('DB_PASSWORD'),
    connectionLimit: Number(checkEnvVariable('DB_CONNECTION_LIMIT')),
    database: checkEnvVariable('DB_SCHEMA'),
    bigIntAsNumber: true,
    decimalAsNumber: true,
    insertIdAsNumber: true,
  },
};

export default config;
