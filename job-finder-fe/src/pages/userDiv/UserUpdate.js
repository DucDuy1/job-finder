import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useUserUpdate from '../../hooks/user/useUserUpdate';
import '../css/update.css';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

const UserUpdate = () => {
    const { id } = useParams(); // Lấy id từ URL
    const {
        formState,
        handleChange,
        updateUser,
        isLoading,
        error,
        success,
    } = useUserUpdate();

    useEffect(() => {
        // Set the user ID from the URL into the form state
        handleChange({ target: { name: 'id', value: id } });
    }, [id, handleChange]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateUser(); // Trigger user update on form submission
    };

    return (
        <div className="update-container">
            <Link to="/">
                <FaHome size={60} className="userDetail-home-icon" />
            </Link>
            <h1>Update User</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="fullName">Full name:</label>
                    <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formState.fullName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="age">Age:</label>
                    <input
                        type="number"
                        id="age"
                        name="age"
                        value={formState.age}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="role">Role:</label>
                    <select
                        id="role"
                        name="role"
                        value={formState.role}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled hidden>Select role</option>
                        <option value="ADMIN">Admin</option>
                        <option value="USER">User</option>
                        <option value="MEMBER">Member</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="file">Update avatar:</label>
                    <input
                        type="file"
                        id="file"
                        name="file"
                        accept="image/*"
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Đang cập nhật...' : 'Cập nhật'}
                </button>
            </form>
            {error && <p className="error-message">Error: {error}</p>}
            {success && <p style={{ color: 'green' }}>User uppdate success!</p>}
        </div>
    );
};

export default UserUpdate;
