import './Filters.modules.css'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterOrigin, filterByGenre, sortGamesByRating, sortGamesByName } from '../../redux/actions';

const Filters = () => {
    
    const dispatch = useDispatch();
    const genresMenu = useSelector(state => state.getGenres);
 
    const [fieldsKey, setFieldsKey] = useState(0);
    const [selectedGenre, setSelectedGenre] = useState('');
    
    const handleFilter = (event) => {
        dispatch(filterOrigin(event.target.dataset.filter));
    }
    
    const handleSelectRating = (event) => {
        dispatch(sortGamesByRating(event.target.value));
    }
    
    const handleSelectName = (event) => {
        dispatch(sortGamesByName(event.target.value));
    }
    
    const handleSelectChange = (event) => {
        setSelectedGenre(event.target.value);
        dispatch(filterByGenre(event.target.value));
    }

    const handleReset = () => {
        setFieldsKey((prevKey) => prevKey + 1);
        setSelectedGenre('');
        dispatch(filterOrigin('showAll'));
    };

    const sortedGenres = genresMenu.slice().sort((a, b) => {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    });

    return (
        <div className='filter-bar'>
            <br />
            <br />
            <div className='games-origin'>
                <div>
                    <h2 className='origin-title'>Display Games From:</h2>
                </div>
                <div className='select-buttons-container'>
                    <h3 className='select-buttons' data-filter='showAll' onClick={handleFilter}>All Games</h3>
                    <h3 className='select-buttons' data-filter='gamesInDb' onClick={handleFilter}>Games in DB</h3>
                    <h3 className='select-buttons' data-filter='gamesInApi' onClick={handleFilter}>Games in API</h3>
                </div>
            </div>

            <div className='rating-sort'>
                <h2 className='rating-title'>Sort By Rating:</h2>
                <select name='rating' key={fieldsKey} onChange={handleSelectRating}>
                    <option value=''>-</option>
                    <option value='D'>Higher Rating</option>
                    <option value='A'>Lower Rating</option>
                </select>
            </div>

            <div className='name-sort'>
                <h2 className='name-title'>Sort By Name:</h2>
                <select name='name' key={fieldsKey} onChange={handleSelectName}>
                    <option value=''>-</option>
                    <option value='A'>Descending - A to Z</option>
                    <option value='D'>Ascending - Z to A</option>
                </select>
            </div>

            <div className='genres-list'>
                <h2 className='genre-title'>Filter by Genre:</h2>
                <select name='genres' value={selectedGenre} onChange={handleSelectChange}>
                    <option value=''>-</option>
                    {sortedGenres.map((genre) => (
                        <option key={genre} value={genre}>
                            {genre}
                        </option>
                    ))}
                </select>
            </div>
            
            <div className='reset-button'>
                <button onClick={handleReset}>Reset Filters</button>
            </div>
        </div>
    )
}

export default Filters;