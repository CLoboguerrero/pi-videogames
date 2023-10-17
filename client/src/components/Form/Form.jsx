import './Form.modules.css';
import { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { postGame, getGenres, getPlatforms, clearAllGames } from '../../redux/actions';
import { uploadImage } from './cloudinary';
import validate from './validations';
import GenresMenu from './GenresMenu';
import PlatformsMenu from './PlatformsMenu';

const createVideogame = () => {
    const dispatch = useDispatch();
    const fileInput = useRef(null);

    useEffect(() => {
        dispatch(getPlatforms());
        dispatch(getGenres());
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
        if (event.target.name === 'platforms' || event.target.name === 'genres') {
            setFormData(prevState => ({
                ...prevState,
                [event.target.name]: event.target.value.map(item => item.trim()),
            }));
        } else {
            setFormData({
                ...formData,
                [event.target.name]: event.target.value
            });
        }

        setErrors(validate ({
            ...formData,
            [event.target.name]: event.target.value
        }));
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            try {
                const imageUrl = await uploadImage(file);
                if (imageUrl) {
                    setFormData({
                        ...formData,
                        image: imageUrl
                    });
                    //fileInput.current.value = '';
                } else {
                    // Handle the case where imageUrl is undefined (upload failed)
                    console.error('Image upload failed.');
                }
            } catch (error) {
                console.error('Error uploading file', error);
            }
        }
    }

    const isFormValid = () => {
        // return !errors.gameName && !errors.description && !errors.platforms && !errors.image && !errors.date && !errors.rating && !errors. genres && formData.gameName && formData.description && formData.platforms.length > 0 && formData.image && formData.date && formData.rating && formData.genres.length > 0
        return formData.name && formData.description && formData.platforms.length > 0 && formData.image && formData.released && formData.rating && formData.genres.length > 0
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (isFormValid()) {

            dispatch(postGame(formData));
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

            setFormKey((prevKey) => prevKey + 1)

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
                    <label htmlFor='name'>Name:</label>
                    <input
                        id='name'
                        name='name' 
                        type='text'
                        value={formData.gameName}
                        onChange={handleChange}
                    />
                </div>
                <br />

                <div>
                    <label htmlFor='description'>Description:</label>
                    <input
                        id='description'
                        name='description' 
                        type='text'
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>
                <br />

                <div>
                    <label htmlFor='platforms'>Platforms:</label>
                    <PlatformsMenu key={formKey} onChange={handleChange} />
                </div>
                <br />

                <div>
                    <label htmlFor='image'>Image:</label>
                    <input
                        id='image'
                        name='image' 
                        type='file'
                        ref={fileInput}
                        onChange={handleFileChange}
                    />
                </div>
                <br />

                <div>
                    <label htmlFor='released'>Released Date:</label>
                    <input
                        id='released'
                        name='released' 
                        type='text'
                        value={formData.released}
                        onChange={handleChange}
                    />
                </div>
                <br />

                <div>
                    <label htmlFor='rating'>Rating</label>
                    <input
                        id='rating'
                        name='rating' 
                        type='text'
                        value={formData.rating}
                        onChange={handleChange}
                    />
                </div>
                <br />

                <div>
                    <label htmlFor='genres'>Genres:</label>
                    <GenresMenu key={formKey} onChange={handleChange} />
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