import './Landing.modules.css'
import BackgroundMain from '../Backgrounds/BackgroundMain';
import { useNavigate } from 'react-router-dom';

function Landing () {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/home');
    }

    return (
        <div className='landing-page'>
            <BackgroundMain />
            <button className='enter-button' onClick={() => handleClick()}>Enter Videogames App</button>
        </div>
    );
}

export default Landing;