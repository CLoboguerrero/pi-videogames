import './NavBar.modules.css';
import Search from '../Search/Search';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getGenres, getPlatforms } from '../../redux/actions';

function NavBar() {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(getGenres());
        dispatch(getPlatforms());
    }

    return(
        <nav className='nav-bar'>
            <div className='nav-links'>
                <Link to = '/home'>Home</Link>
                <Link to = '/form'><div onClick={() => handleClick()}>Form</div></Link>
                <p>Yes</p>
                <p>What?</p>
            </div>
            <Search/>
        </nav>
    );
}

export default NavBar;