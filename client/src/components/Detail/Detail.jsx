import './Detail.modules.css';
import React from 'react';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getGameDetails, clearDetails } from '../../redux/actions';
import Loading from '../Loading/Loading';
import Genres from '../Genres/Genres';
import BackgroundMain from '../Backgrounds/BackgroundMain';

function Detail () {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const gameData = useSelector((state) => state.gameDetails);
    const { name, image, platforms, description, released, rating } = gameData;

    const fetchData = async () => {
        try {
            setLoading(true);
            await dispatch(getGameDetails(id));
            setLoading(false);
        } catch (error) {
            alert('Error fetching game details:', error);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    },[]);

    const handleBack = () => {
        dispatch(clearDetails());
        navigate(-1);
    }

    return (
        <div>
            {
             gameData.length === 0
             ? <Loading />
             
             : <div className='details-container'>

                <div className='top-content'>
                    <div className='game-image-container'> 
                        <img className='detail-img' src={image} alt="videogame-image" />
                    </div>

                    <h1><span style={{ fontWeight: 'bold' }}></span>{name}</h1>
                </div>


                <div className='game-bottom-container'>
                    <div className='text-details-container'>
                        <h2><span style={{ fontWeight: 'bold' }}></span>Game Description:</h2>
                        <div 
                        className='detail-description' dangerouslySetInnerHTML={{ __html: description }}>
                        </div>
                    </div>

                    <div className='game-specs-container'>

                        <h2>Genres: </h2>
                        <Genres />

                        <h2>Available on: </h2>
                        <span>{platforms && platforms.length > 0 ? platforms.join(' || ') : 'N/A'}</span>

                        <div className='last-details'>
                            <div className='released-container'>
                                <h2>Released:</h2>
                                <span>{released}</span>
                            </div>

                            <div className='rating-container'>
                                <h2>Rating: </h2>
                                <span className='detail-rating'>{rating}⭐️</span>
                            </div>
                        </div>

                    </div>
                </div>
                
                <div className='back-button-container'>
                    <h3 className='detail-back-button'onClick={handleBack}>Go back to games</h3>
                </div>

             </div>
            }
            <BackgroundMain />
        </div>
    );
}

export default Detail;