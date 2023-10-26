import { GET_ALL_GAMES, GET_GAME_BY_NAME, GET_GAME_DETAILS, GET_GENRES, GET_PLATFORMS, CLEAR_FOUND_GAMES, CLEAR_DETAILS, CLEAR_ALL_GAMES, POST_GAME, FILTER_GAMES, SORT_BY_RATING, SORT_BY_NAME, FILTER_BY_GENRE } from "./action-types";
import axios from 'axios';

const endpoint = 'http://localhost:3001'

export const getAllGames = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`${endpoint}/videogames`);
            return dispatch({
                type: GET_ALL_GAMES,
                payload: data,
            });
        } catch (error) {
            alert('Error fetching all games', error);
        };
    };
};

export const getGame = (name) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`${endpoint}/videogames/name?name=${name}`);
            return dispatch({
                type: GET_GAME_BY_NAME,
                payload: data,
            });
        } catch (error) {
            alert('No games found with the specified name!');
        };
    };
};

export const getGameDetails = (id) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`${endpoint}/videogames/${id}`);
            return dispatch ({
                type: GET_GAME_DETAILS,
                payload: data
            })
        } catch (error){
            alert('An error ocurred while fetching game details', error);
        };
    };
};

export const getGenres = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`${endpoint}/genres`);
            return dispatch ({
                type: GET_GENRES,
                payload: data,
            })
        } catch (error) {
            alert('Error fetching game genres!', error);
        };
    };
};

export const getPlatforms = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`${endpoint}/platforms`);
            return dispatch ({
                type: GET_PLATFORMS,
                payload: data,
            })
        } catch (error) {
            alert('Error fetching game platforms!', error);
        };
    };
};

export const postGame = (formData) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.post(`${endpoint}/videogames`, formData);
        } catch (error) {
            alert('An error ocurred while posting a new game!', error);
        };
    };
};

export const clearFoundGames = () => {
    return {
        type: CLEAR_FOUND_GAMES,
    };   
};

export const clearDetails = () => {
    return {
        type: CLEAR_DETAILS,
    };   
};

export const clearAllGames = () => {
    return {
        type: CLEAR_ALL_GAMES,
    };   
};

export const filterOrigin = (origin) => {
    return {
        type: FILTER_GAMES,
        payload: origin
    };
};

export const filterByGenre = (genre) => {
    return {
        type: FILTER_BY_GENRE,
        payload: genre,
    }
};

export const sortGamesByRating = (sort) => {
    return {
        type: SORT_BY_RATING,
        payload: sort
    }
};

export const sortGamesByName = (sort) => {
    return {
        type: SORT_BY_NAME,
        payload: sort
    }
};
