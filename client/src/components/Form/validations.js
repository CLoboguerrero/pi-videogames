const validate = (formData) => {
    const errors = {};

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
    } else {
        const allowedFormats = ['image/jpeg', 'image/jpg', 'image/png'];
        const maxSize = 5 * 1024 * 1024; // 5MB limit

        if (!allowedFormats.includes(formData.image.type)) {
            errors.image = 'Invalid file format. Please upload a JPEG or PNG image.';
        } else if (formData.image.size > maxSize) {
            errors.image = 'File size exceeds 5MB limit.';
        }
    }

    if (!/^(?:197\d|198\d|199\d|200\d|201\d|202\d|2030)-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12][0-9]|3[01])$/.test(formData.released)){
        errors.released = 'Please insert a valid date in the correspondant format. Minimum released date year: 1970'
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
    return errors;
}

export default validate;