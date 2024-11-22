import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../css/update.css'
import useApplyUpdate from '../../hooks/apply/useApplyUpdate';

const ApplyUpdate = () => {
    const { id } = useParams(); // Lấy ID từ URL
    const {
        formState,
        handleChange,
        updateApply,
        isLoading,
        error,
        success,
    } = useApplyUpdate();

    useEffect(() => {
        handleChange({ target: { name: 'id', value: id } }); // Đặt ID từ URL vào state
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateApply(); // Gọi hàm cập nhật khi submit form
    };

    return (
        <div className="update-container">
            <h1>Cập nhật Apply</h1>
            <form onSubmit={handleSubmit}>
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
                <div>
                    <label htmlFor="file">File cv:</label>
                    <input
                        type="file"
                        id="file"
                        accept=".pdf,.doc,.docx,.txt"
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Đang cập nhật...' : 'Cập nhật'}
                </button>
            </form>
            {error && <p className="error-message">Error: {error}</p>}
            {success && <p style={{ color: 'green' }}>Apply update success!</p>}
        </div>
    );
};

export default ApplyUpdate;