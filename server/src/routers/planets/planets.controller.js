const {loadPlanetsData} = require('../../models/planets.model')


async function getAllPlanets(req,res) {
    try {
        const planets = await loadPlanetsData();
        return res.status(200).json(planets);
      } catch (error) {
        return res.status(500).json({ error: 'Error fetching planets data' });
      }
   // return res.status(200).json(loadPlanetsData);
}

module.exports = {
    getAllPlanets,
};