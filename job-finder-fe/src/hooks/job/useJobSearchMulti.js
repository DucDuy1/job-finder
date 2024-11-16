import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jobDeleteAPI, jobDownloadAPI, jobGetImageAPI, jobSearchMultiAPI } from '../../service/jobService';

const useJobSearchMulti = () => {
    const [imageUrlMap, setImageUrlMap] = useState({});
    const [search, setSearch] = useState({
        title: "",
        tag: "",
        location: "",
        nameCompany: "",
        level: "",
        employmentType: "",
        size: 10,
        page: 0,
    });
    const [jobs, setJobs] = useState([]);
    const [pageTotal, setPageTotal] = useState(0);
    const [error, setError] = useState(null);
    const [pageInput, setPageInput] = useState('');
    const navigate = useNavigate();

    // Trigger API call on search state change with debounce
    useEffect(() => {
        const timeout = setTimeout(() => {
            findJobs();
        }, 500);
        return () => clearTimeout(timeout);
    }, [search]);

    // Fetch images for jobs when jobs list changes
    useEffect(() => {
        fetchImages();
    }, [jobs]);

    // Find jobs based on search criteria
    const findJobs = async () => {
        const searchParams = {
            title: search.title,
            tag: search.tag,
            location: search.location,
            nameCompany: search.nameCompany || undefined,
            level: search.level !== 'Select Level' ? search.level : undefined,
            employmentType: search.employmentType !== 'Employment Type' ? search.employmentType : undefined,
            size: search.size,
            page: search.page,
        };
        console.log("Triggering findJobs with search:", search); // Debug: Raw search state
        console.log("Search Params:", searchParams); // Debug: API params

        try {
            const response = await jobSearchMultiAPI(searchParams);
            console.log("API Response:", response); // Debug: API response
            setJobs(response.listItems);
            setPageTotal(response.pageTotal);
        } catch (error) {
            console.error("Error fetching jobs:", error);
            setError(error.message);
        }
    };

    // Fetch job images and map them to their IDs
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

    // Handle image download
    const handleImageDownload = async (imageUrl) => {
        try {
            const imageBlob = await jobDownloadAPI(imageUrl);
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

    // Pagination controls
    const previousPage = () => {
        const newPage = Math.max(0, search.page - 1);
        setSearch((prev) => ({ ...prev, page: newPage }));
    };

    const nextPage = () => {
        const newPage = search.page + 1;
        if (newPage < pageTotal) {
            setSearch((prev) => ({ ...prev, page: newPage }));
        }
    };

    const goToPage = (pageIndex) => {
        setSearch((prev) => ({ ...prev, page: pageIndex }));
    };

    // Handle changes in search input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSearch((prev) => ({
            ...prev,
            [name]: value || '',
        }));
    };

    // Handle page input change and navigation
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
        jobs,
        imageUrlMap,
        search,
        pageTotal,
        error,
        pageInput,
        handleChange,
        handleImageDownload,
        previousPage,
        nextPage,
        goToPage,
        handlePageInputChange,
        goToInputPage,
    };
};

export default useJobSearchMulti;
