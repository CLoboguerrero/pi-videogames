import './Cards.modules.css'
import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllGames, clearState } from '../../redux/actions';
import Card from '../Card/Card';

function Cards() {
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const displayGames = useSelector((state) => state.allGames);

    useEffect(() => {
        if(displayGames.length === 0) {
           dispatch(getAllGames());
        }
    },[]);

    const handleGoBack = () => {
        dispatch(clearState());
        dispatch(getAllGames());
    }
    
    const handleNextPage = () => {
        setPage(page + 1);
        dispatch(getAllGames(page + 1));
    }

    const handlePrevPage = () => {
        if (page > 1){
            setPage(page - 1);
            dispatch(getAllGames(page - 1));
        }
    }


    return (
        <div>
            <br />
            <br />
            {
            displayGames.length > 15 
            ?   <div className='pagination'>
                    <h1>Videogames List:</h1>
                    <button onClick={handlePrevPage} disabled={page === 1}>Previous</button>
                    <span>Page {page}</span>
                    <button onClick={handleNextPage} >Next</button>
                </div>
                
            : displayGames.length >= 1 && displayGames.length <= 15  
            ?   <div className='search-results'> 
                    <h1>Search Results:</h1>
                    <button onClick={handleGoBack}>Go Back to Games List</button>
                </div>
                
            : <h2>Loading Games...</h2>
            }

            <div className='cards-container'>
                {displayGames.map((game) => (
                    <Card
                        key={game.id}
                        id={game.id}
                        name={game.name}
                        image={game.image}
                        genres={game.genres} 
                    />
                ))}
            </div>
        </div>
    );
}

export default Cards;