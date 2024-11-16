import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/jobUserApply.css';
import { userGetImageAPI } from '../../service/userService';
import { FaHome } from 'react-icons/fa';
import { jobGetUserIdAPI } from '../../service/jobService';

const MemberCreateListJob = () => {
    const userId = localStorage.getItem('id');
    const [createdJobs, setCreatedJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const PAGE_SIZE = 10;
    const [jobImages, setJobImages] = useState({});

    const fetchImageUrl = async (imageUrl) => {
        try {
            const imageBlob = await userGetImageAPI(imageUrl);
            return URL.createObjectURL(imageBlob);
        } catch (err) {
            console.error('Failed to load image:', err);
            return '';
        }
    };

    useEffect(() => {
        const fetchCreatedJobs = async () => {
            try {
                const response = await jobGetUserIdAPI(userId);
                const jobs = response.listItems || [];
                setCreatedJobs(jobs);
                setTotalPages(Math.ceil(jobs.length / PAGE_SIZE));

                const imagePromises = jobs.map(async (job) => {
                    if (job.imageUrl) {
                        const imageUrl = await fetchImageUrl(job.imageUrl);
                        return { id: job.id, imageUrl };
                    }
                    return { id: job.id, imageUrl: '' };
                });

                const images = await Promise.all(imagePromises);
                const imageMap = images.reduce((acc, { id, imageUrl }) => {
                    acc[id] = imageUrl;
                    return acc;
                }, {});

                setJobImages(imageMap);
            } catch (err) {
                setError(err.message || 'Failed to load created jobs');
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchCreatedJobs();
        } else {
            setLoading(false);
            setError('User ID not found');
        }
    }, [userId]);

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

                        <div className="job-user-apply-details">
                            {jobImages[job.id] && (
                                <img
                                    src={jobImages[job.id]}
                                    alt={job.name || 'Job Logo'}
                                    className="job-user-apply-logo"
                                />
                            )}

                            <h1 className="job-user-apply-title">{job.name || 'No title available'}</h1>
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
                            </div>

            ))
            ) : (
            <p className="job-user-apply-no-jobs">No jobs created yet.</p>
                )}
        </div>

            {/* Pagination */ }
    <div className="pagination">
        <button onClick={() => handlePageChange(-1)} disabled={currentPage === 1}>
            Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={() => handlePageChange(1)} disabled={currentPage === totalPages}>
            Next
        </button>
    </div>
        </div >
    );
};

export default MemberCreateListJob;