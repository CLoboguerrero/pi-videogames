const axios = require('axios');
const { Videogame, Genre } = require('../db');
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
            },
            include : {
                model: Genre,
                attributes: ['name'],
                through: {
                    attributes: [],
                },
            },
        });

        const gamesInDbModified = gamesInDb.map((game) => {
            return {
                id: game.id,
                name: game.name,
                image: game.image,
                rating: game.rating,
                genres: game.Genres.map(genre => genre.name),
            };
        });
        
    
        let totalGames = 15 - gamesInDbModified.length;

        const response = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&search=${name}&page_size=${totalGames}`);

        const gamesInApi = response.data.results.map((game) => {
            return {
                id: game.id,
                name: game.name,
                image: game.background_image,
                rating: game.rating,
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