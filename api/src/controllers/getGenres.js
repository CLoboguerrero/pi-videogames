const axios = require('axios');
const { Genre } = require('../db');
const { API_KEY } = process.env;

const getGenres = async (req, res) => {
    try {
        const response =  await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)

        const genres = response.data.results.map((genre) => {
            return {
                id: genre.id,
                name: genre.name
            };
        });

        await Genre.bulkCreate(genres, { ignoreDuplicates: true });

        const responseGenres = genres.map(genre => genre.name)

        return res.status(200).json(responseGenres);
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' })
    }
}

module.exports = { getGenres }