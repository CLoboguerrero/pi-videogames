import { GET_ALL_GAMES, GET_GAME, GET_GAME_DETAILS } from "./action-types";
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
            console.log(error.message);
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