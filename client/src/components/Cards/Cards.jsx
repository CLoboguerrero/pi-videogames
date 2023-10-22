import './Cards.modules.css'
import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllGames, getGenres, clearFoundGames } from '../../redux/actions';
import Card from '../Card/Card';
import Pagination from '../Pagination/Pagination';
import Filters from '../Filters/Filters';
import Loading from '../Loading/Loading';
import BackgroundMain from '../Backgrounds/BackgroundMain';


function Cards() {
    const dispatch = useDispatch();
    const allGames = useSelector((state) => state.allGames);
    const displayGames = useSelector((state) => state.filterGames);
    const displaySearchGames = useSelector((state) => state.foundGames);
    const genresList = useSelector((state) => state.getGenres);

    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(displayGames.length / 15)
    const startIndex = (currentPage - 1) * 15;
    const endIndex = startIndex + 15;
    const gamesPaginated = displayGames.slice(startIndex, endIndex)
    
    // let stateToShow = gamesPaginated;

    // if (displaySearchGames.length > 0) stateToShow = displaySearchGames;
    // else stateToShow = gamesPaginated;

    useEffect(() => {
        if(allGames.length === 0) {
            dispatch(getAllGames());
        }
        if(genresList.length === 0) {
            dispatch(getGenres());
        }
    },[dispatch]);

    const handleGoBack = () => {
        dispatch(clearFoundGames());
        setCurrentPage(1);
    }
    
    const onPageChange = (newPage) => {
        setCurrentPage(newPage)
    }

    return (
        <div className='home'>
            <br />
            <br />
            {
            displaySearchGames.length === 0 && allGames.length != 0
            ?   <div className='all-games'>
                    <h1>Videogames List:</h1>
                    <Filters />
                    <Pagination 
                        currentPage={currentPage} 
                        totalPages={totalPages} 
                        onPageChange={onPageChange} 
                    />
                </div>
                
            : displaySearchGames.length > 0 && displaySearchGames.length <= 15
            ?   <div className='search-results'> 
                    <h1>Search Results:</h1>
                    <Filters />
                    <button id='pagination-buttons' onClick={handleGoBack}>Go Back to Games List</button>
                </div>
            
            : <Loading />
        }

        {
            displayGames.length === 0
            ? <div>
                <h2>There are no games with the filter criteria!</h2>
            </div>
            : null
        }       

            <div className='cards-container'>
                {gamesPaginated.map((game) => (
                    <Card
                    key={game.id}
                    id={game.id}
                    name={game.name}
                    image={game.image}
                    rating={game.rating}
                    genres={game.genres} 
                    />
                    ))}
            </div>
            <BackgroundMain />
        </div>
    );
}

export default Cards;