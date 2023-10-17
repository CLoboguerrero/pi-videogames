import './NavBar.modules.css';
import Search from '../Search/Search';
import { Link } from 'react-router-dom';

function NavBar() {

    return(
        <nav className='nav-bar'>
            <div className='nav-links'>
                <Link to = '/home'>Home</Link>
                <Link to = '/form'>Form</Link>
                <p>Yes</p>
                <p>What?</p>
            </div>
            <Search/>
        </nav>
    );
}

export default NavBar;