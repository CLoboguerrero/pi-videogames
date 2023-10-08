const { Router } = require('express');
const { getAllVideogames } = require('../handlers/getAllVideogames');
const { getVideogameByName } = require('../handlers/getVideogameByName');
const { getVideogameById } = require('../handlers/getVideogameById');
const { getGenres } = require('../handlers/getGenres');
const { postVideogame } = require('../handlers/postVideogame');


const router = Router();

router.get('/videogames', getAllVideogames);

router.get('/videogames/name', getVideogameByName);

router.get('/videogames/:id', getVideogameById);

router.get('/genres', getGenres);

router.post('/videogames', postVideogame);


module.exports = router;
