import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../css/update.css'
import useCommentUpdate from '../../hooks/comment/useCommentUpdate';

const CommentUpdate = () => {
    const { id } = useParams(); // Lấy ID từ URL
    const {
        formState,          // Trạng thái form chứa tất cả dữ liệu
        handleChange,        // Hàm thay đổi state dùng chung
        updateComment,       // Hàm cập nhật comment
        isLoading,
        error,
        success,
    } = useCommentUpdate();

    useEffect(() => {
        handleChange({ target: { name: 'id', value: id } }); // Đặt ID từ URL vào state
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateComment(); // Gọi hàm cập nhật khi submit form
    };

    return (
        <div className="update-container">
            <h1>Update Comment</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="content">Content:</label>
                    <input
                        type="text"
                        id="content"
                        name="content"
                        value={formState.content}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="user.username">Username:</label>
                    <input
                        type="text"
                        id="user.username"
                        name="user.username"
                        value={formState.user.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="job.id">Id job:</label>
                    <input
                        type="text"
                        id="job.id"
                        name="job.id"
                        value={formState.job.id}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Loading...' : success ? 'Updated!' : 'Update'}
                </button>
            </form>
            {error && <p className="error-message">error: {error}</p>}
            {success && <p style={{ color: 'green' }}>Comment update success!</p>}
        </div>
    );
};

export default CommentUpdate;