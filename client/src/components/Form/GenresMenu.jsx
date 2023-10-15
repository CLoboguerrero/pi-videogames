import { useState } from "react";
import { useSelector } from "react-redux";
import { getGenres } from "../../redux/actions";

const GenresMenu = () => {

    const genresMenu = useSelector((state) => state.getGenres);
    const [selectedGenre, setSelectedGenre] = useState('');
    const [selectedGenresList, setSelectedGenresList] = [];

    const getGenreName = (name) => {
        const selectedGenre = genresMenu.find((genre) => genre.name === name);
        return selectedGenre ? selectedGenre.name: '';
    };

    const handleSelectChange = (genreName) => {
        if(!selectedGenresList.includes(genreName)){
            setSelectedGenresList([...setSelectedGenresList, genreName]);
            onChange({ target: { name: 'genres', value: [...selectedGenresList, genreName] } })
        }
    };

    const handleDelete = (genre) => {
        const updatedList = selectedGenresList.filter((genreName) => genreName !== genre);
        selectedGenresList(updatedList);
        onChange({ target: { name: 'genres', value: updatedList} });
    };

    const sortedGenres = genresMenu.slice().sort((a,b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
    });

    return (
        <div className='list-container'>
            <h2>Select one or more Genres: </h2>
            <select name='genre' value={selectedGenre} onChange={(event) => handleSelectChange(event.target.value)}>
                <option value="">Select one or more Genres:</option>
                {sortedGenres.map((genre) => (
                    <option key={genre.name} value={genre.name}>
                        {genre.name}
                    </option>
                ))}
            </select>

            <div>
                {selectedGenresList.map((genreName) => (
                    <span key={genreName}>
                        {getGenreName(genreName)}
                        <button onClick={() => handleDelete(genreName)}>X</button>
                    </span>
                ))}
            </div>
        </div>
    )
}

export default GenresMenu;