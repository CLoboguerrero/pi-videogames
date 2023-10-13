import './Landing.modules.css'
import BackgroundLanding from '../Backgrounds/BackgroundLanding';
import { useNavigate } from 'react-router-dom';

function Landing () {
    const navigate = useNavigate();

    const handleClick = () => {
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