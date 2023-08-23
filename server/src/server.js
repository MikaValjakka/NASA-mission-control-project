const http = require('http');
const { mongoConnect } = require('./services/mongo');
const app = require('./app');
const { loadPlanetsData } = require('./models/planets.model');
const { loadLaunchData } = require('./models/launches.model')



// front-end runs on port 3000
//back-end runs on default port 8000
const PORT = process.env.PORT || 8000;

const server = http.createServer(app);


async function startServer (){
    // connect to mongo db
    await mongoConnect();

    // load launches data
    await loadLaunchData();

    //load planets data
    await loadPlanetsData();

    server.listen(PORT, ()=>{
        console.log(`Listening port ${PORT}`);
    })
}

startServer();