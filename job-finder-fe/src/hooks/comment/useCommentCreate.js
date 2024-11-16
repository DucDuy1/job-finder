import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { commentCreateAPI } from '../../service/commentService';

const useCommentCreate = () => {
    // Trạng thái của form với các đối tượng lồng nhau
    const [formState, setFormState] = useState({
        content: "",
        user: { username: "" },  // Đối tượng user lồng nhau
        job: { id: "" },         // Đối tượng job lồng nhau
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [role, setRole] = useState('');
    const navigate = useNavigate();

    // Hàm cập nhật state của form (xử lý cho các đối tượng lồng nhau)
    const handleChange = (e) => {
        const { name, value } = e.target;

        // Tách tên trường bằng dấu '.' để xử lý trường lồng nhau như user.username
        const keys = name.split('.');
        // Cập nhật formState dựa trên việc trường có phải là lồng nhau hay không
        setFormState((prev) => {
            if (keys.length === 1) {
                // Trường bình thường (content, createAt)
                return {
                    ...prev,
                    [name]: value,
                };
            } else {
                // Trường lồng nhau (user.username, job.id)
                return {
                    ...prev,
                    [keys[0]]: { ...prev[keys[0]],
                        [keys[1]]: value,
                    },
                };
            }
        });
    };

    // Hàm gửi form
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("content", formState.content);
        formData.append("user.username", formState.user.username); // Đối tượng user
        formData.append("job.id", formState.job.id);               // Đối tượng job

        try {
            setIsLoading(true);
            setError(null);
            await commentCreateAPI(formData);
            setSuccess(true);
            // Reset form sau khi gửi thành công
            setFormState((prev) => ({
                ...prev,
                content: "",  // Reset content, giữ lại các trường khác
            }));
            // Chuyển hướng sau khi tạo thành công
            if (role === 'ADMIN') {
                navigate('/user/search'); // Đường dẫn cho ADMIN
            }
        } catch (err) {
            setError(err.message || "Đã xảy ra lỗi.");
        } finally {
            setIsLoading(false);
        }
    };

    return {
        formState,
        isLoading,
        error,
        success,
        handleChange,
        handleSubmit,
    };
};

export default useCommentCreate;