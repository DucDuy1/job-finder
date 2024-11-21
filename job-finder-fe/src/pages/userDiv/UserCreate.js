import '../css/create.css';
import 'animate.css';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import useUserCreate from '../../hooks/user/useUserCreate';

const UserCreate = () => {
    const {
        formState,
        isLoading,
        error,
        success,
        handleChange,
        handleSubmit,
    } = useUserCreate();

    return (
        <div className="create-container animate__animated animate__fadeIn">
            <Link to="/" className="userDetail-home-link">
                <FaHome size={24} className="userDetail-home-icon" />
                <span className="userDetail-home-text">Home</span>
            </Link>
            <h1 className="animate__animated animate__bounceIn">Create User</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={formState.username}
                        onChange={handleChange}
                        required
                        className="animate__animated animate__fadeIn"
                    />
                    {error?.username && <p className="error-message">{error.username}</p>}
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formState.password}
                        onChange={handleChange}
                        required
                        className="animate__animated animate__fadeIn"
                    />
                    {error?.password && <p className="error-message">{error.password}</p>}
                </div>
                <div>
                    <label>Full Name:</label>
                    <input
                        type="text"
                        name="fullName"
                        value={formState.fullName}
                        onChange={handleChange}
                        required
                        className="animate__animated animate__fadeIn"
                    />
                    {error?.fullName && <p className="error-message">{error.fullName}</p>}
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        required
                        className="animate__animated animate__fadeIn"
                    />
                    {error?.email && <p className="error-message">{error.email}</p>}
                </div>
                <div>
                    <label>Age:</label>
                    <input
                        type="number"
                        name="age"
                        value={formState.age}
                        onChange={handleChange}
                        required
                        className="animate__animated animate__fadeIn"
                    />
                    {error?.age && <p className="error-message">{error.age}</p>}
                </div>
                <div>
                    <label>Role:</label>
                    <select
                        name="role"
                        value={formState.role}
                        onChange={handleChange}
                        required
                        className="animate__animated animate__fadeIn"
                    >
                        <option value="" disabled hidden>Select Role</option>
                        <option value="ADMIN">Admin</option>
                        <option value="USER">User</option>
                        <option value="MEMBER">Member</option>
                    </select>
                    {error?.role && <p className="error-message">{error.role}</p>}
                </div>
                <div>
                    <label>Avatar:</label>
                    <input
                        type="file"
                        name="file"
                        onChange={handleChange}
                        accept="image/*"
                        className="animate__animated animate__fadeIn"
                    />
                    {error?.file && <p className="error-message">{error.file}</p>}
                </div>
                <button
                    type="submit"
                    className="animate__animated animate__pulse"
                    disabled={isLoading}
                >
                    {isLoading ? "Creating..." : "Create"}
                </button>
                {success && (
                    <p className="success-message animate__animated animate__fadeIn">
                        Created successfully!
                    </p>
                )}
            </form>
        </div>
    );
};

export default UserCreate;
