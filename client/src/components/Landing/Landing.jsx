import './Landing.modules.css'
import BackgroundLanding from '../Backgrounds/BackgroundLanding';
import Logo from '../../assets/images/VideogamesLogo.png';
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
            <img src={Logo} className='site-logo' alt='site-logo' />
            <br />
            <BackgroundLanding />
            <button className='enter-button' onClick={() => handleClick()}>Enter Videogames App</button>
        </div>
    );
}

export default Landing;