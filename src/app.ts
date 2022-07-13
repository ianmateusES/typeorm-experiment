import 'dotenv/config';
import 'reflect-metadata';
import cors from 'cors';
import { createConnection } from 'database';
import express from 'express';
import { routes } from 'routes';

createConnection(process.env.POSTGRES_HOST);
const app = express();

app.use(express.json());

app.use(cors());

app.use(routes);

export { app };
