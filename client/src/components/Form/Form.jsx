import './Form.modules.css';
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postGame, getGenres, getPlatforms, clearAllGames, clearFoundGames } from '../../redux/actions';
import { uploadImage } from './cloudinary';
import validate from './validations';
import GenresMenu from './GenresMenu';
import PlatformsMenu from './PlatformsMenu';

const createVideogame = () => {
    const dispatch = useDispatch();
    const fileInput = useRef(null);

    const genresList = useSelector((state) => state.getGenres);
    const platformsList = useSelector((state) => state.getPlatforms);

    useEffect(() => {
        if(genresList.length === 0 && platformsList.length === 0){
            dispatch(getGenres());
            dispatch(getPlatforms());
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


    const [submitted, setSubmitted] = useState(false);
    const [confirmationMessage, setConfirmationMessage] = useState('');

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
            // Check file format
            if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
                alert('Invalid file format. Please upload a JPEG, JPG or PNG image.');
                return;
            }
    
            // Check file size (5MB limit)
            const maxSize = 5 * 1024 * 1024; // 5MB limit
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

    const handleSubmit = (event) => {
        event.preventDefault();
        if (isFormValid()) {

            dispatch(postGame(formData));
            dispatch(clearFoundGames());
            dispatch(clearAllGames());
            setConfirmationMessage('Form Submitted successfully!');

            setFormData({
                name: '',
                description: '',
                platforms: [],
                image:'',
                released:'',
                rating:'',
                genres: []
            });

            setFormKey((prevKey) => prevKey + 1);

            setErrors({
                name: '',
                description: '',
                platforms: [],
                image:'',
                released:'',
                rating:'',
                genres: []
            });
            setSubmitted(true);
        };
    };


    return (
        <div>
            {console.log(formData)}
            <form className='videogame-form' onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='name'>Name: </label>
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

                <div>
                    <label htmlFor='description'>Description: </label>
                    <input
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
                    <label htmlFor='platforms'>Platforms: </label>
                    <PlatformsMenu key={formKey} onChange={handleChange} />
                    {errors.platforms && <span>{errors.platforms}</span>}
                </div>
                <br />

                <div>
                    <label htmlFor='image'>Image: </label>
                    <input
                        id='image'
                        name='image' 
                        type='file'
                        ref={fileInput}
                        onChange={handleFileChange}
                    />
                    {errors.image && <span>{errors.image}</span>}
                </div>
                <br />

                <div>
                    <label htmlFor='released'>Released Date: </label>
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

                <div>
                    <label htmlFor='rating'>Rating: </label>
                    <input
                        id='rating'
                        name='rating' 
                        type='text'
                        value={formData.rating}
                        onChange={handleChange}
                    />
                    {errors.rating && <span>{errors.rating}</span>}
                </div>
                <br />

                <div>
                    <label htmlFor='genres'>Genres: </label>
                    <GenresMenu key={formKey} onChange={handleChange} />
                    {errors.genres && <span>{errors.genres}</span>}
                </div>
                <br />

                <button
                    className={isFormValid() ? 'enabled-button' : 'disabled-button'}
                    disabled={!isFormValid()}>Submit
                </button>
            </form>
            {submitted && <div className='confirmation-message'>{confirmationMessage}</div>}
        </div>
    )
}

export default createVideogame;