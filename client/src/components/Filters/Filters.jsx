import './Filters.modules.css'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterOrigin, filterByGenre, sortGamesByRating, sortGamesByName } from '../../redux/actions';

const Filters = () => {
    
    const dispatch = useDispatch();
    const filterGames = useSelector(state => state.filterGames);
    const genresMenu = useSelector(state => state.getGenres);
 
    const [selectedGenre, setSelectedGenre] = useState('');
    const [selectedRating, setSelectedRating] = useState('');
    const [selectedName, setSelectedName] = useState('');
    const [aux, setAux] = useState(false);
    
    const handleSelectRating = (event) => {
        setSelectedRating(event.target.value);
        dispatch(sortGamesByRating(event.target.value));
        setAux(true);
    }
    
    const handleSelectName = (event) => {
        setSelectedName(event.target.value);
        dispatch(sortGamesByName(event.target.value));
        setAux(true);
    }
    
    const handleFilter = (event) => {
        dispatch(filterOrigin(event.target.dataset.filter));
    }
    
    const handleSelectChange = (event) => {
        setSelectedGenre(event.target.value);
        dispatch(filterByGenre(event.target.value));
        setAux(true);
    }

    const handleReset = () => {
        setSelectedGenre('');
        setSelectedRating('-');
        setSelectedName('-');
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

            <div className="rating-sort">
                    <h2 className="rating-title">Sort By Rating:</h2>
                    <select name="rating" onChange={handleSelectRating}>
                        <option value="">-</option>
                        <option value="D">Higher rating</option>
                        <option value="A">Lower Rating</option>
                    </select>
            </div>

            <div className="name-sort">
                    <h2 className="name-title">Sort By Name:</h2>
                    <select name="name" onChange={handleSelectName}>
                        <option value="">-</option>
                        <option value="A">Ascending</option>
                        <option value="D">Descending</option>
                    </select>
            </div>

            <div className='genres-list'>
                <h2 className='genre-title'>Filter by Genre:</h2>
                <select name='genres' value={selectedGenre} onChange={handleSelectChange}>
                    <option value="">Filter by Genre:</option>
                    {sortedGenres.map((genre) => (
                        <option key={genre} value={genre}>
                            {genre}
                        </option>
                    ))}
                </select>
            </div>

            <button onClick={handleReset}>Reset Filters</button>
        </div>
    )
}

export default Filters;