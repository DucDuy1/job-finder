import { useState } from 'react';
import useRegister from '../../hooks/auth/useRegister';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import icon
import '../css/auth.css';
import 'animate.css';

const Register = () => {
    const {
        username,
        password,
        email,
        error,
        success,
        setUsername,
        setPassword,
        setEmail,
        handleRegister,
    } = useRegister();

    const [showPassword, setShowPassword] = useState(false); // Trạng thái ẩn/hiện mật khẩu

    return (
        <div className="auth">
            <div className="auth-background-shapes">
                <div className="shape shape-1"></div>
                <div className="shape shape-2"></div>
                <div className="shape shape-3"></div>
                <div className="shape shape-4"></div>
            </div>
            <div className="grid-background"></div>
            <div className="auth-container animate__animated animate__fadeIn">
                <h2 className="animate__animated animate__bounceInDown auth-title">Register</h2>
                {success && <p className="auth-success-message">Registration successful!</p>}
                {error && error.form && <p className="auth-error-message">{error.form}</p>}

                <form onSubmit={handleRegister}>
                    <div className="auth-form-group">
                        <label htmlFor="username" className="auth-label">Username:</label>
                        <input
                            type="text"
                            id="username"
                            placeholder="Enter user name"
                            className={`auth-input animate__animated animate__fadeInLeft ${error.username ? 'auth-input-error' : ''}`}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        {error.username && <p className="auth-error-message animate__animated animate__shakeX">{error.username}</p>}
                    </div>
                    <div className="auth-form-group">
                        <label htmlFor="password" className="auth-label">Password:</label>
                        <div className="auth-input-container">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                placeholder="Enter password"
                                className={`auth-input animate__animated animate__fadeInRight ${error.password ? 'auth-input-error' : ''}`}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <span
                                className="auth-password-icon"
                                onClick={() => setShowPassword(!showPassword)} // Toggle trạng thái
                            >
                                {showPassword ? <FaEyeSlash size={24} /> : <FaEye size={24} />}
                            </span>
                        </div>
                        {error.password && <p className="auth-error-message animate__animated animate__shakeX">{error.password}</p>}
                    </div>
                    <div className="auth-form-group">
                        <label htmlFor="email" className="auth-label">Email:</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter email"
                            className={`auth-input animate__animated animate__fadeInLeft ${error.email ? 'auth-input-error' : ''}`}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        {error.email && <p className="auth-error-message animate__animated animate__shakeX">{error.email}</p>}
                    </div>
                    <button type="submit" className="auth-button">Register</button>
                </form>
            </div>
        </div>
    );
};

export default Register;
