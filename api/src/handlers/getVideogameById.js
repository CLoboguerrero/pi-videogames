const axios = require('axios');
const { sequelize } = require('../db');
const { Videogame, Genre } = require('../db');
const { API_KEY } = process.env;
const { Op } = require('sequelize');

const isUUID = (id) => {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(id);
};

const getVideogameById = async (req, res) => {
    const { id } = req.params;

    try {
        if (isUUID(id)) {
     
            const gameInDb = await Videogame.findOne({
                where: {
                    id: {[Op.eq]: id},
                },
                include: {
                    model: Genre,
                    attributes: ['id', 'name'],
                    through: {
                        attributes: [],
                    },
                },
            });

            return res.status(200).json(gameInDb)
        } else {
            // If the id is not a UUID or is a numeric value, search in the API
            const response = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
            const game = response.data;
       
            const gameInApi = {
                id: game.id,
                name: game.name,
                background_image: game.background_image,
                description: game.description,
                released: game.released,
                rating: game.rating,
                genres: game.genres ? game.genres.map(genre => genre.name) : [],
                platforms: game.platforms ? game.platforms.map(platform => platform.platform.name) : [],
            };
            return res.status(200).json(gameInApi);
        }
    } catch (error) {
        console.error('Error fetching Data:', error);
        return res.status(500).json({ error: 'Internal Server error' });
    }

}

module.exports = { getVideogameById }






// const axios = require('axios');
// const { sequelize } = require('../db');
// const { Videogame, Genre } = require('../db');
// const { API_KEY } = process.env;


// const getVideogameById = async (req, res) => {
//     const { id } = req.params;

//     try {
//         const gameInDb = await Videogame.findOne({
//             where: {
//                 id: id,
//             },
//             include: {
//                 model: Genre,
//                 attributes: ['id', 'name'],
//                 through: {
//                     attributes: [],
//                 }
//             }
//         });

//         if (gameInDb){
//             return res.status(200).json(gameInDb);
//         } else {
//             const response = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
//             const game = response.data;

//             const gameInApi = {
//                 id: game.id,
//                 name: game.name,
//                 background_image: game.background_image,
//                 description: game.description,
//                 released: game.released,
//                 rating: game.rating,
//                 genres: game.genres.map(genre => genre.name),
//                 platforms: game.platforms.map(platform => platform.platform.name),
            
//             };
//             return res.status(200).json(gameInApi);
//         };
//     } catch (error) {
//         console.error('Error fetching Data:', error);
//         return res.status(500).json({ error: 'Internal Server error' });
//     }
// }

// module.exports = { getVideogameById }