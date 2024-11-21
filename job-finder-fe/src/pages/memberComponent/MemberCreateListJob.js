import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import '../css/jobUserApply.css';
import useMemberCreatedJobs from '../../hooks/member/useMemberCreatedJobs';

const MemberCreateListJob = () => {
    const userId = localStorage.getItem('id');
    const { createdJobs, loading, error, jobImages, totalPages, handleDelete, PAGE_SIZE } = useMemberCreatedJobs(userId);

    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (direction) => {
        setCurrentPage((prev) => Math.min(Math.max(prev + direction, 1), totalPages));
    };

    if (loading) return <div className="job-user-apply-loading">Loading...</div>;
    if (error) return <div className="job-user-apply-error">{error}</div>;

    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const currentJobs = createdJobs.slice(startIndex, startIndex + PAGE_SIZE);

    return (
        <div className="job-user-apply">
            <h1 className="job-user-apply-h1">List of Created Jobs</h1>
            <div className="jobDetail-navbar">
                <Link to="/" className="jobDetail-home-link">
                    <FaHome size={24} className="jobDetail-home-icon" />
                    <span className="jobDetail-home-text">Home</span>
                </Link>
            </div>

            <div className="job-user-apply-container">
                {currentJobs.length > 0 ? (
                    currentJobs.map((job) => (
                        <div key={job.id} className="job-user-apply-details">
                            {jobImages[job.id] && (
                                <img
                                    src={jobImages[job.id]}
                                    alt={job.name || 'Job Logo'}
                                    className="job-user-apply-logo"
                                />
                            )}
                            <h1 className="job-user-apply-title">{job.nameCompany || 'No company available'}</h1>
                            <hr />
                            <div className="job-user-apply-item">
                                <strong>Title:</strong>
                                <p>{job.title || 'No title available'}</p>
                            </div>
                            <hr />
                            <div className="job-user-apply-item">
                                <strong>Application Deadline:</strong>
                                <p>{job.applicationDeadline || 'No deadline available'}</p>
                            </div>
                            <hr />
                            <div className="job-user-apply-item">
                                <strong>Location:</strong>
                                <p>{job.location || 'No location available'}</p>
                            </div>
                            <hr />
                            <div className="job-user-apply-item">
                                <strong>Language:</strong>
                                <p className="job-user-apply-tag">{job.tag || 'No tag available'}</p>
                            </div>
                            <div className="job-user-apply-item">
                                <strong>Level:</strong>
                                <p className="job-user-apply-tag">{job.level || 'No level available'}</p>
                            </div>
                            <div className="job-user-apply-item">
                                <strong>Employment Type:</strong>
                                <p className="job-user-apply-tag">{job.employmentType || 'No employmentType available'}</p>
                            </div>
                            <hr />
                            <div className="job-user-apply-item job-user-apply-description">
                                <strong>Description:</strong>
                                <p>{job.description || 'No description available'}</p>
                                <Link to={`/jobDetail/${job.id}`} key={job.id} className="job-user-apply-details-link">
                                    Click to go description
                                </Link>

                            </div>
                            <hr />
                                <Link className="job-user-apply-button" to={`/job/update/${job.id}`}>Update</Link>
                            <button className="job-user-apply-button" onClick={() => handleDelete(job.id)}>Delete</button>
                        </div>
                    ))
                ) : (
                    <p className="job-user-apply-no-jobs">No jobs created yet.</p>
                )}
            </div>

            {/* Pagination */}
            <div className="pagination">
                <button onClick={() => handlePageChange(-1)} disabled={currentPage === 1}>
                    Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button onClick={() => handlePageChange(1)} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default MemberCreateListJob;
