import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { applyGetUserIdAPI } from '../../service/applyService';
import { FaHome } from 'react-icons/fa';
import '../css/jobUserApply.css';
import { userGetImageAPI } from '../../service/userService';

const UserAppliedJobs = () => {
    const userId = localStorage.getItem('id');
    const [appliedJobs, setAppliedJobs] = useState([]);
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
        const fetchAppliedJobs = async () => {
            try {
                const response = await applyGetUserIdAPI(userId);
                const jobs = response.listItems || [];
                setAppliedJobs(jobs);
                setTotalPages(Math.ceil(jobs.length / PAGE_SIZE));

                const imagePromises = jobs.map(async (item) => {
                    if (item.job.imageUrl) {
                        const imageUrl = await fetchImageUrl(item.job.imageUrl);
                        return { id: item.job.id, imageUrl };
                    }
                    return { id: item.job.id, imageUrl: '' };
                });

                const images = await Promise.all(imagePromises);
                const imageMap = images.reduce((acc, { id, imageUrl }) => {
                    acc[id] = imageUrl;
                    return acc;
                }, {});

                setJobImages(imageMap);
            } catch (err) {
                setError(err.message || 'Failed to load applied jobs');
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchAppliedJobs();
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
    const currentJobs = appliedJobs.slice(startIndex, startIndex + PAGE_SIZE);

    return (
        <div className="job-user-apply">
            <h1 className="job-user-apply-h1">List of Applied Jobs</h1>
            <div className="jobDetail-navbar">
                <Link to="/" className="jobDetail-home-link">
                    <FaHome size={24} className="jobDetail-home-icon" />
                    <span className="jobDetail-home-text">Home</span>
                </Link>
            </div>

            <div className="job-user-apply-container">
                {currentJobs.length > 0 ? (
                    currentJobs.map((item) => (
                        <div key={item.job.id} className="job-user-apply-details">
                            {jobImages[item.job.id] && (
                                <img
                                    src={jobImages[item.job.id]}
                                    alt={item.job.name || 'Job Logo'}
                                    className="job-user-apply-logo"
                                />
                            )}

                            <h1 className="job-user-apply-title">{item.job.name || 'No title available'}</h1>
                            <hr />
                            <div className="job-user-apply-item">
                                <strong>Title:</strong>
                                <p>{item.job.title || 'No title available'}</p>
                            </div>
                            <hr />
                            <div className="job-user-apply-item">
                                <strong>Application Deadline:</strong>
                                <p>{item.job.applicationDeadline || 'No deadline available'}</p>
                            </div>
                            <hr />
                            <div className="job-user-apply-item">
                                <strong>Location:</strong>
                                <p>{item.job.location || 'No location available'}</p>
                            </div>
                            <hr />
                            <div className="job-user-apply-item">
                                <strong>Language:</strong>
                                <p className="job-user-apply-tag">{item.job.tag || 'No tag available'}</p>
                            </div>
                            <div className="job-user-apply-item">
                                <strong>Level:</strong>
                                <p className="job-user-apply-tag">{item.job.level || 'No level available'}</p>
                            </div>
                            <div className="job-user-apply-item">
                                <strong>Employment Type:</strong>
                                <p className="job-user-apply-tag">{item.job.employmentType || 'No employmentType available'}</p>
                            </div>
                            <hr />
                            <div className="job-user-apply-item job-user-apply-description">
                                <strong>Description:</strong>
                                <p>{item.job.description || 'No description available'}</p>
                                <Link to={`/jobDetail/${item.job.id}`} className="job-user-apply-details-link">
                                    Click to go description
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="job-user-apply-no-jobs">No jobs applied to yet.</p>
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

export default UserAppliedJobs;
