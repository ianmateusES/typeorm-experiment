import { DataSource } from 'typeorm';

const dataSource = new DataSource({
  type: 'postgres',
  port: 5432,
  host: process.env.POSTGRES_HOST || 'localhost',
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database:
    process.env.NODE_ENV === 'test'
      ? `${process.env.POSTGRES_DATABASE}_test`
      : process.env.POSTGRES_DATABASE,
  entities: ['src/entities/*.ts'],
  migrations: ['src/database/migrations/*.ts'],
});

const createConnection = (host = 'postgres'): Promise<DataSource> => {
  return dataSource.setOptions({ host }).initialize();
};

export { createConnection };

export default dataSource;
