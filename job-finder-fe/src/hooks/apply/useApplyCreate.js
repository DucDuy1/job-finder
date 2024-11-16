import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { applyCreateAPI } from '../../service/applyService';

const useApplyCreate = () => {
    const [formState, setFormState] = useState({
        user: { username: "" },
        job: { id: "" },
        file: null,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();
    const [role, setRole] = useState('');

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        const keys = name.split('.');
        setFormState((prev) => {
            if (keys.length === 1) {
                return {
                    ...prev,
                    [name]: files ? files[0] : value,
                };
            } else {
                return {
                    ...prev,
                    [keys[0]]: {
                        ...prev[keys[0]],
                        [keys[1]]: value,
                    },
                };
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Đảm bảo ngăn hành vi mặc định

        const formData = new FormData();
        formData.append("user.username", parseInt(formState.user.username));
        formData.append("job.id", parseInt(formState.job.id));
        if (formState.file) formData.append("file", formState.file);

        try {
            setIsLoading(true);
            setError(null);
            await applyCreateAPI(formData);
            setSuccess(true);
            setFormState({ user: { username: "" }, job: { id: "" }, file: null });
            if (role === 'ADMIN') {
                navigate('/apply/search'); // Đường dẫn cho ADMIN
            }
        } catch (err) {
            setError(err.message || "Đã xảy ra lỗi.");
        } finally {
            setIsLoading(false);
        }
    };

    return {
        formState,
        setFormState, // Xuất setFormState để sử dụng bên ngoài
        isLoading,
        error,
        success,
        handleChange,
        handleSubmit,
    };
};

export default useApplyCreate;