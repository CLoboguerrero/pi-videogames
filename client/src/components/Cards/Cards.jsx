import './Cards.modules.css'
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllGames } from '../../redux/actions';
import Card from '../Card/Card';

function Cards() {
    const dispatch = useDispatch();
    const displayGames = useSelector((state) => state.allGames);

    useEffect(() => {
        dispatch(getAllGames());
    }, [dispatch]);

    return (
        <div>
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