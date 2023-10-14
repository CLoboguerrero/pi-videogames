import './Form.modules.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postGame } from '../../redux/actions';


const createVideogame = () => {
    const dispatch = useDispatch();

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
                [event.target.name]: event.target.value.split('.').map(item => item.trim()),
            }));
        } else {
            setFormData({
                ...formData,
                [event.target.name]: event.target.value,
            });
        }
    }

    const isFormValid = () => {
        // return !errors.gameName && !errors.description && !errors.platforms && !errors.image && !errors.date && !errors.rating && !errors. genres && formData.gameName && formData.description && formData.platforms.length > 0 && formData.image && formData.date && formData.rating && formData.genres.length > 0
        return formData.name && formData.description && formData.platforms.length > 0 && formData.image && formData.released && formData.rating && formData.genres.length > 0
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (isFormValid()) {
            dispatch(postGame(formData))
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
                    <input
                        id='platforms'
                        name='platforms' 
                        type='text'
                        value={formData.platforms.join(', ')}
                        onChange={handleChange}
                    />
                </div>
                <br />

                <div>
                    <label htmlFor='image'>Image:</label>
                    <input
                        id='image'
                        name='image' 
                        type='text'
                        value={formData.image}
                        onChange={handleChange}
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
                    <input
                        id='genres'
                        name='genres' 
                        type='text'
                        value={formData.genres.join(', ')}
                        onChange={handleChange}
                    />
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