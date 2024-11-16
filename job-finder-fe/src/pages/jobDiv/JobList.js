import React from 'react';
import "../css/jobList.css";
import useJobList from '../../hooks/job/useJobList';
import { Link } from 'react-router-dom';

const JobList = () => {
  const { jobs, loading, error, handleDelete, imageUrlMap, pageInput, previousPage, nextPage, goToInputPage, handlePageInputChange, pageTotal, search, goToPage } = useJobList();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {/* Header */}
      <header className="job-list__header">
        <Link to="/" className="job-list__home-button">Home</Link>
        <h1 className="job-list__title">List Job</h1>
      </header>

      <table className="job-list__table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Image</th>
            <th>Title</th>
            <th>Description</th>
            <th>Location</th>
            <th>Deadline</th>
            <th>Posted By</th>
            <th>Tag</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.id} className="job-list__row">
              <td>{job.id}</td>
              <td>
                {imageUrlMap[job.id] ? (
                  <img
                    src={imageUrlMap[job.id]}
                    alt={job.name}
                    className="job-list__image"
                  />
                ) : (
                  'No Image'
                )}
              </td>
              <td>{job.title}</td>
              <td>{job.description}</td>
              <td>{job.location}</td>
              <td>
                {job.applicationDeadline
                  ? new Date(job.applicationDeadline).toLocaleDateString()
                  : 'N/A'}
              </td>
              <td>{job.user?.name}</td>
              <td>{job.tag}</td>
              <td>
                <button className="job-list__update-button">
                  <Link to={`/job/update/${job.id}`}>Update</Link>
                </button>
                <button
                  onClick={() => handleDelete(job.id)}
                  className="job-list__delete-button"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination controls */}
      <div className="job-list-pagination-controls">
        <button onClick={previousPage} className="job-list-pagination-button" disabled={search.page <= 0}>Previous</button>
        
        {/* Current Page Indicator */}
        <span className="job-list-pagination-page-indicator">
          {Array.from({ length: pageTotal }, (_, index) => (
            <button
              key={index}
              className={`job-list-pagination-page-button ${index === search.page ? 'active' : ''}`}
              onClick={() => goToPage(index)} // Sử dụng goToPage từ hook
            >
              {index + 1}
            </button>
          ))}
        </span>

        <button onClick={nextPage} className="job-list-pagination-button" disabled={search.page >= pageTotal - 1}>Next</button>
      </div>

      {/* Current page input */}
      <div className="job-list-pagination-input">
        <input
          type="number"
          value={pageInput}
          onChange={handlePageInputChange}
          placeholder="Go to page..."
        />
        <button onClick={goToInputPage} className="job-list-pagination-button">Go</button>
      </div>
    </div>
  );
};

export default JobList;