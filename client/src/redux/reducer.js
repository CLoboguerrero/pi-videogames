import { GET_ALL_GAMES, GET_GAME_BY_NAME, GET_GAME_DETAILS, GET_GENRES, GET_PLATFORMS, CLEAR_STATE, CLEAR_DETAILS, CLEAR_ALL_GAMES, FILTER_GAMES, SORT_GAMES } from "./action-types";

const initialState = {
    allGames: [],
    foundGames: [],
    gameDetails: [],
    getGenres: [],
    getPlatforms: [],
    filterGames: [],
    sotGames: [],
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case GET_ALL_GAMES:
            return{
                ...state,
                allGames: action.payload,
                filterGames: action.payload,
            }

        case GET_GAME_BY_NAME:
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

        case CLEAR_ALL_GAMES:
            return {
                ...state,
                allGames: [],
            }
            
        case FILTER_GAMES:
            if (action.payload === 'gamesInDb') {
                const gamesStoredInDb = state.allGames.filter((game) => isNaN(game.id));
                return {
                    ...state,
                    filterGames: gamesStoredInDb,
                };
            } else if (action.payload === 'gamesInApi') {
                const gamesFromApi = state.allGames.filter((game) => !isNaN(game.id));
                return {
                    ...state,
                    filterGames: gamesFromApi,
                };
            } else if (action.payload === 'showAll') {
                return {
                    ...state,
                    filterGames: state.allGames,
                };
            }
            return state;


        case SORT_GAMES:
            return{

            }

        default:
            return {...state}
    };
}

export default reducer;