import './Detail.modules.css';
import React from 'react';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getGameDetails, clearDetails } from '../../redux/actions';
import Loading from '../Loading/Loading';
import Genres from '../Genres/Genres';

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
        dispatch(clearDetails());
        navigate(-1);
    }

    return (
        <div>
            {
             loading 
             ? <Loading />
             
             : <div>
                <img className='detail-img' src={image} alt="videogame-image" />
                <h1><span style={{ fontWeight: 'bold' }}></span>{name}</h1>
                <h2><span style={{ fontWeight: 'bold' }}>Available on: </span>{platforms && platforms.length > 0 ? platforms.join(' || ') : 'N/A'}</h2>
                <div 
                className='detail-description' dangerouslySetInnerHTML={{ __html: description }}>
                </div>
                <h2><span style={{ fontWeight: 'bold' }}>Released: </span>{released}</h2>
                <h2><span style={{ fontWeight: 'bold' }}>Rating: </span>{rating}</h2>
                <Genres />
                <button onClick={handleBack}>Go back</button> 
             </div>
            }
        </div>
    );
}

export default Detail;