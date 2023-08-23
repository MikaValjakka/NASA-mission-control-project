const launchesModel  = require('../../models/launches.model');
const { getPagination} = require('../../services/query')
/*CRUD FUNCTIONS*/ 

//---------- READ -----------
async function getAllLaunches(req, res) {
  const {skip, limit} = getPagination(req.query);
  return res.status(200).json(await launchesModel.getAllLaunches(skip, limit));
}




// -------- CREATE ---------
async function addNewLaunch(req, res){
  // request body to launch object
  console.log('Received request to add new launch:', req.body);
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

  console.log('New launch to be added:', launch);
  await launchesModel.scheduleNewLaunch(launch)
  return res.status(201).json(launch);
}




// -------- DELETE --------
async function abortLaunch(req, res){
  // changing id to number
  const launchId = +req.params.id;

  const existsLaunch = await launchesModel.existsLaunchById(launchId);

  //if launch does NOT exist
  if(!existsLaunch){
    return res.status(400).json({
      error: 'Launch nont found'
    });
  }
  
  //if launch does exist
  const aborted = await launchesModel.abortLaunchById(launchId);
  if(!aborted) {
    return res.status(400).json({
      error:'Launch not aborted'
    })
  }
  return res.status(200).json({
    ok: true
  });
}


/*MODULE EXPORTS*/

module.exports = {
    getAllLaunches,
    addNewLaunch,
    abortLaunch,
}
