import './Cards.modules.css'
import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllGames } from '../../redux/actions';
import Card from '../Card/Card';

function Cards() {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const displayGames = useSelector((state) => state.allGames);

    useEffect(() => {
        if(displayGames.length === 0) {
            dispatch(getAllGames(currentPage));
        }
    }, []);

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    }

    const handlePrevPage = () => {
        if (currentPage > 1){
            setCurrentPage(currentPage - 1);
        }
    }

    return (
        <div>
            <br />
            <br />
            <h1>Videogames List:</h1>

            <div className='pagination'>
                <button onClick={handlePrevPage}>Previous</button>
                <span>Page {currentPage}</span>
                <button onClick={handleNextPage}>Next</button>
            </div>

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