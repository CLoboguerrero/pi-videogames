const axios = require('axios');
const { API_KEY } = process.env;

const fetchPlatformsFromAPI = async () => {
    try {
        const response = await axios.get(`https://api.rawg.io/api/platforms?key=${API_KEY}`);
        const platforms = response.data.results.map((platform) => {
            return platform.id, platform.name;
        });
        return platforms;
    } catch (error) {
        throw error;
    }
};

module.exports = { fetchPlatformsFromAPI };