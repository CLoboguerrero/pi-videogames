import './Card.modules.css';
import { Link } from 'react-router-dom';

function Card ({ id, name, image, genres }) {
    return (
        <div className='card'>
            <div className='game-img-container'>
                <img className='img-card' src={image} alt='game-image' />
            </div>
            <h2 className='game-name'>{name}</h2>
            <h2 className='game-genres'><span style={{ fontWeight: 'bold' }}>Genres: </span>{genres.join(' ')}</h2>

            <div className='bottom-buttons'>
                <Link to={`/detail/${id}`} >
                    <h3 className="card-details">View Game Specs</h3>
                </Link>
            </div>
        </div>
    );
}

export default Card;