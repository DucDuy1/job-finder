import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { applyUpdateAPI } from '../../service/applyService';

const useApplyUpdate = () => {
    const [formState, setFormState] = useState({
        id: '',
        file: null,
        user: { username: '' },
        job: { id: '' },
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();
    // Handle text inputs
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        const keys = name.split('.'); // Handle nested objects
        setFormState((prev) => {
            if (files) {
                // If a file is being uploaded
                return { ...prev, [name]: files[0] };
            } else if (keys.length === 1) {
                return { ...prev, [name]: value };
            } else {
                return {
                    ...prev,
                    [keys[0]]: { ...prev[keys[0]], [keys[1]]: value },
                };
            }
        });
    };

    // Submit the form
    const updateApply = async () => {
        setIsLoading(true);
        setError(null);
        setSuccess(false);
        const formData = new FormData();
        formData.append('user.username', formState.user.username);
        formData.append('job.id', formState.job.id);
        formData.append('file', formState.file);
        if (formState.file) {
            formData.append('file', formState.file); // Append the file
        }
        try {
            await applyUpdateAPI(formData);
            setSuccess(true);
            navigate('/apply/search');
        } catch (err) {
            setError(err.message || 'error.');
        } finally {
            setIsLoading(false);
        }
    };

    return {
        formState,
        handleChange,
        updateApply,
        isLoading,
        error,
        success,
    };
};

export default useApplyUpdate;