import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import { PORT, mongoDBURL } from './config.js';
import { Book } from './models/bookModel.js';
import bookRoute from './routes/booksRoutes.js';

const app = express();

//Middleware for parsing request body
app.use(express.json());

//Middleware for handle CORS policy
app.use(cors());
// app.use(cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     aloowedHeaders: [Content-Type],
// }));

app.get('/', () => {
    console.log(request);
    return response.status(234).send('Welcome');
});

app.use('/api/books', bookRoute);

mongoose.connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
