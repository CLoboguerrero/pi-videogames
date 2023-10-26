const axios = require('axios');
const { Videogame, Genre, sequelize } = require('../db');
const { Op } = require('sequelize');
const { API_KEY } = process.env;

const getVideogameByNameFromDb = async (name) => {
    const gamesInDb = await Videogame.findAll({
        where: {
            name: {
                [Op.iLike]: `%${name}%`
            }
        },
        include: {
            model: Genre,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        },
    });

    return gamesInDb.map((game) => {
        return {
            id: game.id,
            name: game.name,
            image: game.image,
            rating: game.rating,
            genres: game.Genres.map(genre => genre.name),
        };
    });
};

const getVideogameByNameFromAPI = async (name, totalGames) => {
    try {
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

        return gamesInApi;
    } catch (error) {
        throw error;
    }
};

module.exports = { getVideogameByNameFromDb, getVideogameByNameFromAPI };