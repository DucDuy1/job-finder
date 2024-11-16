import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { applyDeleteAPI, applyDownloadAPI, applyGetImageAPI, applySearchAPI } from '../../service/applyService';

const useApplySearch = () => {
  const [fileCVUrlMap, setFileCVUrlMap] = useState({});
  const [search, setSearch] = useState({
    keyWord: "%%",
    size: 2,
    page: 0,
  });
  const [applys, setApplys] = useState([]);
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

  useEffect(() => {
    const fetchImages = async () => {
      const imageMap = {};
      for (let apply of applys) {
        if (apply.fileCV) {
          try {
            const blob = await applyGetImageAPI(apply.fileCV);
            const fileCV = URL.createObjectURL(blob);
            imageMap[apply.id] = fileCV;
          } catch (error) {
            console.error("Error fetching image:", error);
          }
        }
      }
      setFileCVUrlMap(imageMap);
    };
    fetchImages();
  }, [applys]);

  const find = async () => {
    const searchParams = {
      keyWord: search.keyWord,
      size: search.size,
      page: search.page,
    };
    try {
      const response = await applySearchAPI(searchParams);
      setApplys(response.listItems);
      setPageTotal(response.pageTotal);
    } catch (error) {
      console.error("Error:", error);
      setError(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await applyDeleteAPI(id);
      find();
      navigate('/apply/search');
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const handleImageDownload = async (fileCV) => {
    try {
      const imageBlob = await applyDownloadAPI(fileCV);
      const url = window.URL.createObjectURL(new Blob([imageBlob]));
      const a = document.createElement('a');
      a.href = url;
      a.download = 'downloadedImage.jpg';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download error:', error);
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
  };
};

export default useApplySearch;