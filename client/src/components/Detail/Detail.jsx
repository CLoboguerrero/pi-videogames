import './Detail.modules.css';
import React from 'react';
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getGameDetails } from '../../redux/actions';

function Detail () {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const gameData = useSelector((state) => state.gameDetails);
    const { name, image, platforms, description, released, rating, genres } = gameData;

    useEffect(() => {
        console.log(gameData);
        dispatch(getGameDetails(id));
    },[]);

    const handleBack = () => {
        navigate(-1);
    }

    return (
        <div>
            <img className='img-card' src={image} alt="videogame-image" />
            <h2><span style={{ fontWeight: 'bold' }}>Name: </span>{name}</h2>
            <h2><span style={{ fontWeight: 'bold' }}>Platforms: </span>{platforms}</h2>
            <h2><span style={{ fontWeight: 'bold' }}>Description: </span>{description}</h2>
            <h2><span style={{ fontWeight: 'bold' }}>Release Date: </span>{released}</h2>
            <h2><span style={{ fontWeight: 'bold' }}>Rating: </span>{rating}</h2>
            <h2><span style={{ fontWeight: 'bold' }}>Genres: </span>{genres}</h2>

            <button onClick={handleBack}>Go back</button> 
        </div>
    );
}

export default Detail;