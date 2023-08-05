const launches = new Map();

let latestFlightnumber = 100;

const launch = {

    flightNumber: 100,
    mission: 'Kepler Exploration X',
    rocket: 'Explorer IS!',
    launchDate: new Date('December 27, 2030'),
    target: 'Kepler-442 b',
    customers: ['NASA', 'USAF'],
    upcoming: true,
    success: true

};

// setting into Map datastructure a launch
launches.set(launch.flightNumber, launch);

function existsLaunchById(launchId) {

    return launches.has(launchId);
}

function getAllLaunches(){
    //Creates an array from iterable object in this case from MAP values
    return Array.from(launches.values());
}


function addNewLaunch(launch){
    // increace latest flight number
    latestFlightnumber++;

    // setting into Map datastructure a launch
    launches.set(
        latestFlightnumber, 
        Object.assign(launch, {
            flightNumber: latestFlightnumber,
            customers: ['NASA', 'JAXA'],
            upcoming: true,
            success: true,
    }));

}

function abortLaunchById(launchId){
    const aborted = launches.get(launchId);
    aborted.upcoming = false;
    aborted.success =  false;
    return aborted;

}


module.exports ={
    getAllLaunches,
    addNewLaunch,
    existsLaunchById,
    abortLaunchById,
}