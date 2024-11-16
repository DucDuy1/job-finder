import useCommentCreate from '../../hooks/comment/useCommentCreate';
import '../css/create.css'
import 'animate.css';

const CommentCreate = () => {
    const {
        formState,
        isLoading,
        error,
        success,
        handleChange,
        handleSubmit,
    } = useCommentCreate();

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
                    <label>content:</label>
                    <input
                        type="text"
                        name="content"
                        value={formState.content}
                        onChange={handleChange}
                        required
                        className="animate__animated animate__fadeIn"
                    />
                </div>
                <div>
                    <label>username:</label>
                    <input
                        type="text"
                        name="user.username"
                        value={formState.user.username}
                        onChange={handleChange}
                        required
                        className="animate__animated animate__fadeIn"
                    />
                </div>
                <div>
                    <label>Job:</label>
                    <input
                        type="text" // Changed to email type for validation
                        name="job.id"
                        value={formState.job.id}
                        onChange={handleChange}
                        required
                        className="animate__animated animate__fadeIn"
                    />
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
                        Comment created successfully!
                    </p>
                )}
            </form>
        </div>
    );
};

export default CommentCreate;
