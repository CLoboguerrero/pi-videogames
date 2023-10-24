import './Card.modules.css';
import { Link } from 'react-router-dom';
import Genres from '../Genres/Genres';

function Card ({ id, name, image, rating }) {

    return (
        <div className='card'>
            <div className='game-img-container'>
                <img className='img-card' src={image} alt='game-image' />
                <h3 className='game-rating'><span>{rating}</span>⭐️</h3>
            </div>

            <h2 className='game-name'>{name}</h2>

            <Genres isHomeRoute={true}/>
            
            <div className='bottom-buttons'>
                <Link to={`/detail/${id}`} >
                    <h3 className="card-details">View Game Specs</h3>
                </Link>
            </div>
        </div>
    );
}

export default Card;