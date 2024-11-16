import "../css/JobView.css";
import "../css/SearchDiv.css";
import { AiOutlineSearch, AiOutlineCloseCircle } from "react-icons/ai";
import { BsHouseDoor } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";
import { BiTimeFive } from "react-icons/bi";
import React from 'react';
import useJobSearchMulti from "../../hooks/job/useJobSearchMulti";
import { useNavigate } from 'react-router-dom';

function UserDashboard() {
    const {
        jobs,
        imageUrlMap,
        search,
        handleChange,
        pageTotal,
        error,
        pageInput,
        previousPage,
        nextPage,
        goToPage,
        handlePageInputChange,
        goToInputPage,
    } = useJobSearchMulti(); // Sử dụng hook tìm kiếm việc làm

    // Xóa giá trị của ô tìm kiếm
    const handleClearInput = (inputName) => {
        handleChange({ target: { name: inputName, value: '' } });
    };

    const navigate = useNavigate();
    const role = localStorage.getItem('userRole') || 'GUEST'; // Lấy vai trò từ localStorage

    // Chuyển hướng khi nhấn vào mô tả công việc
    const handleDescriptionClick = (id) => {
        if (role === 'GUEST') {
            navigate('/login'); // Chuyển hướng sang trang login nếu là khách
        } else {
            navigate(`/jobDetail/${id}`); // Chuyển đến trang chi tiết nếu có quyền
        }
    };

    // Chuyển hướng khi nhấn nút "Apply Now"
    const handleApplyClick = (id) => {
        if (role === 'GUEST') {
            navigate('/login'); // Chuyển hướng sang trang login nếu là khách
        } else {
            navigate(`/apply/create/${id}`); // Chuyển đến trang tạo đơn ứng tuyển
        }
    };

    return (
        <div>
            {/* Search Section */}
            <div className="searchDiv">
                <form action="">
                    <div className="searchDiv-firstDiv">
                        {/* Tìm kiếm theo title */}
                        <div className="searchDiv-icons">
                            <AiOutlineSearch className="searchDiv-icon" />
                            <input
                                type="text"
                                className="searchDiv-input"
                                placeholder="Search Job title here ..."
                                name="title"
                                value={search.title === '%%' ? '' : search.title}
                                onChange={handleChange}
                            />
                            <AiOutlineCloseCircle
                                className="searchDiv-icon1"
                                onClick={() => handleClearInput('title')}
                            />
                        </div>
                        {/* Tìm kiếm theo nameCompany */}
                        <div className="searchDiv-icons">
                            <BsHouseDoor className="searchDiv-icon" />
                            <input
                                type="text"
                                className="searchDiv-input"
                                placeholder="Search Job by name company..."
                                name="nameCompany"
                                value={search.nameCompany === '%%' ? '' : search.nameCompany}
                                onChange={handleChange}
                            />
                            <AiOutlineCloseCircle
                                className="searchDiv-icon1"
                                onClick={() => handleClearInput('nameCompany')}
                            />
                        </div>
                        {/* Tìm kiếm theo location */}
                        <div className="searchDiv-icons">
                            <CiLocationOn className="searchDiv-icon" />
                            <input
                                type="text"
                                className="searchDiv-input"
                                placeholder="Search Job by Location ..."
                                name="location"
                                value={search.location === '%%' ? '' : search.location}
                                onChange={handleChange}
                            />
                            <AiOutlineCloseCircle
                                className="searchDiv-icon1"
                                onClick={() => handleClearInput('location')}
                            />
                        </div>
                        <button className="searchDiv-btn">Search</button>
                    </div>
                </form>

                <div className="searchDiv-search2">
                    {/* Dropdown tìm kiếm theo tag */}
                    <div className="searchDiv-singleSearch">
                        <label htmlFor="tag" className="searchDiv-label">Tag :</label>
                        <select name="tag" value={search.tag === '%%' ? '' : search.tag}
                            onChange={handleChange} className="searchDiv-select">
                            <option>Select Language</option>
                            <option value="JAVA">Java</option>
                            <option value="C">C</option>
                            <option value="C#">C#</option>
                        </select>
                    </div>
                    {/* Dropdown tìm kiếm theo level */}
                    <div className="searchDiv-singleSearch">
                        <label htmlFor="level" className="searchDiv-label">Level :</label>
                        <select name="level" value={search.level === '%%' ? '' : search.level}
                            onChange={handleChange} className="searchDiv-select">
                            <option>Select Level</option>
                            <option value="Intern Developer">Intern Developer</option>
                            <option value="Fresher Developer">Fresher Developer</option>
                            <option value="Junior Developer">Junior Developer</option>
                            <option value="Senior Developer">Senior Developer</option>
                            <option value="Lead Developer">Lead Developer</option>
                        </select>
                    </div>
                    {/* Dropdown tìm kiếm theo employment type */}
                    <div className="searchDiv-singleSearch">
                        <label htmlFor="employmentType" className="searchDiv-label">Type :</label>
                        <select name="employmentType" value={search.employmentType === '%%' ? '' : search.employmentType}
                            onChange={handleChange} className="searchDiv-select">
                            <option>Employment Type</option>
                            <option value="Full time">Full time</option>
                            <option value="Part time">Part time</option>
                            <option value="Remote">Remote</option>
                        </select>
                    </div>
                    <span className="searchDiv-span">Clear All</span>
                </div>
            </div>

            {/* Job Listing Section */}
            <div className="job">
                {jobs.map(({ id, nameCompany, description, imageUrl, title, tag, applicationDeadline, employmentType, level, location }) => (
                    <div className="groupDiv" key={id}>
                        <span className="groupSpan">
                            <h1 className="textH1">{title}</h1>
                            <span className="SpanDiv">
                                <BiTimeFive /> {applicationDeadline ? new Date(applicationDeadline).toLocaleDateString() : 'No deadline'}
                            </span>
                        </span>
                        <h6 className="textH6">Location: {location}</h6>
                        <h6 className="textH6">Language: {tag}</h6>
                        <h6 className="textH6">Level: {level}</h6>
                        <h6 className="textH6">Employment Type: {employmentType}</h6>
                        <hr className="line" />
                        <span
                            onClick={() => handleDescriptionClick(id)}
                            className="job-link"
                            style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
                        >
                            Click to see description
                        </span>
                        <div className="name">
                            {imageUrl ? (
                                <img
                                    src={imageUrlMap[id]}
                                    alt={imageUrl}
                                    className="logo"
                                />
                            ) : (
                                <p>No Image Available</p>
                            )}
                            <span className="SpanDiv1">{nameCompany || 'No Company'}</span>
                        </div>
                        <button className="jobDetail-btn">
                            <span onClick={() => handleApplyClick(id)} className="jobDetail-btn-link">
                                Apply Now
                            </span>
                        </button>
                    </div>
                ))}
            </div>

            {/* Pagination Section */}
            <div className="search-pagination">
                {/* First Page Button */}
                <button
                    className="search-button"
                    onClick={() => goToPage(0)}
                    disabled={search.page === 0}
                >
                    First
                </button>

                {/* Previous Page Button */}
                <button
                    className="search-button"
                    onClick={previousPage}
                    disabled={search.page === 0}
                >
                    Previous
                </button>

                {/* Page Numbers */}
                <div className="search-pageNumbers">
                    <button
                        className={`search-pageButton ${search.page === 0 ? 'active' : ''}`}
                        onClick={() => goToPage(0)}
                    >
                        1
                    </button>
                    {search.page > 1 && search.page < pageTotal - 2 && <span>...</span>}
                    {search.page > 0 && search.page < pageTotal - 1 && (
                        <button
                            className={`search-pageButton active`}
                            onClick={() => goToPage(search.page)}
                        >
                            {search.page + 1}
                        </button>
                    )}
                    {search.page < pageTotal - 2 && pageTotal > 3 && <span>...</span>}
                    {pageTotal > 1 && (
                        <button
                            className={`search-pageButton ${search.page === pageTotal - 1 ? 'active' : ''}`}
                            onClick={() => goToPage(pageTotal - 1)}
                        >
                            {pageTotal}
                        </button>
                    )}
                </div>

                {/* Next Page Button */}
                <button
                    className="search-button"
                    onClick={nextPage}
                    disabled={search.page === pageTotal - 1}
                >
                    Next
                </button>

                {/* Last Page Button */}
                <button
                    className="search-button"
                    onClick={() => goToPage(pageTotal - 1)}
                    disabled={search.page === pageTotal - 1}
                >
                    Last
                </button>
            </div>
        </div>
    );
}

export default UserDashboard;
