import { GET_ALL_GAMES, GET_GAME_BY_NAME, GET_GAME_DETAILS, GET_GENRES, GET_PLATFORMS, CLEAR_STATE, CLEAR_DETAILS, CLEAR_ALL_GAMES, POST_GAME, FILTER_GAMES, SORT_BY_RATING, SORT_BY_NAME, FILTER_BY_GENRE } from "./action-types";
import axios from 'axios';

const endpoint = 'http://localhost:3001'

export const getAllGames = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`${endpoint}/videogames`);
            console.log(data);
            return dispatch({
                type: GET_ALL_GAMES,
                payload: data,
            });
        } catch (error) {
            console.log(error.message);
        };
    };
};

export const getGame = (name) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`${endpoint}/videogames/name?name=${name}`);
            console.log(data);
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
            console.log(data);
            return dispatch ({
                type: GET_GAME_DETAILS,
                payload: data
            })
        } catch (error){
        };
    };
};

export const getGenres = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`${endpoint}/genres`);
            console.log(data);
            return dispatch ({
                type: GET_GENRES,
                payload: data,
            })
        } catch (error) {
        };
    };
};

export const getPlatforms = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`${endpoint}/platforms`);
            console.log(data);
            return dispatch ({
                type: GET_PLATFORMS,
                payload: data,
            })
        } catch (error) {
        };
    };
};

export const postGame = (formData) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.post(`${endpoint}/videogames`, formData);
        } catch (error) {
            console.log(error.message);
        };
    };
};

export const clearState = () => {
    return {
        type: CLEAR_STATE,
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
