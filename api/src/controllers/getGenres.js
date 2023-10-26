const { fetchGenresFromAPI } = require('../handlers/getGenresHandler');
const { Genre } = require('../db');

const getGenres = async (req, res) => {
    try {
        const genresFromAPI = await fetchGenresFromAPI();
        await Genre.bulkCreate(genresFromAPI, { ignoreDuplicates: true });

        const responseGenres = genresFromAPI.map((genre) => genre.name);
        return res.status(200).json(responseGenres);
    } catch (error) {
        console.error('Error getting genres:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { getGenres };