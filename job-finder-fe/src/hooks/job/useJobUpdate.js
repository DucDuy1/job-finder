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
        applicationDeadline: '', // Sử dụng chuỗi để lưu giá trị
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
                return { ...prev, applicationDeadline: value }; // Lưu dưới dạng chuỗi
            } else {
                return { ...prev, [name]: value };
            }
        });
    };

    // Submit form
    const updateJob = async () => {
        if (!formState.id) {
            setError('Job ID is required.');
            return;
        }

        setIsLoading(true);
        setError(null);
        setSuccess(false);

        const formData = new FormData();
        Object.keys(formState).forEach((key) => {
            const value = formState[key];
            if (key === 'file' && value) {
                formData.append(key, value);
            } else if (Array.isArray(value)) {
                // Gửi mảng dưới dạng chuỗi phân cách bằng dấu phẩy
                formData.append(key, value.join(','));
            } else if (key === 'applicationDeadline') {
                // Chuyển thành chuỗi ISO
                formData.append(key, new Date(value).toISOString());
            } else {
                formData.append(key, value);
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
            setError(err?.response?.data?.message || 'error');
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
