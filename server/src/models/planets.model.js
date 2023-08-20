const { parse } = require('csv-parse');
const fs = require('fs');
const path = require('path');

const planets = require('./planets.mongo');

//const habitablePlanets = [];

function isHabitablePlanet(planet) {
    return planet['koi_disposition'] === 'CONFIRMED'
    && (planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11)
    && planet['koi_prad'] < 1.6;
}

function loadPlanetsData() {
  return new Promise((resolve,reject) => {
    // Clear the habitablePlanets array before starting the data loading
    //habitablePlanets.length = 0;
    
    fs.createReadStream(path.join(__dirname, '..','..','data','kepler_data.csv'))
    .pipe(parse({
        comment: '#',
        columns: true,
    }))
    .on('data', async (data) => {
        if(isHabitablePlanet(data)) {
            // If planet is habitable the call function savePlanet and save planet DATA
            savePlanet(data);
            };
         })
            
        
    
    .on('error',(err)=> {
        console.log("No such file or directory")
        console.log(err)
        reject(err)
    })
    .on('end', async () =>{

        const countOfFoundPlanets = (await getAllPlanetsFromDB()).length;
          
        console.log(`We have found: ${countOfFoundPlanets} habitable planets.`)
        resolve();
    });
  });// end of promise
} // end of loadPlanetsData function

// get planets from mongo DB
async function getAllPlanetsFromDB() {
    return await planets.find({});
}

async function savePlanet(planet) {
    try{
    await planets.updateOne({
        // checks if planet exists in DB
            keplerName: planet.kepler_name
        }, {
        // adds planet if it doesn't exis in DB
            keplerName: planet.kepler_name
        }, {
        // sets upsert(insert/update) to true
            upsert: true
        })
    } catch(err) {
        console.error(`Could not save planet ${err}`);
    }
};

    module.exports = {
        loadPlanetsData,
        getAllPlanetsFromDB,
       // planets: habitablePlanets,
    }
