const { Videogame, Genre } = require('../db');

const postVideogame = async (req, res) => {
    const { name, description, platforms, image, released, rating, genres } = req.body;
    const imageUrl = req.body.image;

    if (!name || !description || !platforms || !image || !released || !rating) {
        return res.status(400).json({ error: 'Missing required fields!' });
    }

    try {
        const newGame = await Videogame.create({
            name,
            description,
            platforms,
            image: imageUrl,
            released,
            rating,
        });

        const addedGenres = [];

        for (const genreName of genres) {
            try {
                const genre = await Genre.findByPk(genreName);
                if (genre) {
                    await newGame.addGenre(genre);
                    addedGenres.push(genre.name);
                } else {
                    return res.status(400).json({ error: `Invalid Genre Name: ${genreName}` });
                }
            } catch (error) {
                return res.status(500).json({ error: 'Error adding Genre' });
            }
        }

        res.status(201).json({ newGame, addedGenres });
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { postVideogame };