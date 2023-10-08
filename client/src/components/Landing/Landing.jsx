import './Landing.modules.css'
import { useNavigate } from 'react-router-dom';

function Landing () {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/home');
    }

    return (
        <div className='landing-page'>
            <button className='enter-button' onClick={() => handleClick()}>Enter Videogames App</button>
        </div>
    );
}

export default Landing;