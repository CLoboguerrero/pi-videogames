import { GET_ALL_GAMES, GET_GAME_BY_NAME, GET_GAME_DETAILS, GET_GENRES, GET_PLATFORMS, CLEAR_STATE, CLEAR_DETAILS, CLEAR_ALL_GAMES, FILTER_GAMES, SORT_BY_RATING, SORT_BY_NAME } from "./action-types";

const initialState = {
    allGames: [],
    foundGames: [],
    gameDetails: [],
    getGenres: [],
    getPlatforms: [],
    filterGames: [],
    sortGames: [],
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case GET_ALL_GAMES:
            return{
                ...state,
                allGames: action.payload,
                filterGames: action.payload,
                // filterGames: state.foundGames.length === 0 
                // ? action.payload 
                // : state.filterGames,
            }

        case GET_GAME_BY_NAME:
            return{
                ...state,
                foundGames: action.payload,
                filterGames: action.payload,
                // filterGames: action.payload.length > 0 
                // ? action.payload 
                // : state.allGames,
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
                filterGames: state.allGames,
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


        case SORT_BY_RATING:
            const allGamesCopy = [...state.allGames];
            
            return{
                ...state,
                filterGames:
                    action.payload === 'A'
                    ? allGamesCopy.sort((a, b) => a.rating - b.rating)
                    : allGamesCopy.sort((a, b) => b.rating - a.rating)
            }

        case SORT_BY_NAME:
            const gamesByNameCopy = [...state.filterGames];
            return {
                ...state,
                filterGames: gamesByNameCopy.sort((a, b) => {
                    const nameA = String(a.name).toUpperCase();
                    const nameB = String(b.name).toUpperCase();

                    if (nameA < nameB) {
                        return action.payload === 'A' ? -1 : 1;
                    }
                    if (nameA > nameB) {
                        return action.payload === 'A' ? 1 : -1;
                    }
                    return 0;
                }),
            };

        default:
            return {...state}
    };
}

export default reducer;