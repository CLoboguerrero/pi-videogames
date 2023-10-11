import './Detail.modules.css';
import React from 'react';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getGameDetails, clearDetails } from '../../redux/actions';

function Detail () {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const gameData = useSelector((state) => state.gameDetails);
    const { name, image, platforms, description, released, rating, genres } = gameData;

    const fetchData = async () => {
        try {
            setLoading(true);
            await dispatch(getGameDetails(id));
            setLoading(false);
        } catch (error) {
            console.error('Error fetching game details:', error);
            setLoading(false);
        }
    }

    useEffect(() => {
        console.log(gameData);
        fetchData();
    },[]);

    const handleBack = () => {
        navigate(-1);
        dispatch(clearDetails());
    }

    return (
        <div>
            {
             loading 
             ? <h2>Loading Game Info...</h2>
             
             : <div>
                 <img className='img-card' src={image} alt="videogame-image" />
                 <h2><span style={{ fontWeight: 'bold' }}>Name: </span>{name}</h2>
                 <h2><span style={{ fontWeight: 'bold' }}>Platforms: </span>{platforms}</h2>
                 <h2><span style={{ fontWeight: 'bold' }}>Description: </span>{description}</h2>
                 <h2><span style={{ fontWeight: 'bold' }}>Release Date: </span>{released}</h2>
                 <h2><span style={{ fontWeight: 'bold' }}>Rating: </span>{rating}</h2>
                 <h2><span style={{ fontWeight: 'bold' }}>Genres: </span>{genres}</h2>
     
                 <button onClick={handleBack}>Go back</button> 
             </div>
            }
        </div>
    );
}

export default Detail;