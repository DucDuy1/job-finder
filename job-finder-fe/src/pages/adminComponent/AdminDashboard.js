import React, { useState } from 'react';
import './AdminDashboard.css';
import { Link } from 'react-router-dom';

function AdminDashboard() {
    const [selectedOption, setSelectedOption] = useState('');
    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <div>
            <h1 className="adminDashboard-welcome-header">Welcome Admin Dashboard</h1>
            <ul className="adminDashboard-ul list-group">
                <li>
                    <label htmlFor="main-select" className="adminDashboard-manage-header">Manage: </label>
                    <select
                        id="main-select"
                        className="adminDashboard-select"
                        value={selectedOption}
                        onChange={handleSelectChange}
                    >
                        <option value="">Select Option</option>
                        <option value="job">Job</option>
                        <option value="user">User</option>
                        <option value="comment">Comment</option>
                        <option value="apply">Apply</option>
                    </select>
                </li>
                {selectedOption === 'job' && (
                    <>
                        <li>
                            <Link to="/job/create" className="adminDashboard-list-group-item adminDashboard-list-group-item-action adminDashboard-list-group-item-success">
                                Create Job
                            </Link>
                        </li>
                        <li>
                            <Link to="/job/search" className="adminDashboard-list-group-item adminDashboard-list-group-item-action adminDashboard-list-group-item-primary">
                                Search Job
                            </Link>
                        </li>
                        <li>
                            <Link to="/job/list" className="adminDashboard-list-group-item adminDashboard-list-group-item-action adminDashboard-list-group-item-info">
                                List Job
                            </Link>
                        </li>
                    </>
                )}
                {selectedOption === 'user' && (
                    <>
                        <li>
                            <Link to="/user/create" className="adminDashboard-list-group-item adminDashboard-list-group-item-action adminDashboard-list-group-item-primary">
                                Create User
                            </Link>
                        </li>
                        <li>
                            <Link to="/user/search" className="adminDashboard-list-group-item adminDashboard-list-group-item-action adminDashboard-list-group-item-primary">
                                Search User
                            </Link>
                        </li>
                    </>
                )}
                {selectedOption === 'comment' && (
                    <>
                        <li>
                            <Link to="/comment/search" className="adminDashboard-list-group-item adminDashboard-list-group-item-action adminDashboard-list-group-item-primary">
                                Search Comment
                            </Link>
                        </li>
                    </>
                )}
                 {selectedOption === 'apply' && (
                    <>
                        <li>
                            <Link to="/apply/search" className="adminDashboard-list-group-item adminDashboard-list-group-item-action adminDashboard-list-group-item-primary">
                                Search Apply
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </div>
    );
}

export default AdminDashboard;