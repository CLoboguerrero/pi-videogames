import { GET_ALL_GAMES, GET_GAME, GET_GAME_DETAILS, CLEAR_STATE, CLEAR_DETAILS, POST_GAME } from "./action-types";
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
                type: GET_GAME,
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

export const postGame = (formData) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.post(`${endpoint}/videogames`, formData);
        } catch (error) {
            console.log(error);
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

