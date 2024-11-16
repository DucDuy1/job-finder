import React, { useState } from 'react';
import '../css/auth.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { changePasswordAPI } from '../../service/authService';

const ChangePassword = () => {
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email; // Retrieve email passed via navigation

  const handleChangePassword = async () => {
    try {
      await changePasswordAPI(email, otp, newPassword);
      alert('Đổi mật khẩu thành công. Bạn sẽ được chuyển về trang đăng nhập.');
      navigate('/login'); // Redirect to login page
    } catch (error) {
      setError('OTP hoặc mật khẩu không đúng. Vui lòng thử lại.');
    }
  };

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
        <h2 className="animate__animated animate__bounceInDown auth-title">Change Password</h2>
        <p className="auth-email-display">Email: {email}</p>
        <div className="auth-form-group">
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            className="auth-input animate__animated animate__fadeInLeft"
          />
        </div>
        <div className="auth-form-group">
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
            className="auth-input animate__animated animate__fadeInRight"
          />
        </div>
        <button onClick={handleChangePassword} className="auth-button">
          Change password
        </button>
        {error && <p className="auth-error-message">{error}</p>}
      </div>
    </div>

  );
};

export default ChangePassword;
