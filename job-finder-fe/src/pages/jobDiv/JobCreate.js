import '../css/create.css'
import 'animate.css';
import useJobCreate from '../../hooks/job/useJobCreate';

const JobCreate = () => {
    const {
        formState,
        isLoading,
        error,
        success,
        handleChange,
        handleSubmit,
    } = useJobCreate();

    return (
        <div className="create-container animate__animated animate__fadeIn">
            <h1 className="animate__animated animate__bounceIn">Create Job</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name company:</label>
                    <input
                        type="text"
                        name="nameCompany"
                        value={formState?.nameCompany || ''}
                        onChange={handleChange}
                        required
                        className="animate__animated animate__fadeIn"
                    />
                    {error && error.nameCompany && <p className="error-message">{error.nameCompany}</p>}
                </div>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={formState.title}
                        onChange={handleChange}
                        required
                        className="animate__animated animate__fadeIn"
                    />
                </div>
                <div>
                    <label>Location:</label>
                    <textarea
                        name="location"
                        value={formState.location}
                        onChange={handleChange}
                        required
                        className="animate__animated animate__fadeIn"
                    />
                </div>
                <div>
                    <label>Application Deadline:</label>
                    <input
                        type="date"
                        name="applicationDeadline"
                        value={formState.applicationDeadline}
                        onChange={handleChange}
                        required
                        className="animate__animated animate__fadeIn"
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        name="description"
                        value={formState.description}
                        onChange={handleChange}
                        required
                        className="animate__animated animate__fadeIn"
                    />
                </div>

                <label>
                    Language:
                    <select name="tag" value={formState.tag} onChange={handleChange} multiple>
                        <option value="JAVA">Java</option>
                        <option value="C">C</option>
                        <option value="C#">C#</option>
                    </select>
                </label>

                <label>
                    Employment type:
                    <select name="employmentType" value={formState.employmentType} onChange={handleChange} >
                        <option value="Full time">Full time</option>
                        <option value="Part time">Part time</option>
                        <option value="Remote">Remote</option>
                    </select>
                </label>

                <label>
                    Level:
                    <select name="level" value={formState.level} onChange={handleChange} >
                        <option value="Intern Developer">Intern Developer</option>
                        <option value="Fresher Developer">Fresher Developer</option>
                        <option value="Junior Developer">Junior Developer</option>
                        <option value="Senior Developer">Senior Developer</option>
                        <option value="Lead Developer">Lead Developer</option>
                    </select>
                </label>
                <div>
                    <label>Logo (image):</label>
                    <input
                        type="file"
                        name="file"
                        onChange={handleChange}
                        className="animate__animated animate__fadeIn"
                        accept="image/*"
                    />
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

export default JobCreate;