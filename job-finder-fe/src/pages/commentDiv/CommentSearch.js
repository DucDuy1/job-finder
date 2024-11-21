import React from 'react';
import "../css/search.css";
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import useCommentSearch from '../../hooks/comment/useCommentSearch';
import { format } from 'date-fns';

const CommentSearch = () => {
  const {
    comments,
    search,
    pageTotal,
    error,
    pageInput,
    handleChange,
    handleDelete,
    previousPage,
    nextPage,
    goToPage,
    handlePageInputChange,
    goToInputPage,
  } = useCommentSearch();  // Sử dụng hook

  return (
    <div className="search-body">
        <Link to="/">
        <FaHome size={60} className="userDetail-home-icon" />
      </Link>
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
            <th>content</th>
            <th>createAt</th>
            <th>user</th>
            <th>job</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {comments.map(({ id, content, createAt, user, job }) => (

            <tr key={id}>
              <td>{id}</td>
              <td>{content}</td>
              <td>{format(new Date(createAt), 'yyyy-MM-dd HH:mm:ss')}</td>
              <td>{user.username}</td>
              <td>{job.id}</td>
              <td>
                <button className="search-action-button">
                  <Link to={`/comment/update/${id}`}>
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

export default CommentSearch;
