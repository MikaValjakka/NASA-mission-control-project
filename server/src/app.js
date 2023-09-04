const express = require('express');
const cors = require ('cors');
const path = require('path');
const morgan = require('morgan');

const planetsRouter = require('./routers/planets/planets.router');
const launchesRouter = require('./routers/launches/launches.router')

const app = express();

    app.use(cors({
    origin: 'http://localhost:3000'
}));

//morgan log service
app.use(morgan('combined'));


app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')))

// use our router modules
app.use('/planets',planetsRouter);
app.use('/launches', launchesRouter);

// export app
module.exports = app;