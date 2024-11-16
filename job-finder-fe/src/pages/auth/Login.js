import '../css/auth.css';
import 'animate.css';
import { Link } from 'react-router-dom';
import useLogin from '../../hooks/auth/useLogin';

const Login = () => {
    const { username, password, error, setParams, handleLogin, handleRegisterClick } = useLogin();

    return (
        <div className="auth">
            <div className="auth-background-shapes">
                <div className="shape shape-1"></div>
                <div className="shape shape-2"></div>
                <div className="shape shape-3"></div>
                <div className="shape shape-4"></div>
            </div>
            <div className="auth-grid-background"></div>
            <div className="particles">
            </div>

            <div className="auth-container animate__animated animate__fadeIn">
                <h2 className="animate__animated animate__bounceInDown auth-title">Login</h2>
                {error.form && (
                    <p className="auth-error-message animate__animated animate__shakeX">
                        {error.form}
                    </p>
                )}
                <form onSubmit={handleLogin}>
                    <div className="auth-form-group">
                        <label htmlFor="username">User name</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Enter user name"
                            value={username}
                            onChange={setParams}
                            className="animate__animated animate__fadeInLeft"
                            required
                        />
                        {error.username && (
                            <p className="auth-error-message animate__animated animate__shakeX">
                                {error.username}
                            </p>
                        )}
                    </div>
                    <div className="auth-form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={setParams}
                            className="animate__animated animate__fadeInRight"
                            required
                        />
                        {error.password && (
                            <p className="auth-error-message animate__animated animate__shakeX">
                                {error.password}
                            </p>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="auth-button animate__animated animate__pulse"
                    >
                        Press to login
                    </button>
                    <div className="auth-link">
                        <span>
                            <Link to={`/forgot-password`} className="auth-link-text">
                                Forgot password?
                            </Link>
                        </span>
                        <span className="auth-separator"> | </span>
                        <span className="auth-link-text" onClick={handleRegisterClick}>
                            Register here
                        </span>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
