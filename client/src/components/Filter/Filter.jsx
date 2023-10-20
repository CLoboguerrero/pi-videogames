import './Filter.modules.css'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterOrigin } from '../../redux/actions';
import Card from "../Card/Card";

const Filters = () => {
    
    const dispatch = useDispatch();
    const filterGames = useSelector(state => state.filterGames)

    const [name, setName] = useState('')

    const handleSelect = (event) => {
        setName(event.target.value);
    }

    const handleFilter = (event) => {
        dispatch(filterOrigin(event.target.dataset.filter))
    }

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

            <div className='filters-container'>
            {
                filterGames.map(game => {
                    return (
                        <Card
                            key={game.id}
                            id={game.id}
                            image={game.image}
                            name={game.name}
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