const cloudinary = require('cloudinary').v2;
const { CLOUD_NAME, API_KEY_CLOUD, API_SECRET } = process.env;

cloudinary.config({ 
    cloud_name: CLOUD_NAME, 
    api_key: API_KEY_CLOUD, 
    api_secret: API_SECRET 
});

const postVideogameHandler = async (req, res) => {
    try {
        await postVideogame(req, res);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { postVideogameHandler };