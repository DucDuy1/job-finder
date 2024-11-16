import axios from 'axios';

const handleAPIError = (error) => {
    if (error.response) {
        return error.response.data?.message || "An error occurred";
    } else if (error.request) {
        return "No response from the server. Please check your network.";
    } else {
        return "Something went wrong. Please try again.";
    }
};

export const jobCreateAPI = async (formData) => {
    const token = localStorage.getItem("accessToken");
    const config = {
        url: "/api/job/create",
        method: "POST",
        headers: {
            "Content-Type": "multipart/form-data",
            ...(token && { Authorization: `Bearer ${token}` }),
        },
        data: formData, // Gửi FormData trực tiếp
    };
    try {
        const { data } = await axios(config); // Lấy trực tiếp data từ response
        return data;
    } catch (error) {
        console.error("Error response:", error.response || error);
        throw handleAPIError(error);
    }
};

export const jobSearchAPI = async (searchParams) => {
    const token = localStorage.getItem("accessToken"); // Lấy access token từ localStorage nếu có
    const config = {
        url: '/api/job/search', // API endpoint URL
        method: 'POST', // HTTP method
        headers: {
            "Content-Type": "application/json", // Headers của request
            ...(token && { Authorization: `Bearer ${token}` }), // Nếu có token thì thêm Authorization header
        },
        data: searchParams, // Sử dụng biến `searchParams` chứa các giá trị cần thiết
    };
    try {
        const response = await axios(config); // Gửi request sử dụng axios
        return response.data; // Trả về dữ liệu response
    } catch (error) {
        console.error("Error:", error.response || error.message); // Log chi tiết lỗi
        throw handleAPIError(error); // Xử lý và ném lỗi để xử lý tiếp
    }
};

export const jobSearchMultiAPI = async (searchParams) => {
    const token = localStorage.getItem("accessToken");
    const config = {
        url: '/api/job/search-multi',
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
        },
        params: searchParams, // Dùng `params` thay vì `data` để gửi qua query parameters
    };
    try {
        const response = await axios(config);
        return response.data;
    } catch (error) {
        console.error("Error:", error.response || error.message);
        throw handleAPIError(error);
    }
};

export const jobListAPI = async (formData) => {
    const token = localStorage.getItem("accessToken");
    const config = {
        url: "/api/job/list-job",
        method: "POST",
        headers: {
            "Content-Type": "multipart/form-data",
            ...(token && { Authorization: `Bearer ${token}` }),
        },
        data: formData, // Gửi FormData trực tiếp
    };
    try {
        const { data } = await axios(config); // Lấy trực tiếp data từ response
        return data;
    } catch (error) {
        console.error("Error response:", error.response || error);
        throw handleAPIError(error);
    }
};

export const jobDeleteAPI = async ( id ) => {
    const token = localStorage.getItem("accessToken");
    const config = {
        url: `/api/job/delete/${id}`, // Assuming you have a single update endpoint for jobs
        method: 'DELETE', // Use PUT for updates
        headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }), // Add token if available
        },
    };
    try {
        const response = await axios(config);
        return response.data;
    } catch (error) {
        console.error("Error response:", error.response);
        throw handleAPIError(error);
    }
};

export const jobUpdateAPI = async ( formData ) => {
    const token = localStorage.getItem("accessToken");
    const config = {
        url: `/api/job/update`, // Assuming you have a single update endpoint for jobs
        method: 'PUT', // Use PUT for updates
        headers: {
            "Content-Type": "multipart/form-data",
            ...(token && { Authorization: `Bearer ${token}` }), // Add token if available
        },
        data: formData
    };
    try {
        const { data } = await axios(config);
        return data;
    } catch (error) {
        console.error("Error response:", error.response);
        throw handleAPIError(error);
    }
};

export const jobGetIdAPI = async ( id ) => {
    const token = localStorage.getItem("accessToken");
    const config = {
        url: `/api/job/${id}`, // Assuming you have a single update endpoint for jobs
        method: 'GET', // Use PUT for updates
        headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }), // Add token if available
        },
    };
    try {
        const response = await axios(config);
        return response.data;
    } catch (error) {
        console.error("Error response:", error.response);
        throw handleAPIError(error);
    }
};

export const jobGetImageAPI = async (imageUrl) => {
    const token = localStorage.getItem("accessToken");
    const config = {
        url: `/files/${imageUrl}`, 
        method: 'GET', 
        headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
        },
        responseType: 'blob',
    };
    try {
        const response = await axios(config);
        return response.data;
    } catch (error) {
        console.error("Error response:", error.response);
        throw handleAPIError(error);
    }
};

export const jobDownloadAPI = async (imageUrl) => {
    const token = localStorage.getItem("accessToken");
    const config = {
        url: `/api/job/download?imageUrl=${encodeURIComponent(imageUrl)}`, 
        method: 'GET', 
        headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
        },
        responseType: 'blob',
    };
    try {
        const response = await axios(config);
        return response.data;
    } catch (error) {
        console.error("Error response:", error.response);
        throw handleAPIError(error);
    }
};

export const jobGetUserIdAPI = async ( id ) => {
    const token = localStorage.getItem("accessToken");
    const config = {
        url: `/api/job/user/${id}`,
        method: 'GET', 
        headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
        },
    };
    try {
        const response = await axios(config);
        return response.data;
    } catch (error) {
        console.error("Error response:", error.response);
        throw handleAPIError(error);
    }
};
