// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
import express from "express";
import path from "path";
import cors from "cors";
import { urlencoded, json } from "body-parser";
import { ValidationError } from "express-validation";

const port = 5000;

const userController = require('./task2/user-controller');

const app = express();

app.use(cors());

app.use(urlencoded({ extended: true }))
app.use(json())

app.use('/user', userController);

app.use((err: any, req: any, res: any, next: any) => {
    if (err instanceof ValidationError) {
        return res.status(err.statusCode).json(err)
    }

    return res.status(500).json(err)
})

app.listen(process.env.PORT || port, () => {
    console.log(`Starting the server at port ${port}`);
});
