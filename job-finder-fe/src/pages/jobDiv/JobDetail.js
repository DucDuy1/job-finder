import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { jobGetIdAPI, jobGetImageAPI, } from '../../service/jobService';
import '../css/jobDetail.css'
import '../css/comment.css'
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import useCommentCreate from '../../hooks/comment/useCommentCreate';
import { commentDeleteAPI, commentGetJobIdAPI } from '../../service/commentService';
import useCommentUpdate from '../../hooks/comment/useCommentUpdate';
import { format } from 'date-fns';
import { userGetImageAPI } from '../../service/userService';

const JobDetail = () => {
  const { id } = useParams();
  const [jobDetails, setJobDetails] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const currentUser = localStorage.getItem('username');
  const [isEditing, setIsEditing] = useState(false);
  const [comments, setComments] = useState([]);
  const [pageInput, setPageInput] = useState(1);
  const [pageTotal, setPageTotal] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  // Hook cho tạo comment
  const {
    formState: createFormState,
    isLoading: isCreating,
    error: createError,
    success: createSuccess,
    handleChange: handleCommentCreateChange,
    handleSubmit: handleCreateSubmit,
  } = useCommentCreate();

  // Hook cho tìm kiếm comment
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await commentGetJobIdAPI(id); // Gọi API với job ID
        if (response.listItems) {
          // Lấy danh sách comments ban đầu
          const commentsWithAvatars = await Promise.all(
            response.listItems.map(async (comment) => {
              try {
                const avatarBlob = await userGetImageAPI(comment.user.avatarUrl);
                const avatarUrl = URL.createObjectURL(avatarBlob);
                return { ...comment, user: { ...comment.user, avatarUrl } }; // Thêm URL blob vào comment
              } catch {
                console.error("Error fetching avatar for user:", comment.user.id);
                return { ...comment, user: { ...comment.user, avatarUrl: '/default-avatar.png' } }; // Avatar mặc định nếu lỗi
              }
            })
          );
          setComments(commentsWithAvatars); // Cập nhật danh sách comments với avatar
          setPageTotal(response.pageTotal || 1); // Cập nhật tổng số trang
          setCurrentPage(1); // Mặc định trang đầu tiên
        } else {
          console.error('Error fetching comments: No comments found');
        }
      } catch (error) {
        console.error('Failed to fetch comments:', error);
      }
    };
    fetchComments();
  }, [id, currentPage]);

  // Hook cho cập nhật comment
  const {
    formState: updateFormState,
    handleChange: handleCommentUpdateChange,
    updateComment,
    isLoading: isUpdating,
    error: updateError,
    success: updateSuccess,
  } = useCommentUpdate();

  // Lấy chi tiết công việc và hình ảnh
  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await jobGetIdAPI(id);
        if (response.code === '200') {
          const jobData = response.data;
          setJobDetails(jobData);
          handleCommentCreateChange({ target: { name: 'job.id', value: id } });

          if (jobData.imageUrl) {
            const imageData = await jobGetImageAPI(jobData.imageUrl);
            const imageObjectUrl = URL.createObjectURL(imageData);
            setImageUrl(imageObjectUrl);
          }
        } else {
          console.error('Error fetching job details:', response.message);
        }
      } catch (error) {
        console.error('Failed to fetch job details:', error);
      }
    };
    fetchJobDetails();
  }, [id]);

  // Xử lý xóa comment
  const handleDelete = async (commentId) => {
    try {
      await commentDeleteAPI(commentId);
      setComments((prevComments) => prevComments.filter((comment) => comment.id !== commentId));
    } catch (error) {
      console.error('Failed to delete comment:', error);
    }
  };

  // Xử lý cập nhật comment (set giá trị comment vào formState của update)
  const handleEdit = (comment) => {
    setIsEditing(true); // Kích hoạt chế độ chỉnh sửa
    handleCommentUpdateChange({ target: { name: 'id', value: comment.id } });
    handleCommentUpdateChange({ target: { name: 'content', value: comment.content } });
    handleCommentUpdateChange({ target: { name: 'user.username', value: comment.user.username } });
    handleCommentUpdateChange({ target: { name: 'job.id', value: id } });
  };

  // Sau khi cập nhật thành công, ẩn form cập nhật và hiện lại form tạo comment
  useEffect(() => {
    if (updateSuccess) {
      setIsEditing(false);
    }
  }, [updateSuccess]);

  if (!jobDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="job-details-background">
      <div className="job-details-container">
        {/* Thanh điều hướng */}
        <div className="jobDetail-navbar">
          <Link to="/" className="jobDetail-home-link">
            <FaHome size={24} className="jobDetail-home-icon" />
            <span className="jobDetail-home-text">Home</span>
          </Link>
        </div>

        {/* Thông tin chi tiết công việc */}
        <div className="job-details">
          {imageUrl && (
            <img src={imageUrl} alt={jobDetails.nameCompany || 'Job Logo'} className="job-logo" />
          )}
          <h1 className="job-title">{jobDetails.nameCompany || 'No title available'}</h1>
          <hr />
          <div className="detail-item">
            <strong>Title: </strong>
            <p>{jobDetails.title || 'No title available'}</p>
          </div>
          <hr />
          <div className="detail-item">
            <strong>Application Deadline:</strong>
            <p>{jobDetails.applicationDeadline || 'No deadline available'}</p>
          </div>
          <hr />
          <div className="detail-item">
            <strong>Location:</strong>
            <p>{jobDetails.location || 'No location available'}</p>
          </div>
          <hr />
          <div className="detail-item">
            <strong>Language:</strong>
            <p className="job-tag">{jobDetails.tag || 'No tag available'}</p>
          </div>
          <hr />
          <div className="detail-item">
            <strong>Level:</strong>
            <p className="job-tag">{jobDetails.level || 'No level available'}</p>
          </div>
          <hr />
          <div className="detail-item">
            <strong>Employment Type:</strong>
            <p className="job-tag">{jobDetails.employmentType || 'No employmentType available'}</p>
          </div>
          <hr />
          <div className="detail-item description">
            <strong>Description:</strong>
            <p>{jobDetails.description || 'No description available'}</p>
          </div>
          <button className="jobDetail-btn">
            <Link to={`/apply/create/${id}`} className="jobDetail-btn-link">
              Apply Now
            </Link>
          </button>
        </div>
      </div>

      {/* Form tạo bình luận */}
      <div className="comment-form-container">
        <h2>Create a Comment</h2>
        {!isEditing && (
          <form onSubmit={handleCreateSubmit} className="comment-form">
            <div className="comment-form-group">
              <label>Comment Content:</label>
              <textarea
                name="content"
                value={createFormState.content}
                onChange={handleCommentCreateChange}
                required
              />
            </div>
            <button type="submit" className="jobDetail-btn" disabled={isCreating}>
              {isCreating ? 'Submitting...' : 'Submit Comment'}
            </button>
            {createSuccess && <p className="success-message">Comment submitted successfully!</p>}
            {createError && <p className="error-message">Error: {createError}</p>}
          </form>
        )}
      </div>

      {/* Danh sách bình luận */}
      <div className="comment-list-container">
        <h2>Comments</h2>
        <ul className="comment-list">
          {comments.map((comment) => (
            <li key={comment.id} className="comment-item">
              <div className="comment-header">
                <img
                  src={comment.user.avatarUrl}
                  alt={`${comment.user.name}'s avatar`}
                  className="comment-avatar"
                />
                <div className="comment-user-info">
                  <strong className="comment-username">{comment.user.username || 'Anonymous'}</strong>
                  <div className="comment-createAt">
                    {format(new Date(comment.createAt), 'dd/MM/yyyy HH:mm')}
                  </div>
                </div>
              </div>

              <p className="comment-content">{comment.content}</p>

              {currentUser === comment.user.username && (
                <div className="comment-actions">
                  <button className="comment-btn" onClick={() => handleEdit(comment)}>
                    Update
                  </button>
                  <button className="comment-btn" onClick={() => handleDelete(comment.id)}>
                    Delete
                  </button>
                </div>
              )}

              {/* Hiển thị form chỉnh sửa ngay bên dưới comment khi người dùng nhấn nút Update */}
              {isEditing && updateFormState.id === comment.id && (
                <div className="comment-update-form">
                  <form onSubmit={updateComment} className="comment-form">
                    <div className="comment-form-group">
                      <label>Update Content:</label>
                      <textarea
                        name="content"
                        value={updateFormState.content}
                        onChange={handleCommentUpdateChange}
                        required
                      />
                    </div>
                    <div className="comment-update-actions">
                      <button type="submit" className="jobDetail-btn" disabled={isUpdating}>
                        {isUpdating ? 'Updating...' : 'Save'}
                      </button>
                      <button
                        type="button"
                        className="comment-btn cancel-btn"
                        onClick={() => setIsEditing(false)}
                      >
                        Cancel
                      </button>
                    </div>
                    {updateSuccess && <p className="success-message">Comment updated successfully!</p>}
                    {updateError && <p className="error-message">Error: {updateError}</p>}
                  </form>
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* Phân trang */}
        <div className="comment-pagination">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {pageTotal}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(pageTotal, prev + 1))}
            disabled={currentPage === pageTotal}
          >
            Next
          </button>
        </div>
        <div className="go-to-page">
          <input
            type="number"
            value={pageInput}
            onChange={(e) => setPageInput(Number(e.target.value))}
            placeholder="Go to page"
          />
          <button onClick={() => setCurrentPage(pageInput)}>Go</button>
        </div>
      </div>
    </div>
  );
};
export default JobDetail;