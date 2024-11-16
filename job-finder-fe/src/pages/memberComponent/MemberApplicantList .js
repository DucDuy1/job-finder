import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/userApplyJob.css';
import { userGetImageAPI } from '../../service/userService';
import { FaHome } from 'react-icons/fa';
import { jobGetUserIdAPI } from '../../service/jobService';
import { applyGetJobIdAPI, applyDownloadAPI } from '../../service/applyService';

const MemberApplicantList  = () => {
    const userId = localStorage.getItem('id');
    const [createdJobs, setCreatedJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const PAGE_SIZE = 10;
    const [jobImages, setJobImages] = useState({});
    const [applicants, setApplicants] = useState({});
    const [applicantAvatars, setApplicantAvatars] = useState({});

    const handleDownloadCV = async (fileCV) => {
        try {
            const blob = await applyDownloadAPI(fileCV);
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'CV.pdf'; // Tên file tải xuống
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Failed to download CV:', error);
        }
    };

    const fetchImageUrl = async (imageUrl) => {
        try {
            const imageBlob = await userGetImageAPI(imageUrl);
            return URL.createObjectURL(imageBlob);
        } catch (err) {
            console.error('Failed to load image:', err);
            return '';
        }
    };

    const fetchApplicantAvatar = async (userId) => {
        try {
            const avatarUrl = await userGetImageAPI(userId);
            return URL.createObjectURL(avatarUrl);
        } catch (err) {
            console.error('Failed to load avatar:', err);
            return '';
        }
    };

    const fetchApplicantsForJob = async (jobId) => {
        try {
            const response = await applyGetJobIdAPI(jobId);
            const applicantsList = response.listItems || [];

            // Fetch avatars for each applicant
            const avatarPromises = applicantsList.map(async (applicant) => {
                const avatarUrl = await fetchApplicantAvatar(applicant.user.avatarUrl);
                return { userId: applicant.user.id, avatarUrl };
            });

            const avatars = await Promise.all(avatarPromises);
            const avatarMap = avatars.reduce((acc, { userId, avatarUrl }) => {
                acc[userId] = avatarUrl;
                return acc;
            }, {});

            setApplicantAvatars((prevAvatars) => ({ ...prevAvatars, ...avatarMap }));
            return applicantsList;
        } catch (err) {
            console.error(`Failed to load applicants for job ${jobId}:`, err);
            return [];
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

                const applicantPromises = jobs.map(async (job) => {
                    const applicantsForJob = await fetchApplicantsForJob(job.id);
                    return { jobId: job.id, applicants: applicantsForJob };
                });

                const applicantsData = await Promise.all(applicantPromises);
                const applicantsMap = applicantsData.reduce((acc, { jobId, applicants }) => {
                    acc[jobId] = applicants;
                    return acc;
                }, {});

                setApplicants(applicantsMap);

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
        <div className="user-apply-job">
            <h1 className="user-apply-job-h1">List of Created Jobs</h1>
            <div className="jobDetail-navbar">
                <Link to="/" className="jobDetail-home-link">
                    <FaHome size={24} className="jobDetail-home-icon" />
                    <span className="jobDetail-home-text">Home</span>
                </Link>
            </div>
            <div className="user-apply-job-container">
                {currentJobs.length > 0 ? (
                    currentJobs.map((job) => (
                        <div className="user-apply-job-details" key={job.id}>
                            <div className="job-info">
                                {jobImages[job.id] && (
                                    <img
                                        src={jobImages[job.id]}
                                        alt={job.name || 'Job Logo'}
                                        className="user-apply-job-logo"
                                    />
                                )}
                                
                                <h1 className="user-apply-job-title">{job.name || 'No title available'}</h1>
                            </div>
                            <Link to={`/jobDetail/${job.id}`} className="job-link">
                                    <p className="textP">Click to see description</p>
                                </Link>
                            <hr className="divider" />

                            <div className="job-applicants">
                                {applicants[job.id] && applicants[job.id].length > 0 ? (
                                    applicants[job.id].map((applicant) => (
                                        <div key={applicant.user.id} className="applicant">
                                            <img
                                                src={applicantAvatars[applicant.user.id] || ''}
                                                alt={applicant.user.username}
                                                className="user-apply-applicant-logo"
                                            />
                                            <div className="applicant-info">
                                                <p><strong>{applicant.user.username}</strong></p>
                                                <button onClick={() => handleDownloadCV(applicant.fileCV)}>Download CV</button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>No applicants for this job.</p>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="user-apply-job-no-jobs">No jobs created yet.</p>
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

export default MemberApplicantList;
