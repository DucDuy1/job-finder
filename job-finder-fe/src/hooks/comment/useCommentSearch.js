import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { commentDeleteAPI, commentSearchAPI } from '../../service/commentService';

const useCommentSearch = () => {
  const [search, setSearch] = useState({
    keyWord: "%%",
    size: 2,
    page: 0,
  });
  const [comments, setComments] = useState([]);
  const [pageTotal, setPageTotal] = useState(0);
  const [error, setError] = useState(null);
  const [pageInput, setPageInput] = useState('');

  const navigate = useNavigate();  // Khai báo useNavigate

  useEffect(() => {
    const timeout = setTimeout(() => {
      find();
    }, 500);
    return () => clearTimeout(timeout);
  }, [search]);

  const find = async () => {
    const searchParams = {
      keyWord: search.keyWord,
      size: search.size,
      page: search.page,
    };
    try {
      const response = await commentSearchAPI(searchParams);
      setComments(response.listItems);
      setPageTotal(response.pageTotal);
    } catch (error) {
      console.error("Error:", error);
      setError(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await commentDeleteAPI(id);
      find();
      navigate('/comment/search');
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const previousPage = () => {
    let page = search.page - 1;
    page = page < 0 ? 0 : page;
    setSearch({ ...search, page });
  };

  const nextPage = () => {
    let page = search.page + 1;
    if (page < pageTotal) {
      setSearch({ ...search, page });
    }
  };

  const goToPage = (pageIndex) => {
    setSearch({ ...search, page: pageIndex });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearch((prev) => ({
      ...prev,
      [name]: value === '' ? '%%' : value,
    }));
  };

  const handlePageInputChange = (e) => {
    setPageInput(e.target.value);
  };

  const goToInputPage = () => {
    const pageIndex = parseInt(pageInput, 10) - 1;
    if (pageIndex >= 0 && pageIndex < pageTotal) {
      goToPage(pageIndex);
    } else {
      setError('Invalid page number');
    }
    setPageInput('');
  };

  return {
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
  };
};

export default useCommentSearch;