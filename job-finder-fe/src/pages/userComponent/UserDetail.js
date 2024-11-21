import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import useUserUpdate from '../../hooks/user/useUserUpdate';
import { userGetIdAPI, userGetImageAPI } from '../../service/userService';
import { FaHome } from 'react-icons/fa';
import { Visibility, VisibilityOff } from '@mui/icons-material'; // Icon for toggle
import EditIcon from '@mui/icons-material/Edit';
import '../css/userDetail.css';

const UserDetail = () => {
    const { id } = useParams();
    const { formState, handleChange, updateUser, isLoading, success } = useUserUpdate();
    const [avatarUrl, setAvatarUrl] = useState('');
    const [isEditing, setIsEditing] = useState(null);
    const [isAvatarChanged, setIsAvatarChanged] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [error, setError] = useState(null);

    const fetchUserData = useCallback(async () => {
        try {
            handleChange({ target: { name: 'id', value: id } });

            const { data: userData } = await userGetIdAPI(id);
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
            const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
            if (!validImageTypes.includes(file.type)) {
                alert('Please choose a valid image file (jpg, png, gif).');
                return;
            }
            setIsAvatarChanged(true);
            handleChange({ target: { name: 'file', files: e.target.files } });

            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formState.oldPassword && !formState.password) {
            alert('Please enter a new password if you want to change the old one.');
            return;
        }
        if (formState.password && !formState.oldPassword) {
            alert('Please provide the old password to confirm changes.');
            return;
        }
        try {
            await updateUser();
            if (success) {
                setError(null); // Reset error state
                fetchUserData();
                setIsEditing(null);
                setIsAvatarChanged(false);
            }
            
        } catch (err) {
            console.error('Error during update:', err);
        }
    };

    const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
    const toggleNewPasswordVisibility = () => setShowNewPassword((prev) => !prev);

    return (
        <div className="userDetail-container">
            <div className="userDetail-navbar">
                <Link to="/" className="userDetail-home-link">
                    <FaHome size={24} className="userDetail-home-icon" />
                    <span className="userDetail-home-text">Home</span>
                </Link>
            </div>

            <div className="userDetail-header">
                <div className="userDetail-avatar-container">
                    {avatarUrl ? (
                        <img
                            src={avatarUrl}
                            alt="User Avatar"
                            className="userDetail-avatar"
                            onClick={() => document.getElementById('avatarInput').click()}
                        />
                    ) : (
                        <p>No avatar available</p>
                    )}
                    <input
                        type="file"
                        id="avatarInput"
                        className="userDetail-avatar-input"
                        style={{ display: 'none' }}
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                    <p className="userDetail-avatar-change-text">Click to change avatar</p>
                </div>
                <h2>{formState.username || 'No data available'}</h2>
            </div>

            <form onSubmit={handleSubmit} className="userDetail-info">
                <div className="userDetail-row">
                    <label className="userDetail-label">Full Name:</label>
                    {isEditing === 'fullName' ? (
                        <div className="userDetail-value">
                            <input
                                type="text"
                                name="fullName"
                                value={formState.fullName || ''}
                                onChange={handleChange}
                                className="userDetail-input"
                            />
                        </div>
                    ) : (
                        <div className="userDetail-value">
                            <span>{formState.fullName || 'No data available'}</span>
                            <EditIcon className="userDetail-icon" onClick={() => setIsEditing('fullName')} />
                        </div>
                    )}
                </div>

                <div className="userDetail-row">
                    <label className="userDetail-label">Email:</label>
                    {isEditing === 'email' ? (
                        <div className="userDetail-value">
                            <input
                                type="email"
                                name="email"
                                value={formState.email || ''}
                                onChange={handleChange}
                                className="userDetail-input"
                            />
                        </div>
                    ) : (
                        <div className="userDetail-value">
                            <span>{formState.email || 'No data available'}</span>
                            <EditIcon className="userDetail-icon" onClick={() => setIsEditing('email')} />
                        </div>
                    )}
                </div>

                <div className="userDetail-row">
                    <label className="userDetail-label">Age:</label>
                    {isEditing === 'age' ? (
                        <div className="userDetail-value">
                            <input
                                type="number"
                                name="age"
                                value={formState.age || ''}
                                onChange={handleChange}
                                className="userDetail-input"
                            />
                        </div>
                    ) : (
                        <div className="userDetail-value">
                            <span>{formState.age || 'No data available'}</span>
                            <EditIcon className="userDetail-icon" onClick={() => setIsEditing('age')} />
                        </div>
                    )}
                </div>

                <div className="userDetail-row">
                    <label className="userDetail-label">
                        {isEditing === 'password' ? 'Old Password:' : 'Change Password:'}
                    </label>
                    {isEditing === 'password' ? (
                        <div className="userDetail-value userDetail-password-container">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="oldPassword"
                                value={formState.oldPassword || ''}
                                onChange={handleChange}
                                className="userDetail-input"
                            />
                            <span
                                className="userDetail-toggle-password"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </span>
                        </div>
                    ) : (
                        <div className="userDetail-value">
                            <span>******</span>
                            <EditIcon className="userDetail-icon" onClick={() => setIsEditing('password')} />
                        </div>
                    )}
                </div>

                {isEditing === 'password' && (
                    <div className="userDetail-row">
                        <label className="userDetail-label">New Password:</label>
                        <div className="userDetail-value userDetail-password-container">
                            <input
                                type={showNewPassword ? 'text' : 'password'}
                                name="password"
                                value={formState.password || ''}
                                onChange={handleChange}
                                className="userDetail-input"
                            />
                            <span
                                className="userDetail-toggle-password"
                                onClick={toggleNewPasswordVisibility}
                            >
                                {showNewPassword ? <VisibilityOff /> : <Visibility />}
                            </span>
                        </div>
                    </div>
                )}

                {(isEditing || isAvatarChanged) && (
                    <div className="userDetail-actions userDetail-actions-global">
                        <button type="submit" className="userDetail-save-all" disabled={isLoading}>
                            Save All
                        </button>
                        <button
                            type="button"
                            className="userDetail-cancel-all"
                            onClick={() => {
                                fetchUserData();
                                setIsEditing(null);
                                setIsAvatarChanged(false);
                            }}
                        >
                            Cancel All
                        </button>
                    </div>
                )}

                {error && <p className="userDetail-error">{error}</p>}
                {success && <p className="userDetail-success">{success}</p>}
            </form>
        </div>
    );
};

export default UserDetail;
