const { getVideogameByIdFromDb, getVideogameByIdFromAPI } = require('../handlers/getVideogameByIdHandler');

const getVideogameById = async (req, res) => {
    const { id } = req.params;

    let idType = 'number';
    if (isNaN(id)) {
        idType = 'uuid';
    }

    try {
        let gameData;
        if (idType === 'uuid') {
            gameData = await getVideogameByIdFromDb(id);
        } else {
            gameData = await getVideogameByIdFromAPI(id);
        }

        if (gameData) {
            return res.status(200).json(gameData);
        } else {
            return res.status(404).json({ error: 'Videogame not found' });
        }
    } catch (error) {
        console.error('Error retrieving videogame:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { getVideogameById };