import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { jobUpdateAPI } from '../../service/jobService';

const useJobUpdate = () => {
    const [formState, setFormState] = useState({
        id: '',
        nameCompany: '',
        title: '',
        tag: [],
        employmentType: [],
        level: [],
        file: null,
        applicationDeadline: new Date(), // Khởi tạo với giá trị hiện tại
        description: '',
        location: '',
        role: ''
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    // Handle form changes
    const handleChange = (e) => {
        const { name, value, files, options } = e.target;
        setFormState((prev) => {
            if (name === 'tag' || name === 'employmentType' || name === 'level') {
                const selectedOptions = Array.from(options)
                    .filter(option => option.selected)
                    .map(option => option.value);
                return { ...prev, [name]: selectedOptions };
            } else if (name === 'file') {
                return { ...prev, file: files ? files[0] : null };
            } else if (name === 'applicationDeadline') {
                return { ...prev, applicationDeadline: new Date(value) }; // Chuyển đổi chuỗi thành Date
            } else {
                return { ...prev, [name]: value };
            }
        });
    };

    // Submit form
    const updateJob = async () => {
        if (!formState.id) {
            console.error('Job ID is required.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setSuccess(false);

        const formData = new FormData();
        Object.keys(formState).forEach((key) => {
            if (key === 'file' && formState.file) {
                formData.append(key, formState.file);
            } else if (Array.isArray(formState[key])) {
                formData.append(key, JSON.stringify(formState[key]));
            } else {
                formData.append(key, formState[key]);
            }
        });

        try {
            await jobUpdateAPI(formData);
            setSuccess(true);
            const { role } = formState;
            if (role === 'ADMIN') {
                navigate('/job/search');
            } else if (role === 'MEMBER') {
                navigate('/member-create-listjob');
            }
        } catch (err) {
            setError(err.message || 'Đã xảy ra lỗi.');
        } finally {
            setIsLoading(false);
        }
    };

    return {
        formState,
        handleChange,
        updateJob,
        isLoading,
        error,
        success
    };
};

export default useJobUpdate;