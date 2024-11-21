import React, { useState } from 'react';
import "../css/search.css";
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import useJobSearch from '../../hooks/job/useJobSearch';

const JobSearch = () => {
  const {
    jobs,
    imageUrlMap,
    search,
    pageTotal,
    error,
    pageInput,
    handleChange,
    handleDelete,
    handleImageDownload,
    previousPage,
    nextPage,
    goToPage,
    handlePageInputChange,
    goToInputPage,
  } = useJobSearch();

  // State quản lý trạng thái "xem thêm" của từng mô tả công việc
  const [expandedDescriptions, setExpandedDescriptions] = useState({});

  const toggleDescription = (id) => {
    setExpandedDescriptions((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  // Hàm cắt mô tả
  const truncateText = (text, length) => text.length > length ? text.substring(0, length) + "..." : text;

  return (
    <div className="search-body">
      <Link to="/">
        <FaHome size={60} className="userDetail-home-icon" />
      </Link>
      <h2 className="search-h2">Search</h2>

      {/* Separate Search Inputs */}
      <div>
        <input
          type="text"
          className="search-input"
          name="keyWord"
          placeholder="Find by name"
          value={search.keyWord === '%%' ? '' : search.keyWord}
          onChange={handleChange}
        />
      </div>
      {/* Jobs Table */}
      <table className="search-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Company</th>
            <th>Description</th>
            <th>Language</th>
            <th>Level</th>
            <th>Employment type</th>
            <th>Location</th>
            <th>Application Deadline</th>
            <th>Image</th>
            <th>User</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map(({ id, title, nameCompany, tag, location, description, applicationDeadline, employmentType, level, imageUrl, user }) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{title}</td>
              <td>{nameCompany}</td>
              <td>
                {expandedDescriptions[id] ? description || "" : truncateText(description || "", 50)}
                {(description && description.length > 50) && (
                  <button onClick={() => toggleDescription(id)} className="description-toggle">
                    {expandedDescriptions[id] ? "Ẩn bớt" : "Xem thêm"}
                  </button>
                )}
              </td>
              <td>{tag}</td>
              <td>{level}</td>
              <td>{employmentType}</td>
              <td>{location}</td>

              <td>{applicationDeadline}</td>
              <td>
                {imageUrl ? (
                  <img
                    src={imageUrlMap[id]}
                    alt={imageUrl}
                    style={{ maxWidth: '100px', height: 'auto' }}
                    onClick={() => handleImageDownload(imageUrl)}
                  />
                ) : (
                  'No Image'
                )}
              </td>
              <td>{user ? user.username : 'No User'}</td>
              <td>
                <button className="search-action-button">
                  <Link to={`/job/update/${id}`}>Update</Link>
                </button>
                <button className="search-action-button" onClick={() => handleDelete(id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Section */}
      <div className="search-pagination">
        <button className="search-button" onClick={() => goToPage(0)} disabled={search.page === 0}>First</button>
        <button className="search-button" onClick={previousPage} disabled={search.page === 0}>Previous</button>
        <div className="search-pageNumbers">
          {[...Array(pageTotal)].map((_, index) => (
            <button
              key={index}
              className={`search-pageButton ${search.page === index ? 'active' : ''}`}
              onClick={() => goToPage(index)}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <button className="search-button" onClick={nextPage} disabled={search.page + 1 >= pageTotal}>Next</button>
        <button className="search-button" onClick={() => goToPage(pageTotal - 1)} disabled={search.page + 1 >= pageTotal}>Last</button>
      </div>

      {/* Go-To Page Input */}
      <div className="search-goToPage" style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <input
          type="number"
          value={pageInput}
          onChange={handlePageInputChange}
          placeholder="Go to page"
        />
        <button className="search-button" onClick={goToInputPage}>Go</button>
      </div>

      {error && <div>Error: {error}</div>}
    </div>
  );
};

export default JobSearch;