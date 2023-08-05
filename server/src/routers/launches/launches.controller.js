const launchesModel  = require('../../models/launches.model');

/*CRUD FUNCTIONS*/ 

function getAllLaunches(req, res) {
  return res.status(200).json(launchesModel.getAllLaunches());
}

function addNewLaunch(req, res){
  // request body to launch object
  const launch = req.body;
 if(!launch.mission || !launch.rocket || !launch.launchDate || !launch.target) {

  // return 400 bad request
   return res.status(400).json({
    error: 'Missing required launch property'
   });
 }


  // LauchDate string to date object
  launch.launchDate = new Date(launch.launchDate);


  if(isNaN(launch.launchDate)) {
    return res.status(400).json({
      error: 'Invalid launch date'
    })
  }

  launchesModel.addNewLaunch(launch)
  return res.status(201).json(launch);
}

function abortLaunch(req, res){
  const launchId = +req.params.id;

  //if launch does NOT exist
  if(!launchesModel.existsLaunchById(launchId)){
    return res.status(400).json({
      error: 'Launch nont found'
    });
  }
  
  //if launch does exist
  const aborted = launchesModel.abortLaunchById(launchId);
  return res.status(200).json(aborted)

}


/*MODULE EXPORTS*/

module.exports = {
    getAllLaunches,
    addNewLaunch,
    abortLaunch,
}
