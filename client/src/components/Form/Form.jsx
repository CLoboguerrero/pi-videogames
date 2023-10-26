import './Form.modules.css';
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postGame, getGenres, getPlatforms, clearAllGames, clearFoundGames } from '../../redux/actions';
import { uploadImage } from './cloudinary';
import validate from './validations';
import GenresMenu from './GenresMenu';
import PlatformsMenu from './PlatformsMenu';
import BackgroundMain from '../Backgrounds/BackgroundMain';
import Confirmation from './Confirmation';


const createVideogame = () => {
    const dispatch = useDispatch();
    const fileInput = useRef(null);

    const genresList = useSelector((state) => state.getGenres);
    const platformsList = useSelector((state) => state.getPlatforms);

    useEffect(() => {
        if(platformsList.length === 0){
            dispatch(getPlatforms());
        } 
        if (genresList.length === 0) {
            dispatch(getGenres());
        }
    },[dispatch])

    const [formKey, setFormKey] = useState(0); 

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        platforms: [],
        image:'',
        released:'',
        rating:'',
        genres: []
    });

    const [errors, setErrors] = useState({
        name: '',
        description: '',
        platforms: [],
        image:'',
        released:'',
        rating:'',
        genres: []
    });

    const [confirmationMessage, setConfirmationMessage] = useState('');
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleChange = (event) => {
        setFormData(prevState => ({
            ...prevState,
            [event.target.name]: event.target.name === 'platforms' || event.target.name === 'genres' 
            ? event.target.value.map(item => item.trim()) 
            : event.target.value
        }));
        setErrors(prevErrors => ({
            ...prevErrors,
            [event.target.name]: validate({ ...formData, [event.target.name]: event.target.value })[event.target.name]
        }));
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
    
        if (file) {
            if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
                alert('Invalid file format. Please upload a JPEG, JPG or PNG image.');
                return;
            }
    
            const maxSize = 5 * 1024 * 1024;
            if (file.size > maxSize) {
                alert('File size exceeds 5MB limit.');
                return;
            }
    
            try {
                const imageUrl = await uploadImage(file);
                if (imageUrl) {
                    setFormData({
                        ...formData,
                        image: imageUrl
                    });
                } else {
                    alert('Image upload failed. Please, try again later.');
                }
            } catch (error) {
                alert('Error uploading file. Please try again later.', error);
            }
        }
    }

    const isFormValid = () => {
        return !errors.name && !errors.description && !errors.platforms && !errors.image && !errors.date && !errors.rating && !errors. genres && formData.name && formData.description && formData.platforms.length > 0 && formData.image && formData.released && formData.rating && formData.genres.length > 0
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (isFormValid()) {
            try {
                const response = await dispatch(postGame(formData));
                if (response.status === 201) {
                    setShowConfirmation(true);

                    setFormData({
                        name: '',
                        description: '',
                        platforms: [],
                        image:'',
                        released:'',
                        rating:'',
                        genres: []
                    });
                    setErrors({
                        name: '',
                        description: '',
                        platforms: [],
                        image:'',
                        released:'',
                        rating:'',
                        genres: []
                    });

                    dispatch(clearFoundGames());
                    dispatch(clearAllGames());
                } else if (response.status === 400) {
                    alert('A game with this name already exists! Please choose a different name');
                } else {
                    alert('Error creating videogame. Please try again later.');
                }
            } catch (error) {
                alert(`A game with name ${formData.name} already exists! Please choose a different name`);
            }
        }
    };

    const handleCloseConfirmation = () => {
        setShowConfirmation(false);
    };

    return (
        <div className='form-container'>
            <h1>Create new videogame</h1>
            <span>Please fill in the following info:</span>
            <br />
            <span>*Required fields</span>

            <form className='videogame-form' onSubmit={handleSubmit}>
                <div className='name-input'>
                    <label htmlFor='name'>*Videogame Name: </label>
                    <input
                        id='name'
                        name='name' 
                        type='text'
                        value={formData.name}
                        onChange={handleChange}
                    />
                    {errors.name && <span>{errors.name}</span>}
                </div>
                <br />

                <div className='form-first-group'>
                    <div className='release-input'>
                        <label htmlFor='released'>*Release Date: </label>
                        <input
                            id='released'
                            name='released' 
                            type='text'
                            placeholder='YYYY-MM-DD'
                            value={formData.released}
                            onChange={handleChange}
                        />
                        {errors.released && <span>{errors.released}</span>}
                    </div>
                    <br />

                    <div className='rating-input'>
                        <label htmlFor='rating'>*Rating: </label>
                        <input
                            id='rating'
                            name='rating' 
                            type='text'
                            placeholder='Between 0 and 5 decimals allowed'
                            value={formData.rating}
                            onChange={handleChange}
                        />
                        {errors.rating && <span>{errors.rating}</span>}
                    </div>
                    <br />
                </div>

                <div className='form-second-group'>
                    <div className='platforms-input'>
                        <label htmlFor='platforms'>*Platforms: </label>
                        <PlatformsMenu key={formKey} onChange={handleChange} />
                        {errors.platforms && <span>{errors.platforms}</span>}
                    </div>
                    <br />

                    <div className='genres-input'>
                        <label htmlFor='genres'>*Genres: </label>
                        <GenresMenu key={formKey} onChange={handleChange} />
                        {errors.genres && <span>{errors.genres}</span>}
                    </div>
                    <br />
                </div>

                <div className='description-input'>
                    <label htmlFor='description'>*Description: </label>
                    <textarea
                        id='description'
                        name='description' 
                        type='text'
                        value={formData.description}
                        onChange={handleChange}
                    />
                    {errors.description && <span>{errors.description}</span>}
                </div>
                <br />

                <div>
                    <label htmlFor='image'>*Image: </label>
                    <input
                        id='image'
                        key={formKey}
                        name='image' 
                        type='file'
                        ref={fileInput}
                        onChange={handleFileChange}
                    />
                    {errors.image && <span>{errors.image}</span>}
                </div>
                <br />

                <button
                    className={isFormValid() ? 'enabled-button' : 'disabled-button'}
                    disabled={!isFormValid()}>Submit
                </button>
            </form>
            {showConfirmation && <Confirmation onClose={handleCloseConfirmation} />}
            <BackgroundMain />
        </div>
    )
}

export default createVideogame;