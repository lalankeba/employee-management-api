require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to database');
        app.listen(port, () => {
            console.log(`App is running on port: ${port}`);
        });        
    })
    .catch((error) => {
        console.log('Error connecting with db ', error);
    });
