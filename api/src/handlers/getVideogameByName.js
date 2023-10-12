const axios = require('axios');
const { Videogame } = require('../db');
const { Op } = require('sequelize');
const { API_KEY } = process.env;

const getVideogameByName = async (req, res) => {
    const { name } = req.query;

    try {
        const gamesInDb = await Videogame.findAll({
            where: {
                gameName: {
                    [Op.iLike]: `%${name}%`
                }
            }
        });

        const gamesInDbModified = gamesInDb.map((game) => {
            return {
                id: game.id,
                name: game.name,
                image: game.image,
                genres: game.Genres.map(genre => genre.name),
            };
        });
        

        const response = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&search=${name}&page_size=15`);

        const gamesInApi = response.data.results.map((game) => {
            return {
                id: game.id,
                name: game.name,
                image: game.background_image,
                genres: game.genres ? game.genres.map(genre => genre.name) : [],
            };
        });


        const videogameResults = [...gamesInDbModified, ...gamesInApi];

        if (videogameResults.length === 0) {
            return res.status(404).json({ error: 'No games found with the specified name.' });
        }
        
        return res.status(200).json(videogameResults);     
    } catch (error) {
        console.error('Error Fetching Data:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { getVideogameByName }