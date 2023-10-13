import './Cards.modules.css'
import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllGames, clearState } from '../../redux/actions';
import Card from '../Card/Card';
import Pagination from '../Pagination/Pagination';
import Loading from '../Loading/Loading';
import BackgroundMain from '../Backgrounds/BackgroundMain';


function Cards() {
    const dispatch = useDispatch();
    const displayGames = useSelector((state) => state.allGames);
    const displaySearchGames = useSelector((state) => state.foundGames);
    
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(displayGames.length / 15)
    const startIndex = (currentPage - 1) * 15;
    const endIndex = startIndex + 15;
    const gamesPaginated = displayGames.slice(startIndex, endIndex)
    
    let stateToShow = gamesPaginated;

    if (displaySearchGames.length > 0) stateToShow = displaySearchGames;
    else stateToShow = gamesPaginated;


    useEffect(() => {
        if(displayGames.length === 0) {
           dispatch(getAllGames());
        }
    },[]);

    const handleGoBack = () => {
        dispatch(clearState());
        setCurrentPage(1);
    }
    
    const onPageChange = (newPage) => {
        setCurrentPage(newPage)
    }

    return (
        <div>
            <br />
            <br />
            {
            displayGames.length > 15 && displaySearchGames.length === 0 
            ?   <div className='all-games'>
                    <h1>Videogames List:</h1>
                    <Pagination 
                        currentPage={currentPage} 
                        totalPages={totalPages} 
                        onPageChange={onPageChange} 
                    />
                </div>
                
                : displaySearchGames.length > 0 && displaySearchGames.length <= 15
                ?   <div className='search-results'> 
                    <h1>Search Results:</h1>
                    <button onClick={handleGoBack}>Go Back to Games List</button>
                </div>
            
            : <Loading />
        }       

            <div className='cards-container'>
                {stateToShow.map((game) => (
                    <Card
                    key={game.id}
                    id={game.id}
                    name={game.name}
                    image={game.image}
                    genres={game.genres} 
                    />
                    ))}
            </div>
            <BackgroundMain/>
        </div>
    );
}

export default Cards;