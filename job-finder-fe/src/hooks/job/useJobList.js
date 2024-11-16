import React, { useEffect, useState } from 'react';
import { jobDeleteAPI, jobGetImageAPI, jobListAPI } from '../../service/jobService';

const useJobList = () => {
    const [jobs, setJobs] = useState([]);
    const [pageTotal, setPageTotal] = useState(0);
    const [search, setSearch] = useState({
      size: 10,
      page: 0,
    });
    const [imageUrlMap, setImageUrlMap] = useState({});
    const [error, setError] = useState(null);
    const [pageInput, setPageInput] = useState('');
  
    useEffect(() => {
      findJobs();
    }, [search]);
  
    useEffect(() => {
      const fetchImages = async () => {
        const imageMap = {};
        for (let job of jobs) {
          if (job.imageUrl) {
            try {
              const blob = await jobGetImageAPI(job.imageUrl);
              const imageUrl = URL.createObjectURL(blob);
              imageMap[job.id] = imageUrl;
            } catch (error) {
              console.error("Error fetching image:", error);
            }
          }
        }
        setImageUrlMap(imageMap);
      };
      fetchImages();
    }, [jobs]);
  
    const findJobs = async () => {
      try {
        const { size, page } = search;
        const response = await jobListAPI({ size, page });
        setJobs(response.listItems);
        setPageTotal(response.pageTotal);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setError(error.message);
      }
    };
  
    const handleDelete = async (id) => {
      try {
        await jobDeleteAPI(id);
        findJobs();
      } catch (error) {
        console.error('Error deleting job:', error);
      }
    };
  
    const previousPage = () => {
      const newPage = Math.max(search.page - 1, 0);
      setSearch({ ...search, page: newPage });
    };
  
    const nextPage = () => {
      const newPage = Math.min(search.page + 1, pageTotal - 1);
      setSearch({ ...search, page: newPage });
    };
  
    const handlePageInputChange = (e) => {
      setPageInput(e.target.value);
    };
  
    const goToInputPage = () => {
      const pageIndex = parseInt(pageInput, 10) - 1;
      if (pageIndex >= 0 && pageIndex < pageTotal) {
        setSearch({ ...search, page: pageIndex });
      } else {
        setError('Invalid page number');
      }
      setPageInput('');
    };

    // New function to handle page click
    const goToPage = (pageIndex) => {
      setSearch({ ...search, page: pageIndex });
    };
  
    return {
      jobs,
      imageUrlMap,
      pageTotal,
      error,
      pageInput,
      previousPage,
      nextPage,
      handlePageInputChange,
      goToInputPage,
      handleDelete,
      goToPage,
      search,
    };
  };
  
export default useJobList;