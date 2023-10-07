const { Router } = require('express');
const { getVideogames } = require('../handlers/getVideogames');


const router = Router();

router.get('/videogames', getVideogames);


module.exports = router;
