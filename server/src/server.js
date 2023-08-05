const http = require('http');
const app = require('./app');
const {loadPlanetsData} = require('./models/planets.model')



// front-end runs on port 3000
//back-end runs on default port 8000
const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServer (){

    await loadPlanetsData();

    server.listen(PORT, ()=>{
        console.log(`Listening port ${PORT}`);
    })
}

startServer();