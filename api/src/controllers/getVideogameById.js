const axios = require('axios');
const { sequelize } = require('../db');
const { Videogame, Genre } = require('../db');
const { API_KEY } = process.env;
const { Op } = require('sequelize');


const getVideogameById = async (req, res) => {
    const { id } = req.params;

    let idType = 'number';
    if(isNaN(id)) {
        idType = 'uuid';
    }

    try {
        if (idType === 'uuid') {
     
            const gameInDb = await Videogame.findOne({
                where: {
                    id: {[Op.eq]: id},
                },
                include: {
                    model: Genre,
                    attributes: ['name'],
                    through: {
                        attributes: [],
                    },
                },
            });

            const genres = gameInDb.Genres.map(genre => genre.name);

            const gameData = {
                id: gameInDb.id,
                name: gameInDb.name,
                image: gameInDb.image,
                description: gameInDb.description,
                released: gameInDb.released,
                rating: gameInDb.rating,
                genres: genres,
                platforms: gameInDb.platforms,
            };

            return res.status(200).json(gameData);
        } else {
            const response = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
            const game = response.data;
       
            const gameInApi = {
                id: game.id,
                name: game.name,
                image: game.background_image,
                description: game.description,
                released: game.released,
                rating: game.rating,
                genres: game.genres ? game.genres.map(genre => genre.name) : [],
                platforms: game.platforms ? game.platforms.map(platform => platform.platform.name) : [],
            };
            return res.status(200).json(gameInApi);
        }
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server error' });
    }

}

module.exports = { getVideogameById }