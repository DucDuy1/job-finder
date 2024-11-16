import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { userUpdateAPI } from '../../service/userService';

const useUserUpdate = () => {
    const [formState, setFormState] = useState({
        id: '',
        fullName: '',
        username: '',
        email: '',
        age: '',
        file: null,
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [role, setRole] = useState('');
    const navigate = useNavigate();

    const handleChange = useCallback((e) => {
        const { name, value, files } = e.target;
        setFormState((prev) => ({
            ...prev,
            [name]: name === 'age' ? parseInt(value, 10) || '' : files ? files[0] : value, // Chuyển đổi "age" sang số
        }));
    }, []);

    const updateUser = async () => {
        console.log('Form State:', formState); // Debug dữ liệu trước khi gửi
        setIsLoading(true);
        setError(null);
        setSuccess(false);
    
        const formData = new FormData();
        Object.keys(formState).forEach((key) => {
            if (formState[key] !== undefined && formState[key] !== '') {
                if (key === 'age') {
                    formData.append(key, formState[key]); // Đảm bảo `age` được thêm dưới dạng số
                } else {
                    formData.append(key, formState[key]);
                }
            }
        });
    
        console.log('FormData:', [...formData.entries()]); // Log dữ liệu gửi đến API
        try {
            await userUpdateAPI(formData);
            setSuccess(true);
        } catch (err) {
            setError(err.message || 'An error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    return {
        formState,
        handleChange,
        updateUser,
        isLoading,
        error,
        success,
    };
};

export default useUserUpdate;
