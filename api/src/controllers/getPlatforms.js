const { fetchPlatformsFromAPI } = require('../handlers/getPlatformsHandler');

const getPlatforms = async (req, res) => {
    try {
        const platformsFromAPI = await fetchPlatformsFromAPI();
        return res.status(200).json(platformsFromAPI);
    } catch (error) {
        console.error('Error getting platforms:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { getPlatforms };