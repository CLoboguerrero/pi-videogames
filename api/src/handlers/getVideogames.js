const axios = require('axios');
const { Videogame } = require('../db');
const { API_KEY } = process.env

const getVideogames = async (req, res) => {
    try {
        const response = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`)

        const games = response.data.results.map((game) => {
            const {
                id,
                name,
                background_image,
                genres,
                released,
                rating,
                platforms,
            } = game;

            const genreNames = genres.map((genre) => genre.name);
            const platformNames = platforms.map((platform) => platform.platform.name);

            return {
                id,
                name,
                background_image,
                genres: genreNames,
                released,
                rating,
                platforms: platformNames,
            };
        });
        
        return res.status(200).json(games);
    } catch (error) {
        console.error('Error Fetching Data:', error)
    }
}

module.exports = { getVideogames };