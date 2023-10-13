import { GET_ALL_GAMES, GET_GAME, GET_GAME_DETAILS, GET_GENRES, GET_PLATFORMS, CLEAR_STATE, CLEAR_DETAILS } from "./action-types";

const initialState = {
    allGames: [],
    foundGames: [],
    gameDetails: [],
    getGenres: [],
    getPlatforms: [],
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
        
        case GET_GENRES:
            return{
                ...state,
                getGenres: action.payload,
            }

        case GET_PLATFORMS:
            return{
                ...state,
                getPlatforms: action.payload,
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