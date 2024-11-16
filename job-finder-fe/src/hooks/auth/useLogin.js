import { useState, useEffect } from 'react';
import { loginAPI } from "../../service/authService";
import { useNavigate } from 'react-router-dom';
import { loginValidationSchema, validateField } from '../../utils/validations/loginValidation';

const useLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        const role = localStorage.getItem('userRole');
        if (token && role) {
            navigate(role === 'ADMIN' ? '/admin-dashboard' : role === 'USER' ? '/user-dashboard' : role === 'MANAGER' ? '/manager-dashboard' : '/default-path');
        }
    }, [navigate]);

    const setParams = async (event) => {
        const { name, value } = event.target;
        if (name === 'username') setUsername(value);
        if (name === 'password') setPassword(value);

        if (isSubmitted) {
            const errorMessage = await validateField(name, value);
            setError((prevError) => ({ ...prevError, [name]: errorMessage }));
        }
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        setIsSubmitted(true);
        setError({});

        try {
            await loginValidationSchema.validate({ username, password }, { abortEarly: false });
            const response = await loginAPI(username, password);
            localStorage.setItem("accessToken", response.token);
            localStorage.setItem("userRole", response.role);
            localStorage.setItem("id", response.id);
            localStorage.setItem("username", response.username);
            navigate(response.role === 'ADMIN' ? '/admin-dashboard' : response.role === 'USER' ? '/user-dashboard' : response.role === 'MANAGER' ? '/manager-dashboard' : '/default-path');
        } catch (err) {
            if (err.inner) {
                const validationErrors = err.inner.reduce((errors, validationError) => {
                    errors[validationError.path] = validationError.message;
                    return errors;
                }, {});
                setError(validationErrors);
            } else {
                setError({ form: 'Login failed, please try again!' });
            }
        }
    };

    const handleRegisterClick = () => {
        navigate('/register');
    };

    return {
        username,
        password,
        error,
        isSubmitted,
        setParams,
        handleLogin,
        handleRegisterClick
    };
}

export default useLogin;
