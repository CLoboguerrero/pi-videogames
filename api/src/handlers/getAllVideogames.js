const axios = require('axios');
const { Videogame, Genre } = require('../db');
const { API_KEY } = process.env;

const getAllVideogames = async (req, res) => {

    try {
        const gamesInDb = await Videogame.findAll({

            include: {
                model: Genre,
                attributes: ['name'],
                through: {
                    attributes: [],
                }
            }
        });

        const response = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=1&page_size=15`)

        const gamesInApi = response.data.results.map((game) => {
            return {
                id: game.id,
                name: game.name,
                image: game.background_image,
                //released: game.released,
                //rating: game.rating,
                genres: game.genres.map(genre => genre.name),
                //platforms: game.platforms.map(platform => platform.platform.name),
            };
        });

        const totalGamesToFetch = 15;
        const gamesInDbCount = gamesInDb.length;
        const gamesToFetchFromApi = Math.max(0, totalGamesToFetch - gamesInDbCount);

        const additionalApiGames = gamesInApi.slice(0, gamesToFetchFromApi);

        const gamesInDbModified = gamesInDb.map((game) => {
            return {
                id: game.id,
                name: game.name,
                image: game.image,
                genres: game.Genres.map(genre => genre.name),
            };
        });
        
        const videogameResults = [...gamesInDbModified, ...additionalApiGames];

        return res.status(200).json(videogameResults);
    } catch (error) {
        console.error('Error Fetching Data:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { getAllVideogames };