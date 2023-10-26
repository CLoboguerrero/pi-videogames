import './Search.modules.css';
import { React } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { getGame } from '../../redux/actions';
import Loading from '../Loading/Loading';

function Search () {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [name, setName] = useState('');

    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        setName(event.target.value);
    }

    const handleSearch = async () => {
        if (name.trim() === '') {
          alert('Please enter a game name before searching.');
        } else {
          if (location.pathname !== '/home') {
            navigate('/home');
          }
    
          setLoading(true);
    
          try {
            await dispatch(getGame(name));
            setName('');
          } catch (error) {
            alert('Error fetching game data:', error);
          } finally {
            setLoading(false);
          }
        }
      };

    return (
        <div className='nav-container'>
            <div className='nav-elements'>
                <input
                    id='search-field'
                    className='input-field' 
                    type="search"
                    placeholder='Search Videogame'
                    onChange={handleChange}
                    value={name} 
                />
                <h3 className='search-buttons' onClick={handleSearch}>Search!</h3>
            </div>

            
            {loading && <Loading />}
        </div>
    );
}

export default Search;