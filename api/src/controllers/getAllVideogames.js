const { getAllVideogamesHandler } = require('../handlers/getAllVideogamesHandler');

const getAllVideogames = async (req, res) => {
    try {
        const response = await getAllVideogamesHandler();
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { getAllVideogames };