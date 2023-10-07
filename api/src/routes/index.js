const { Router } = require('express');
const { getAllVideogames } = require('../handlers/getAllVideogames');


const router = Router();

router.get('/videogames', getAllVideogames);


module.exports = router;
