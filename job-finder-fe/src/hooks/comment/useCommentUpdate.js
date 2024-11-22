import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { commentUpdateAPI } from '../../service/commentService';

const useCommentUpdate = () => {
    // Trạng thái form với các đối tượng lồng nhau
    const [formState, setFormState] = useState({
        id: '',
        content: '',
        user: { username: '' },
        job: { id: '' },
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();
    const [role, setRole] = useState('');

    // Hàm cập nhật state dùng chung
    const handleChange = (e) => {
        const { name, value } = e.target;
        const keys = name.split('.'); // Tách name nếu là đối tượng lồng nhau

        setFormState((prev) => {
            if (keys.length === 1) {
                return { ...prev, [name]: value };
            } else {
                return {
                    ...prev,
                    [keys[0]]: { ...prev[keys[0]], [keys[1]]: value },
                };
            }
        });
    };

    // Hàm gửi yêu cầu cập nhật
    const updateComment = async () => {
        setIsLoading(true);
        setError(null);
        setSuccess(false);
    
        const payload = {
            id: formState.id,
            content: formState.content,
            user: { username: formState.user.username },
            job: { id: formState.job.id },
        };
    
        try {
            await commentUpdateAPI(payload); // Thay `formData` bằng `payload`
            setSuccess(true);
            if (role === 'ADMIN') {
                navigate('/comment/search');
            }
        } catch (err) {
            setError(err.message || 'Error occurred.');
        } finally {
            setIsLoading(false);
        }
    };
    

    return {
        formState,
        handleChange,
        updateComment,
        isLoading,
        error,
        success,
    };
};

export default useCommentUpdate;