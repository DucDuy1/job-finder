import axios from 'axios';

const handleAPIError = (error, navigate) => {
    if (error.response) {
        if (error.response.status === 401) {
            localStorage.removeItem("accessToken");
            navigate('/401');
            return "Session expired. Please log in again.";
        } else if (error.response.status === 404) {
            navigate('/404');
            return "Resource not found.";
        } else if (error.response.status === 500) {
            navigate('/500');
            return "Internal server error. Please try again later.";
        }
        return error.response.data?.message || "An error occurred";
    } else if (error.request) {
        return "No response from the server. Please check your network.";
    } else {
        return "Something went wrong. Please try again.";
    }
};

export const applyCreateAPI = async (formData, navigate) => {
    const token = localStorage.getItem("accessToken");
    const config = {
        url: "/api/apply/create",
        method: "POST",
        headers: {
            "Content-Type": "multipart/form-data",
            ...(token && { Authorization: `Bearer ${token}` }),
        },
        data: formData,
    };
    try {
        const { data } = await axios(config);
        return data;
    } catch (error) {
        console.error("Error response:", error.response || error);
        throw handleAPIError(error, navigate);
    }
};

export const applySearchAPI = async (searchParams, navigate) => {
    const token = localStorage.getItem("accessToken");
    const config = {
        url: '/api/apply/search',
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
        },
        data: searchParams,
    };
    try {
        const response = await axios(config);
        return response.data;
    } catch (error) {
        console.error("Error:", error.response || error.message);
        throw handleAPIError(error, navigate);
    }
};

export const applyDeleteAPI = async (id, navigate) => {
    const token = localStorage.getItem("accessToken");
    const config = {
        url: `/api/apply/delete/${id}`,
        method: 'DELETE',
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
        throw handleAPIError(error, navigate);
    }
};

export const applyUpdateAPI = async (formData, navigate) => {
    const token = localStorage.getItem("accessToken");
    const config = {
        url: `/api/apply/update`,
        method: 'PUT',
        headers: {
            "Content-Type": "multipart/form-data",
            ...(token && { Authorization: `Bearer ${token}` }),
        },
        data: formData,
    };
    try {
        const { data } = await axios(config);
        return data;
    } catch (error) {
        console.error("Error response:", error.response);
        throw handleAPIError(error, navigate);
    }
};

export const applyGetIdAPI = async (id, navigate) => {
    const token = localStorage.getItem("accessToken");
    const config = {
        url: `/api/apply/${id}`,
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
        throw handleAPIError(error, navigate);
    }
};

export const applyGetImageAPI = async (fileCV, navigate) => {
    const token = localStorage.getItem("accessToken");
    const config = {
        url: `/files/${fileCV}`,
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
        throw handleAPIError(error, navigate);
    }
};

export const applyDownloadAPI = async (fileCV, navigate) => {
    const token = localStorage.getItem("accessToken");
    const config = {
        url: `/api/apply/download?fileCV=${encodeURIComponent(fileCV)}`,
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
        throw handleAPIError(error, navigate);
    }
};

export const applyGetUserIdAPI = async (id, navigate) => {
    const token = localStorage.getItem("accessToken");
    const config = {
        url: `/api/apply/user/${id}`,
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
        throw handleAPIError(error, navigate);
    }
};

export const applyGetJobIdAPI = async (id) => {
    const token = localStorage.getItem("accessToken");
    const config = {
        url: `/api/apply/job/${id}`,
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
