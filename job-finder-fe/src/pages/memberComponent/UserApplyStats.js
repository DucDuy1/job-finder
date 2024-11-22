import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { statisticsUserAPI } from '../../service/statisticsService';
import '../css/userApplyStats.css';

const UserApplyStats = ({ jobId }) => {
    const [jobStatistics, setJobStatistics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStatistics = async () => {
            try {
                setLoading(true);
                setError(null);

                // Lấy userId từ localStorage để lấy thống kê công việc của member hiện tại
                const userId = localStorage.getItem("userId");

                const formData = new FormData();
                formData.append("userId", userId);

                const data = await statisticsUserAPI(formData);
                setJobStatistics(data); // Giả định API trả về danh sách job với jobId và countUserApply
            } catch (err) {
                setError("can't load statistics.");
            } finally {
                setLoading(false);
            }
        };

        fetchStatistics();
    }, []);

    if (loading) return <p>Loading statistic...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div class="userApplyStats-container">
             <div className="jobDetail-navbar">
                <Link to="/" className="jobDetail-home-link">
                    <FaHome size={24} className="jobDetail-home-icon" />
                    <span className="jobDetail-home-text">Home</span>
                </Link>
            </div>
        <h3 class="userApplyStats-title">Statistics work</h3>
        {jobStatistics.length > 0 ? (
            jobStatistics.map((job) => (
                <div key={job.jobId} class="userApplyStats-jobItem">
                    <p class="userApplyStats-jobId">Title job: {job.title}</p>
                    <p class="userApplyStats-applicantCount">Number CV apply: {job.countUserApply}</p>
                </div>
            ))
        ) : (
            <p class="userApplyStats-noJobs">No result</p>
        )}
    </div>
    );
};

export default UserApplyStats;
