import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors'
const port = process.env.PORT || 5000;
import student from './routes/student.routes';
// DB config
import connectToDb from './db/connect'
// Body parser middleware
const server = express();

connectToDb();
server.use(cors());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
// test entry point

server.get('/', (req, res) => res.send('Hola Diego'));

// Use Routes
server.use('/api/v1/students', student);
server.listen(port, () => console.log(`Server running on port ${port}`));