const express = require('express');
const {getAllLaunches, addNewLaunch, abortLaunch} = require('./launches.controller');

const launchesRouter = express.Router();

// through '/launches/' by app.js
launchesRouter.get('/', getAllLaunches);
launchesRouter.post('/', addNewLaunch);
launchesRouter.delete('/:id', abortLaunch);


module.exports = launchesRouter;

