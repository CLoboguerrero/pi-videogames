const { getVideogameByNameFromDb, getVideogameByNameFromAPI } = require('../handlers/getVideogameByNameHandler');

const getVideogameByName = async (req, res) => {
    const { name } = req.query;
    let totalGames = 15;
    let gamesInDbModified = [];

    try {
        gamesInDbModified = await getVideogameByNameFromDb(name);
        totalGames -= gamesInDbModified.length;

        if (totalGames > 0) {
            const gamesInApi = await getVideogameByNameFromAPI(name, totalGames);
            const videogameResults = [...gamesInDbModified, ...gamesInApi];

            if (videogameResults.length === 0) {
                return res.status(404).json({ error: 'No games found with the specified name.' });
            }

            return res.status(200).json(videogameResults);
        } else {
            return res.status(200).json(gamesInDbModified);
        }
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { getVideogameByName };