import * as yup from 'yup';

const validations = yup.object().shape({
    email: yup.string().email('Geçerli bir email girin!').required(),
    password: yup.string().min(5, 'En az 5 karakter girmelisiniz!').required(),
});

export default validations;
