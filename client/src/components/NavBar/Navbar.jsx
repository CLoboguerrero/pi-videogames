import './NavBar.modules.css';
import Logo from '../../assets/images/VideoGamesLogo.png'
import Search from '../Search/Search';
import { Link } from 'react-router-dom';

function NavBar() {

    return(
        <nav className='nav-bar'>
            <div className='nav-links'>
                <img id='app-logo' src={Logo} alt=''/>
                <Link to = '/home'>Home</Link>
                <Link to = '/form'>Custom Games</Link>
                <Link to = '/test'>Filters</Link>
                <p>Your Games Library</p>
                <p>What?</p>
            </div>
            <Search/>
        </nav>
    );
}

export default NavBar;