import { useState } from "react";
import { useSelector } from "react-redux";
import { getGenres } from "../../redux/actions";

const GenresMenu = ({ onChange }) => {

    const genresMenu = useSelector((state) => state.getGenres);
    const [selectedGenre, setSelectedGenre] = useState('');
    const [selectedGenresList, setSelectedGenresList] = useState([]);

    const handleSelectChange = (genreName) => {
        if(!selectedGenresList.includes(genreName)){
            setSelectedGenresList([...selectedGenresList, genreName]);
            onChange({ target: { name: 'genres', value: [...selectedGenresList, genreName] } })
        }
    };

    const handleDelete = (genre) => {
        const updatedList = selectedGenresList.filter((genreName) => genreName !== genre);
        setSelectedGenresList(updatedList);
        onChange({ target: { name: 'genres', value: updatedList} });
    };

    const sortedGenres = genresMenu.slice().sort((a,b) => {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    });

    return (
        <div className='list-container'>
            {/* <h2>Select one or more Genres: </h2> */}
            <select name='genre' id='genres-select' value={selectedGenre} onChange={(event) => handleSelectChange(event.target.value)}>
                <option value="">Select one or more Genres:</option>
                {sortedGenres.map((genres) => (
                    <option key={genres} value={genres}>
                        {genres}
                    </option>
                ))}
            </select>

            <div>
                {selectedGenresList.map((genres) => (
                    <span key={genres}>
                        {genres}
                        <button onClick={() => handleDelete(genres)}>X</button>
                    </span>
                ))}
            </div>
        </div>
    )
}

export default GenresMenu;