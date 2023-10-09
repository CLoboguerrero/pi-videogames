const axios = require('axios');
const { Videogame, Genre } = require('../db');
const { API_KEY } = process.env;

const getAllVideogames = async (req, res) => {
    const { page } = req.query;
    const gamesPerPage = 15;

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

        const response = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${page}&page_size=${gamesPerPage}`)

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


        const gamesInDbModified = gamesInDb.map((game) => {
            return {
                id: game.id,
                name: game.name,
                image: game.image,
                genres: game.Genres.map(genre => genre.name),
            };
        });
        
        const allGames = [...gamesInDbModified, ...gamesInApi];

        const startIndex = (page - 1) * gamesPerPage;
        const endIndex = page * gamesPerPage;
        const paginatedGames = allGames.slice(startIndex, endIndex);
        // console.log('startIndex:', startIndex);
        // console.log('endIndex:', endIndex);
        // console.log('allGames:', allGames);
        // console.log('paginatedGmes:', paginatedGames);

        return res.status(200).json(allGames);
    } catch (error) {
        console.error('Error Fetching Data:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { getAllVideogames };