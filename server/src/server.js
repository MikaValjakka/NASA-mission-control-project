const http = require('http');
const mongoose = require('mongoose');
const app = require('./app');
const {loadPlanetsData} = require('./models/planets.model')



// front-end runs on port 3000
//back-end runs on default port 8000
const PORT = process.env.PORT || 8000;

//...nasa-api:PASSWORD@...
const MONGO_URL="mongodb+srv://nasa-api:lI0WszH2mhyDLVLJ@nasacluster.enes6xy.mongodb.net/nasa?retryWrites=true&w=majority"

const server = http.createServer(app);

mongoose.connection.once('open', () =>{
    console.log('MongoDB connection ready!')
});

mongoose.connection.on('error',(err) =>{
    console.error(err)
})

async function startServer (){
   await mongoose.connect(MONGO_URL);

    await loadPlanetsData();

    server.listen(PORT, ()=>{
        console.log(`Listening port ${PORT}`);
    })
}

startServer();