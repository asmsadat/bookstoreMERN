import express from 'express';
import mongoose from 'mongoose';
import { PORT, mongoDBURL } from './config.js';
import { Book } from './models/bookModel.js';
import { request } from 'express';
import { response } from 'express';

const app = express();

app.use(express.json());

app.get('/', () => {
    console.log(request);
    return response.status(234).send('Welcome');
});

// Route for post book data to database
app.post('/api/books', async (request, response) => {
    try {
        if(
            !request.body.title ||
            !request.body.author ||
            !request.body.publishedYear
        ){
            return response.status(400).send({
                message: 'Send all requird field: title, author, publishedYear',
            });
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishedYear: request.body.publishedYear,
        };

        const book = await Book.create(newBook);

        return response.status(201).send(book);
        
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

// Route for get all books from database
app.get('/api/books', async (request, response) => {
    try {
        const books = await Book.find({});
        return response.status(200).json({
            count: books.length,
            data: books
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
})

// Route for get one books from database by id
app.get('/api/books/:id', async (request, response) => {
    try {
        const {id} = request.params;
        const book = await Book.findById({id});
        return response.status(200).json({book});
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
})


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
