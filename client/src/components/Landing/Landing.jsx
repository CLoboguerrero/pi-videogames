import './Landing.modules.css'
import BackgroundLanding from '../Backgrounds/BackgroundLanding';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getGenres, getPlatforms } from '../../redux/actions';

function Landing () {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClick = () => {
        dispatch(getGenres());
        dispatch(getPlatforms());
        navigate('/home');
    }

    return (
        <div className='landing-page'>
            <BackgroundLanding />
            <button className='enter-button' onClick={() => handleClick()}>Enter Videogames App</button>
        </div>
    );
}

export default Landing;