import { GET_ALL_GAMES, GET_GAME, GET_GAME_DETAILS, CLEAR_STATE, CLEAR_DETAILS } from "./action-types";

const initialState = {
    allGames: [],
    foundGames: [],
    gameDetails: [],
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case GET_ALL_GAMES:
            return{
                ...state,
                allGames: action.payload,
            }

        case GET_GAME:
            return{
                ...state,
                foundGames: action.payload,
            }

        case GET_GAME_DETAILS:
            return{
                ...state,
                gameDetails: action.payload,
            }
        
        case CLEAR_STATE:
            return{
                ...state,
                foundGames: [],
            }

        case CLEAR_DETAILS:
            return {
                ...state,
                gameDetails: [],
            }
            
        default:
            return {...state}
    };
}

export default reducer;