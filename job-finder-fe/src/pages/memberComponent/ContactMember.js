import React from "react";
import '../css/adminContactInfo.css';
import {
    FaBriefcase, FaUserFriends, FaFileAlt,
    FaUsers, FaSearch, FaClock, FaDollarSign,
    FaEnvelope, FaPhone, FaUser
} from 'react-icons/fa';

const ContactMember = () => {
    const handleContact = () => {
        window.location.href = "mailto:admin@example.com";
    };

    return (
        <div className="adminContactInfo-wrapper">
            <div className="adminContactInfo-page">
                <header className="adminContactInfo-header">
                    <h1>CONNECT WITH OUR RECRUITMENT SUPPORT TEAM</h1>
                </header>

                <div className="adminContactInfo-description">
                    <h3 className="description-title">Recruiting IT Talents in Vietnam with JobFinder</h3>
                    <p className="description-text">
                        With our deep understanding of the IT industry and specialized skills,
                        we can help you reach and recruit the best IT candidates.
                    </p>
                </div>

                <div className="adminContactInfo-jobFinder">
                    <h2>What makes the difference in JobFinder?</h2>
                    <div className="adminContactInfo-statistics">
                        <div className="adminContactInfo-statistic">
                            <FaBriefcase size={40} className="icon" />
                            <h3>10,000+</h3>
                            <p>Companies and Businesses IT</p>
                        </div>
                        <div className="adminContactInfo-statistic">
                            <FaFileAlt size={40} className="icon" />
                            <h3>1,500,000+</h3>
                            <p>Profile sent to Recruiter</p>
                        </div>
                        <div className="adminContactInfo-statistic">
                            <FaUserFriends size={40} className="icon" />
                            <h3>300,000+</h3>
                            <p>Highly Experienced Candidate Profile</p>
                        </div>
                    </div>
                </div>

                <div className="adminContactInfo-premium-service">
                    <h1 className="adminContactInfo-premium-service-title">
                        High Quality Services For IT Recruiters
                    </h1>

                    <div className="adminContactInfo-premium-service-content">
                        <div className="adminContactInfo-content-wrapper">
                            <div className="adminContactInfo-posting-section">
                                <h2>Post a job advertisement</h2>
                                <p>
                                    Post IT job vacancies, easily manage candidate profiles with intuitive interface,
                                    support team, and powerful tools from JobFinder.
                                </p>

                                <div className="adminContactInfo-service-features">
                                    <div className="adminContactInfo-feature-item">
                                        <FaUsers size={40} className="adminContactInfo-feature-icon" />
                                        <p>Increase your chances of accessing quality IT candidates from ITviec</p>
                                    </div>

                                    <div className="adminContactInfo-feature-item">
                                        <FaSearch size={40} className="adminContactInfo-feature-icon" />
                                        <p>Attract candidates with the right IT skills</p>
                                    </div>
                                </div>
                            </div>

                            <div className="adminContactInfo-job-cards">
                                <div className="adminContactInfo-job-card adminContactInfo-hot">
                                    <span className="adminContactInfo-badge">HOT</span>
                                    <h3>UX/UI Designer</h3>
                                </div>

                                <div className="adminContactInfo-job-card adminContactInfo-superhot">
                                    <span className="adminContactInfo-badge">SUPER HOT</span>
                                    <h3>Full-stack Developer</h3>
                                </div>

                                <div className="adminContactInfo-job-card adminContactInfo-new">
                                    <span className="adminContactInfo-badge">NEW FOR YOU</span>
                                    <h3>Business Analyst</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="adminContactInfo-info">
                    <div className="adminContactInfo-contact-section">
                        <div className="adminContactInfo-contact-header">
                            <h2>Contact Information</h2>
                        </div>
                        <div className="adminContactInfo-contact-bar">
                            <div className="adminContactInfo-contact-item">
                                <FaBriefcase className="icon" />
                                <p>Contact us to register as an employer</p>
                            </div>
                            <div className="adminContactInfo-contact-item">
                                <FaUser className="icon" />
                                <p>Do Duc Duy</p>
                            </div>
                            <div className="adminContactInfo-contact-item">
                                <FaEnvelope className="icon" />
                                <p>Email: <a href="mailto:admin@example.com">admin@example.com</a></p>
                            </div>
                            <div className="adminContactInfo-contact-item">
                                <FaPhone className="icon" />
                                <p>SĐT: 0123 456 789</p>
                            </div>

                            <button
                                className="adminContactInfo-contactButton"
                                onClick={handleContact}
                            >
                                Contact by Email
                            </button>
                        </div>
                    </div>
                </div>

                <footer className="adminContactInfo-footer">
                    <p>
                        Design by Duy &copy;
                        2024 Recruitment Company|
                        <a href="#">Terms of Service</a> |
                        <a href="#">Privacy Policy</a>
                    </p>
                </footer>
            </div>
        </div>
    );
};

export default ContactMember;
