import './Search.modules.css';
import { React } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { getGame, clearState } from '../../redux/actions';

function Search () {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [name, setName] = useState('');

    const handleChange = (event) => {
        setName(event.target.value);
    }

    const handleSearch = () => {
        if (name.trim() === ''){
            alert('Please enter game name before searching.');
        } else {
            if (location.pathname !== '/home'){
                navigate('/home');
            }
            dispatch(clearState());
            dispatch(getGame(name));
            setName('');
        };
    };

    return (
        <div className='nav-elements'>
            <input
                className='input-field' 
                type="search"
                placeholder='Search Videogame'
                onChange={handleChange}
                value={name} 
            />
            <h3 className='search-buttons' onClick={handleSearch}>Search!</h3>
        </div>
    );
}

export default Search;