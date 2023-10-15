import './Landing.modules.css'
import BackgroundLanding from '../Backgrounds/BackgroundLanding';
import Logo from '../../assets/images/VideogamesLogo.png';
import { useNavigate } from 'react-router-dom';

function Landing () {
    const navigate = useNavigate();

    const handleClick = () => {
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