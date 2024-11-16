import React, { useState } from 'react';
import { forgotPasswordAPI } from '../../service/authService';
import { useNavigate } from 'react-router-dom';
import '../css/auth.css'

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [isSending, setIsSending] = useState(false); // State to prevent multiple clicks
  const navigate = useNavigate();

  const handleSubmitEmail = async () => {
    if (isSending) return; // Prevent further clicks while sending
    setIsSending(true);

    try {
      await forgotPasswordAPI(email);
      setError(null); // Clear any previous error
      navigate('/change-password', { state: { email } }); // Navigate and pass email
    } catch (error) {
      setError('Có lỗi xảy ra khi gửi email, vui lòng thử lại');
    } finally {
      setIsSending(false); // Re-enable the button
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
        <h2 className="animate__animated animate__bounceInDown auth-title">Forgot password</h2>
        <div className="auth-form-group">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Press your email"
            className="auth-input forgot-password-input animate__animated animate__fadeInLeft"
          />
        </div>
        <button onClick={handleSubmitEmail} disabled={isSending} className="auth-button">
          {isSending ? 'Sending...' : 'Send OTP'}
        </button>
        {error && <p className="auth-error-message">{error}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;
