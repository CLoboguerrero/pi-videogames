const axios = require('axios');
const { Videogame, Genre, sequelize } = require('../db');
const { API_KEY } = process.env;

const postVideogame = async (req, res) => {
    const { name, description, platforms, image, released, rating, genres } = req.body;

    if (!name || !description || !platforms || !image || !released || !rating){
        return res.status(400).json({ error: 'Missing required fields!' });
    }

    //const transaction = await sequelize.transaction();

    try {
        const newGame = await Videogame.create({
            name,
            description,
            platforms,
            image,
            released,
            rating,
        });

        const addedGenres = [];

        for (const genreName of genres){
            try {
                const genre = await Genre.findByPk(genreName);
                if(genre){
                    await newGame.addGenre(genre);
                    addedGenres.push(genre.name)
                } else {
                    console.error(`Invalid Genre Name!`);
                }
            } catch (error) {
                console.error(`Error adding Genre`, error);
            };
        };

        res.status(201).json({newGame, addedGenres})
    } catch (error) {
        console.error('Error Crearing Videogame:', error);
        return res.status(500).json({ error: 'Internal Server Error' })
    }
}

module.exports = { postVideogame }