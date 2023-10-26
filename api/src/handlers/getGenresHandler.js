const axios = require('axios');
const { Genre } = require('../db');
const { API_KEY } = process.env;

const fetchGenresFromAPI = async () => {
    try {
        const response = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
        const genres = response.data.results.map((genre) => {
            return {
                id: genre.id,
                name: genre.name,
            };
        });
        return genres;
    } catch (error) {
        throw error;
    }
};

module.exports = { fetchGenresFromAPI };