import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useJobUpdate from '../../hooks/job/useJobUpdate';
import '../css/update.css';

const JobUpdate = () => {
    const { id } = useParams(); // Lấy id từ URL
    const {
        formState,
        handleChange,
        updateJob,
        isLoading,
        error,
        success
    } = useJobUpdate();

    useEffect(() => {
        // Gán giá trị id vào formState
        handleChange({ target: { name: 'id', value: id } });
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateJob();
    };

    return (
        <div className="update-container">
            <h1>Update Job</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="nameCompany">Name company:</label>
                    <input
                        type="text"
                        id="nameCompany"
                        name="nameCompany"
                        value={formState.nameCompany}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formState.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="location">Location:</label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={formState.location}
                        onChange={handleChange}
                        required
                    />
                </div>
                <input
                    type="date"
                    id="applicationDeadline"
                    name="applicationDeadline"
                    value={formState.applicationDeadline}
                    onChange={handleChange}
                    required
                />
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formState.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="tag">Language</label>
                    <select
                        id="tag"
                        name="tag"
                        multiple
                        value={formState.tag}
                        onChange={handleChange}
                    >
                        <option value="JAVA">Java</option>
                        <option value="C">C</option>
                        <option value="C#">C#</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="employmentType">Employment Type</label>
                    <select
                        id="employmentType"
                        name="employmentType"
                        value={formState.employmentType}
                        onChange={handleChange}
                    >
                        <option value="Full time">Full time</option>
                        <option value="Part time">Part time</option>
                        <option value="Remote">Remote</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="level">Level</label>
                    <select
                        id="level"
                        name="level"
                        value={formState.level}
                        onChange={handleChange}
                    >
                        <option value="Intern Developer">Intern Developer</option>
                        <option value="Fresher Developer">Fresher Developer</option>
                        <option value="Junior Developer">Junior Developer</option>
                        <option value="Senior Developer">Senior Developer</option>
                        <option value="Lead Developer">Lead Developer</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="file">Logo (Image):</label>
                    <input
                        type="file"
                        id="file"
                        name="file"
                        accept="image/*"
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Loading...' : 'Update'}
                </button>
            </form>
            {error && <p className="error-message">An error occurred: {error}</p>}
            {success && <p style={{ color: 'green' }}>Job has been updated successfully!</p>}
        </div>
    );
};

export default JobUpdate;
