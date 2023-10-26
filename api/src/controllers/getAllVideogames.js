const axios = require('axios');
const { Videogame, Genre } = require('../db');
const { API_KEY } = process.env;

const getAllVideogames = async (req, res) => {
    let allGames = [];

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

        const gamesInDbModified = gamesInDb.map((game) => {
            return {
                id: game.id,
                name: game.name,
                image: game.image,
                rating: game.rating,
                genres: game.Genres.map(genre => genre.name),
            };
        });
        
        for (let i = 1; i <= 4; i++){

            const response = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}&page_size=25`)
    
            const gamesInApi = response.data.results.map((game) => {
                return {
                    id: game.id,
                    name: game.name,
                    image: game.background_image,
                    rating: game.rating,
                    genres: game.genres.map(genre => genre.name),
                };
            });
            allGames = [...allGames, ...gamesInApi];
        }

        allGames = [...gamesInDbModified, ...allGames]

        return res.status(200).json(allGames);
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { getAllVideogames };