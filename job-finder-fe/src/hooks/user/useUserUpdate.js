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
        role: '',
        file: null,
        oldPassword: '', // Thêm trường mật khẩu cũ
        newPassword: '', // Thêm trường mật khẩu mới
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleChange = useCallback((e) => {
        const { name, value, files } = e.target;
        setFormState((prev) => ({
            ...prev,
            [name]: name === 'age' ? parseInt(value, 10) || '' : files ? files[0] : value, // Chuyển đổi "age" sang số
        }));
    }, []);

    const updateUser = async () => {
        const formData = new FormData();
        Object.keys(formState).forEach((key) => {
            if (formState[key] !== undefined && formState[key] !== '') {
                formData.append(key, formState[key]); // Thêm file đúng tên key
            }
        });

        try {
            setIsLoading(true);
            await userUpdateAPI(formData); // Gửi request
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