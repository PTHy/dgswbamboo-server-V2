import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import db from './database';

const {
  PORT,
} = require('./config.json');

const app = express();
const server = http.createServer(app);

app.use(morgan('dev'));
app.use(cors({
  origin: true,
  credentials: true,
}));

app.use(bodyParser.json());

app.use('/', require('./route'));

server.listen(PORT, () => {
  db();
  console.log('server runing');
});
