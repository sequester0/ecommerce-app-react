import * as yup from 'yup';

const editScheme = yup.object().shape({
    title: yup.string().required('Title is required'),
    description: yup.string().min(5, 'Description must be at least 5 characters long').required('Description is required'),
    price: yup.string().required('Price is required'),
})

export default editScheme;