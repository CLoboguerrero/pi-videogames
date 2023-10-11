import './Form.modules.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const createVideogame = () => {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        platforms: [],
        image:'',
        date:'',
        rating:'',
        genres: []
    });

    const [errors, setErrors] = useState({
        name: '',
        description: '',
        platforms: [],
        image:'',
        date:'',
        rating:'',
        genres: []
    });


    const [submitted, setSubmitted] = useState(false);
    const [confirmationMessage, setConfirmationMessage] = useState('');

    return (
        <div>
            
        </div>
    )
}