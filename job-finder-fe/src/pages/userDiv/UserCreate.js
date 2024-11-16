import useUserCreate from '../../hooks/user/useUserCreate';
import '../css/create.css'
import 'animate.css';

const UserCreate = () => {
    const {
        formState,
        isLoading,
        error,
        success,
        fieldErrors,
        isSubmitted,
        handleChange,
        handleSubmit,
    } = useUserCreate();

    return (
        <div className="create-container animate__animated animate__fadeIn">
            <h1 className="animate__animated animate__bounceIn">Create User</h1>
            {error && (
                <p className="error-message animate__animated animate__shakeX">
                    {error}
                </p>
            )}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>User name:</label>
                    <input
                        type="text"
                        name="username"
                        value={formState.username}
                        onChange={handleChange}
                        required
                        className="animate__animated animate__fadeIn"
                    />
                    {isSubmitted && fieldErrors.username && (
                        <p className="error-message">{fieldErrors.username}</p>
                    )}
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
                    {isSubmitted && fieldErrors.password && (
                        <p className="error-message">{fieldErrors.password}</p>
                    )}
                </div>
                <div>
                    <label>Full name:</label>
                    <input
                        type="text"
                        name="fullName"
                        value={formState.fullName}
                        onChange={handleChange}
                        required
                        className="animate__animated animate__fadeIn"
                    />
                    {isSubmitted && fieldErrors.fullName && (
                        <p className="error-message">{fieldErrors.fullName}</p>
                    )}
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
                    {isSubmitted && fieldErrors.email && (
                        <p className="error-message">{fieldErrors.email}</p>
                    )}
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
                    {isSubmitted && fieldErrors.age && (
                        <p className="error-message">{fieldErrors.age}</p>
                    )}
                </div>
                <label>
                    Role:
                    <select
                        name="role"
                        value={formState.role}
                        onChange={handleChange}
                    >
                        <option value="" disabled hidden>Select Role</option>
                        <option value="ADMIN">Admin</option>
                        <option value="USER">User</option>
                        <option value="MEMBER">Manager</option>
                    </select>
                </label>
                <div>
                    <label>Avatar:</label>
                    <input
                        type="file"
                        name="file"
                        onChange={handleChange}
                        className="animate__animated animate__fadeIn"
                        accept="image/*"
                    />
                    {isSubmitted && fieldErrors.file && (
                        <p className="error-message">{fieldErrors.file}</p>
                    )}
                </div>
                <button
                    type="submit"
                    className="animate__animated animate__pulse"
                    disabled={isLoading}
                >
                    {isLoading ? "Creating..." : "Create User"}
                </button>
                {success && (
                    <p className="success-message animate__animated animate__fadeIn">
                        User created successfully!
                    </p>
                )}
            </form>
        </div>
    );
};

export default UserCreate;
