import './Filter.modules.css'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterOrigin, filterByGenre, sortGamesByRating, sortGamesByName } from '../../redux/actions';
import Card from "../Card/Card";

const Filters = () => {
    
    const dispatch = useDispatch();
    const filterGames = useSelector(state => state.filterGames);
    const genresMenu = useSelector(state => state.getGenres);
 
    const [selectedGenre, setSelectedGenre] = useState('');
    const [aux, setAux] = useState(false);
    
    const handleSelectRating = (event) => {
        dispatch(sortGamesByRating(event.target.value));
        setAux(true);
    }
    
    const handleSelectName = (event) => {
        dispatch(sortGamesByName(event.target.value));
        setAux(true);
    }
    
    const handleFilter = (event) => {
        dispatch(filterOrigin(event.target.dataset.filter));
    }
    
    const handleSelectChange = (event) => {
        const selectedGenre = event.target.value
        setSelectedGenre(selectedGenre);
        dispatch(filterByGenre(selectedGenre));
        setAux(true);
    }

    const sortedGenres = genresMenu.slice().sort((a, b) => {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    });

    return (
        <div>
            <h2>Filter test</h2>
            <div className='filter-test'>
                <h2 className='filter-origin'></h2>
                <select name="order" onChange={handleFilter}>
                    <option value="gamesInDb">Stored in DB</option>
                    <option value="gamesInApi">Stored in API</option>
                    <option value="showAll">Show All</option>
                </select>
                <h3 className='select-buttons' data-filter='showAll' onClick={handleFilter}>All Games</h3>
                <h3 className='select-buttons' data-filter='gamesInDb' onClick={handleFilter}>Games in DB</h3>
                <h3 className='select-buttons' data-filter='gamesInApi' onClick={handleFilter}>Games in API</h3>
            </div>

            <div className="rating-sort">
                    <h2 className="rating-title">Sort By Rating:</h2>
                    <select name="rating" onChange={handleSelectRating}>
                        <option value="">Rating:</option>
                        <option value="D">Higher rating</option>
                        <option value="A">Lower Rating</option>
                    </select>
            </div>

            <div className="name-sort">
                    <h2 className="name-title">Sort By Name:</h2>
                    <select name="name" onChange={handleSelectName}>
                        <option value="">Name:</option>
                        <option value="A">Ascending</option>
                        <option value="D">Descending</option>
                    </select>
            </div>

            <div className='genres-list'>
                <h2>Filter by Genre:</h2>
                <select name='genres' value={selectedGenre} onChange={handleSelectChange}>
                    <option value="">Filter by Genre:</option>
                    {sortedGenres.map((genre) => (
                        <option key={genre} value={genre}>
                            {genre}
                        </option>
                    ))}
                </select>
            </div>



            <div className='filters-container'>
            {
                filterGames.map(game => {
                    return (
                        <Card
                            key={game.id}
                            id={game.id}
                            image={game.image}
                            name={game.name}
                            rating={game.rating}
                            genres={game.genres}
                        />
                    );
                })
            }
            </div>
        </div>
    )
}

export default Filters;