import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function MemberDashboard() {
    const [selectedOption, setSelectedOption] = useState('');
    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <div>
            <h1 className="adminDashboard-welcome-header">Welcome Member Dashboard</h1>
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
                        <option value="user">Staticfis User</option>
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
                            <Link to="/member-create-listjob" className="adminDashboard-list-group-item adminDashboard-list-group-item-action adminDashboard-list-group-item-primary">
                                Member Create ListJob
                            </Link>
                        </li>
                        <li>
                            <Link to="/member-applicants" className="adminDashboard-list-group-item adminDashboard-list-group-item-action adminDashboard-list-group-item-info">
                                Member ApplicantList
                            </Link>
                        </li>
                    </>
                )}
                {selectedOption === 'user' && (
                    <>
                        <li>
                            <Link to="/user-apply-stats" className="adminDashboard-list-group-item adminDashboard-list-group-item-action adminDashboard-list-group-item-primary">
                                staticfis User
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </div>
    );
}

export default MemberDashboard;