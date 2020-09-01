import express, { request, response } from 'express';
import './database';
import routes from './routes';
import 'reflect-metadata';

const app = express();
app.use(express.json());
app.use(routes);

app.listen(3333, () => console.log('🐱‍🐉'));
