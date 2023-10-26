const axios = require('axios');
const { Videogame, Genre, sequelize } = require('../db');
const { Op } = require('sequelize');
const { API_KEY } = process.env;

const getVideogameByIdFromDb = async (id) => {
    const gameInDb = await Videogame.findOne({
        where: {
            id: { [Op.eq]: id },
        },
        include: {
            model: Genre,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        },
    });

    if (!gameInDb) {
        return null;
    }

    const genres = gameInDb.Genres.map(genre => genre.name);

    return {
        id: gameInDb.id,
        name: gameInDb.name,
        image: gameInDb.image,
        description: gameInDb.description,
        released: gameInDb.released,
        rating: gameInDb.rating,
        genres: genres,
        platforms: gameInDb.platforms,
    };
};

const getVideogameByIdFromAPI = async (id) => {
    try {
        const response = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
        const game = response.data;

        return {
            id: game.id,
            name: game.name,
            image: game.background_image,
            description: game.description,
            released: game.released,
            rating: game.rating,
            genres: game.genres ? game.genres.map(genre => genre.name) : [],
            platforms: game.platforms ? game.platforms.map(platform => platform.platform.name) : [],
        };
    } catch (error) {
        throw error;
    }
};

module.exports = { getVideogameByIdFromDb, getVideogameByIdFromAPI };