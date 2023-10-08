const axios = require('axios');
const { Videogame } = require('../db');
const { Op } = require('sequelize');
const { API_KEY } = process.env;

const getVideogameByName = async (req, res) => {
    const { name } = req.query;
    try {
        const gamesInDb = await Videogame.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${name}%`
                }
            }
        });

        const response = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&search=${name}`);

        const gamesInApi = response.data.results.map((game) => {
            return {
                id: game.id,
                name: game.name,
                background_image: game.background_image,
                released: game.released,
                rating: game.rating,
                genres: game.genres ? game.genres.map(genre => genre.name) : [],
                platforms: game.platforms ? game.platforms.map(platform => platform.platform.name) : [],
            };
        });

        const videogameResults = [...gamesInDb, ...gamesInApi];
        return res.status(200).json(videogameResults);
        
    } catch (error) {
        console.error('Error Fetching Data:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { getVideogameByName }