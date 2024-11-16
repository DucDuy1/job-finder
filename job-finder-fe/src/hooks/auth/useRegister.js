import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerAPI } from '../../service/authService';
import { registerValidationSchema, validateField } from '../../utils/validations/registerValidation';

const useRegister = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState({});
    const [success, setSuccess] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const navigate = useNavigate();

    const setParams = async (event) => {
        const { name, value } = event.target;
        if (name === 'username') setUsername(value);
        if (name === 'password') setPassword(value);
        if (name === 'email') setEmail(value);

        if (isSubmitted) {
            const errorMessage = await validateField(name, value);
            setError((prevError) => ({ ...prevError, [name]: errorMessage }));
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setIsSubmitted(true);
        setError({});

        try {
            await registerValidationSchema.validate({ username, password, email }, { abortEarly: false });
            await registerAPI(username, password, email);
            setSuccess(true);
            navigate('/login');
        } catch (err) {
            if (err.inner) {
                const validationErrors = err.inner.reduce((errors, validationError) => {
                    errors[validationError.path] = validationError.message;
                    return errors;
                }, {});
                setError(validationErrors);
            } else {
                setError({ form: 'Registration failed. Please try again.' });
            }
        }
    };

    return {
        username,
        password,
        email,
        error,
        success,
        isSubmitted,
        setUsername, 
        setPassword,
        setEmail,
        setParams,
        handleRegister
    };
};

export default useRegister;