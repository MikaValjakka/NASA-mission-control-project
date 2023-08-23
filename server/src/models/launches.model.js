const launches = require('./launches.mongo');
const planets = require('./planets.mongo');
const axios = require ('axios');

const DEFAULT_FLIGHT_NUMBER = 100;
const SPACEX_API_URL = 'https://api.spacexdata.com/v5/launches/query';



// Example launch created
/*const launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 27, 2030'),
    target: 'Kepler-442 b',
    customers: ['NASA', 'USAF'],
    upcoming: true,
    success: true

};
// Example launch save to DB
saveLaunchToMongoDB(launch);
*/

// post req with axios to  third party API
async function populateDatabase(){
    console.log('Downloading launch data from SpaceX-API...');

    const response = await axios.post(SPACEX_API_URL, {
        query: {},
        options: {
            pagination: false,
            populate: [
                {
                    path: 'rocket',
                    select:{
                        name: 1
                    }
                },
                {
                    path: 'payloads',
                    select: {
                        'customers':1
                    }
                }
            ]
        }

    });

    const launchDocs = response.data.docs;
    
    for(const launchDoc of launchDocs){

        const payloads = launchDoc['payloads'];

        const customers = payloads.flatMap((payload) =>{
            return payload['customers'];
        });

        const launch = {
            flightNumber: launchDoc['flight_number'],
            mission: launchDoc['name'],
            rocket: launchDoc['rocket']['name'],
            launchDate: launchDoc['date_local'],
            upcoming: launchDoc['upcoming'],
            success: launchDoc['success'],
            customers: customers
            
        };

        console.log(`Launch flight number is ${launch.flightNumber} mission ${launch.mission}`)
        await saveLaunchToMongoDB(launch);
        
    }

    
}



async function loadLaunchData(){

    const launchInDatabase = await findLaunch({
        flightNumber:1,
        rocket:'Falcon 1',
        mission:'FalconSat'
    });

    if(launchInDatabase){
        console.log(`Launch data has been loaded`);
    }
    else {
        await populateDatabase();
        console.log('Populating DB')
    }
  
}


// Generic find laucnh from MONGO DATABASE
async function findLaunch(filter){
    return await launches.findOne(filter);
}

async function existsLaunchById(launchId) {
    return await launches.findOne({
        flightNumber: launchId
    })
}




async function getLatestFlightNumber(){
    const latestLaunch = await launches
        .findOne({})
        .sort('-flightNumber');

    if(!latestLaunch) {
        return DEFAULT_FLIGHT_NUMBER;
    }
    
    return latestLaunch.flightNumber;
}




async function getAllLaunches(skip, limit){
    
    // /launches/?limit=5&page=1
    return await launches
        .find({},{ '_id':0, '__v':0 })
        .skip(skip)
        .limit(limit);
}




async function saveLaunchToMongoDB(launch){


    // await launches.findOneAndUpdate
    await launches.findOneAndUpdate({
        flightNumber: launch.flightNumber,
    }, launch, {
        upsert: true
    })
}




async function scheduleNewLaunch(launch){

     // Check if target truly exists in planets DB
     const planet = await planets.findOne({
        keplerName: launch.target,
    });

    if(!planet) {
        throw new Error('No matching planet found');
    }

    const newFlightNumber = await getLatestFlightNumber() + 1;

    const newLaunch = Object.assign(launch, {
        success: true,
        upcoming: true,
        customers: ['NASA', 'JAXA'],
        flightNumber: newFlightNumber
    });
    await saveLaunchToMongoDB(newLaunch);
}




async function abortLaunchById(launchId){

    const abortedLaunch = await launches.updateOne({
        flightNumber: launchId
    }, {
        upcoming: false,
        success: false
    });

    return abortedLaunch.modifiedCount === 1;

}


module.exports ={
    getAllLaunches,
    saveLaunchToMongoDB,
    existsLaunchById,
    abortLaunchById,
    scheduleNewLaunch,
    loadLaunchData
}