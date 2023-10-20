const { Router } = require('express');
const { getAllVideogames } = require('../controllers/getAllVideogames');
const { getVideogameByName } = require('../controllers/getVideogameByName');
const { getVideogameById } = require('../controllers/getVideogameById');
const { getGenres } = require('../controllers/getGenres');
const { getPlatforms } = require('../controllers/getPlatforms');
const { postVideogame } = require('../controllers/postVideogame');


const router = Router();

router.get('/videogames', getAllVideogames);

router.get('/videogames/name', getVideogameByName);

router.get('/videogames/:id', getVideogameById);

router.get('/genres', getGenres);

router.get('/platforms', getPlatforms);

router.post('/videogames', postVideogame);


module.exports = router;
