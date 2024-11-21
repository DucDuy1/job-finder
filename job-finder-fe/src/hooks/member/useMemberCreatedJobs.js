import { useState, useEffect } from 'react';
import { userGetImageAPI } from '../../service/userService';
import { jobDeleteAPI, jobGetUserIdAPI } from '../../service/jobService';

const PAGE_SIZE = 10;

const useMemberCreatedJobs = (userId) => {
    const [createdJobs, setCreatedJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [jobImages, setJobImages] = useState({});
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchImageUrl = async (imageUrl) => {
            try {
                const imageBlob = await userGetImageAPI(imageUrl);
                return URL.createObjectURL(imageBlob);
            } catch (err) {
                console.error('Failed to load image:', err);
                return '';
            }
        };

        const fetchCreatedJobs = async () => {
            try {
                const response = await jobGetUserIdAPI(userId);
                const jobs = response.listItems || [];
                setCreatedJobs(jobs);
                setTotalPages(Math.ceil(jobs.length / PAGE_SIZE));

                const imagePromises = jobs.map(async (job) => {
                    if (job.imageUrl) {
                        const imageUrl = await fetchImageUrl(job.imageUrl);
                        return { id: job.id, imageUrl };
                    }
                    return { id: job.id, imageUrl: '' };
                });

                const images = await Promise.all(imagePromises);
                const imageMap = images.reduce((acc, { id, imageUrl }) => {
                    acc[id] = imageUrl;
                    return acc;
                }, {});

                setJobImages(imageMap);
            } catch (err) {
                setError(err.message || 'Failed to load created jobs');
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchCreatedJobs();
        } else {
            setLoading(false);
            setError('User ID not found');
        }
    }, [userId]);

    const handleDelete = async (id) => {
        try {
            await jobDeleteAPI(id);
            setCreatedJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));
        } catch (error) {
            console.error('Delete error:', error);
        }
    };


    return { createdJobs, loading, error, jobImages, totalPages, handleDelete, PAGE_SIZE };
};

export default useMemberCreatedJobs;
