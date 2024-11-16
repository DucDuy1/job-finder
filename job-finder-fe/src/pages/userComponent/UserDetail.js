import React, { useState, useEffect, useCallback } from 'react'; 
import { useParams, Link } from 'react-router-dom';
import useUserUpdate from '../../hooks/user/useUserUpdate';
import { userGetIdAPI, userGetImageAPI } from '../../service/userService';
import { FaHome } from 'react-icons/fa';
import EditIcon from '@mui/icons-material/Edit';
import '../css/userDetail.css';

const UserDetail = () => {
    const { id } = useParams();
    const { formState, handleChange, updateUser, isLoading, error, success } = useUserUpdate();
    const [avatarUrl, setAvatarUrl] = useState('');
    const [isEditing, setIsEditing] = useState(null);
    const [fileInput, setFileInput] = useState(null); // New state for storing file input

    // Khai báo fetchUserData với useCallback
    const fetchUserData = useCallback(async () => {
        try {
            console.log('Setting ID:', id);
            handleChange({ target: { name: 'id', value: id } });

            const { data: userData } = await userGetIdAPI(id);
            console.log('Fetched User Data:', userData);

            handleChange({ target: { name: 'fullName', value: userData.fullName || '' } });
            handleChange({ target: { name: 'email', value: userData.email || '' } });
            handleChange({ target: { name: 'age', value: userData.age ? parseInt(userData.age, 10) : '' } });
            handleChange({ target: { name: 'username', value: userData.username || '' } });

            if (userData.avatarUrl) {
                loadAvatar(userData.avatarUrl);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    }, [id, handleChange]);

    useEffect(() => {
        console.log('ID from useParams:', id);
    
        // Gọi hàm fetchUserData khi component render lần đầu
        fetchUserData();
    }, [id, fetchUserData]);

    const loadAvatar = async (avatarFilename) => {
        try {
            const imageBlob = await userGetImageAPI(avatarFilename);
            const imageUrl = URL.createObjectURL(imageBlob);
            setAvatarUrl(imageUrl);
        } catch (error) {
            console.error('Error loading avatar:', error);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFileInput(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarUrl(reader.result); // Update avatar URL to the new file
            };
            reader.readAsDataURL(file); // Convert the file to a base64 string
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateUser();
        if (success) {
            fetchUserData(); // Gọi lại fetchUserData khi update thành công
        }
        setIsEditing(null);
    };

    return (
        <div className="userDetail-container">
            {/* Navbar */}
            <div className="userDetail-navbar">
                <Link to="/" className="userDetail-home-link">
                    <FaHome size={24} className="userDetail-home-icon" />
                    <span className="userDetail-home-text">Home</span>
                </Link>
            </div>

            {/* User Header */}
            <div className="userDetail-header">
                {/* Chỉnh sửa avatar để click vào và thay đổi */}
                <div className="userDetail-avatar-container">
                    {avatarUrl ? (
                        <img
                            src={avatarUrl}
                            alt="User Avatar"
                            className="userDetail-avatar"
                            onClick={() => document.getElementById('avatarInput').click()} // Khi click vào avatar, mở hộp thoại chọn ảnh
                        />
                    ) : (
                        <p>No avatar available</p>
                    )}
                    <input
                        type="file"
                        id="avatarInput"
                        className="userDetail-avatar-input"
                        style={{ display: 'none' }} // Ẩn input file
                        onChange={handleFileChange}
                    />
                    {/* Thêm thông báo "Click để thay đổi avatar" */}
                    <p className="userDetail-avatar-change-text">Click to change avatar</p>
                </div>
                <h2>{formState.username || 'No data available'}</h2>
                <p className="userDetail-email">{formState.email || 'No data available'}</p>
            </div>

            {/* User Details */}
            <div className="userDetail-info">
                {renderEditableField('Full Name', formState.fullName, 'fullName')}
                {renderEditableField('Email', formState.email, 'email')}
                {renderEditableField('Age', formState.age, 'age', 'number')}
            </div>

            {/* Error & Success Messages */}
            {error && <p className="error-message">Error: {error}</p>}
            {success && <p className="success-message">User updated successfully!</p>}
        </div>
    );

    function renderEditableField(label, value, field, type = 'text', onChange = null) {
        return (
            <div className="userDetail-row">
                <label className="userDetail-label">{label}:</label>
                {isEditing === field ? (
                    <div className="userDetail-value">
                        {type === 'file' ? (
                            <input type="file" onChange={onChange} className="userDetail-avatar-input" />
                        ) : (
                            <input
                                type={type}
                                name={field}
                                value={value || ''}
                                onChange={handleChange}
                                className="userDetail-input"
                            />
                        )}
                        <div className="userDetail-actions">
                            <button onClick={handleSubmit} disabled={isLoading}>
                                Save
                            </button>
                            <button onClick={() => setIsEditing(null)}>Cancel</button>
                        </div>
                    </div>
                ) : (
                    <div className="userDetail-value">
                        <span>{value || 'No data available'}</span>
                        <EditIcon className="userDetail-icon" onClick={() => setIsEditing(field)} />
                    </div>
                )}
            </div>
        );
    }
};

export default UserDetail;
