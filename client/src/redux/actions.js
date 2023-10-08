import { GET_ALL_GAMES } from "./action-types";
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