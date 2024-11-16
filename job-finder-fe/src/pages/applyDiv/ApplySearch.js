import React from 'react';
import "../css/search.css";
import { Link } from 'react-router-dom';
import useApplySearch from '../../hooks/apply/useApplySearch';

const ApplySearch = () => {
  const {
    applys,
    fileCVUrlMap,
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
  } = useApplySearch();  // Sử dụng hook

  return (
    <div className="search-body">
      <h2 className="search-h2">Search</h2>
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
      <table className="search-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>username</th>
            <th>job</th>
            <th>File</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {applys.map(({ id, user, job, fileCV }) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{user.username}</td>
              <td>{job.id}</td>
              <td>
                {fileCVUrlMap[id] ? (
                  <a
                    href={fileCVUrlMap[id]}
                    download={fileCV}
                    style={{ textDecoration: 'underline', color: 'blue', cursor: 'pointer' }}
                  >
                    Download File
                  </a>
                ) : (
                  'No File'
                )}
              </td>
              <td>
                <button className="search-action-button">
                  <Link to={`/apply/update/${id}`}>
                    Update
                  </Link>
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

export default ApplySearch;
