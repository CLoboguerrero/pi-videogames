const validate = (formData) => {
    const errors = {}

    if (formData.name.length < 3 || formData.name.length > 25){
        errors.name = 'Name must have between 3 and 25 characters';
    }

    if (!formData.name) {
        errors.name = 'Please insert a game name';
    }

    if (formData.description.length < 20 || formData.description.length > 200) {
        errors.description = 'Description must have between 20 and 200 characters';
    }

    if (!formData.description) {
        errors.description = 'Please provide a description for the game';
    }

    if (!formData.platforms) {
        errors.platforms = 'Please select at least one platform';
    }

    if (!formData.image) {
        errors.image = 'Please upload an image';
    }

    if (!formData.released) {
        errors.released = 'Please provide a game release date';
    }

    if (formData.rating < 1 || formData.rating > 5) {
        errors.rating = 'Rating must be between 1 and 5';
    }

    if (isNaN(parseInt(formData.rating))) {
        errors.rating = 'Please provide a numeric value';
    }

    if (!formData.rating) {
        errors.rating = 'Please provide a release date';
    }

    if (!formData.genres) {
        errors.genres = 'Please select at least one genre';
    }
}

export default validate;