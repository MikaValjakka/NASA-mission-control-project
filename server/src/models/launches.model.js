const launches = require('./launches.mongo');
const planets = require('./planets.mongo')

const DEFAULT_FLIGHT_NUMBER = 100;

//const launches = new Map();

// Example launch created
const launch = {
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
saveLaunchToMongoDB(launch)


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




async function getAllLaunches(){
    
    //return Array.from(launches.values());
    return await launches
        .find({},{ '_id':0, '__v':0 });
}




async function saveLaunchToMongoDB(launch){
    // Check if target truly exists in planets DB
    const planet = await planets.findOne({
        keplerName: launch.target,
    });

    if(!planet) {
        throw new Error('No matching planet found');
    }
    // await launches.findOneAndUpdate
    await launches.updateOne({
        flightNumber: launch.flightNumber,
    }, launch, {
        upsert: true
    })
}




async function scheduleNewLaunch(launch){
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
    scheduleNewLaunch
}