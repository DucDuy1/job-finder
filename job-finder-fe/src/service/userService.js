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

export const userCreateAPI = async (formData) => {
    const token = localStorage.getItem("accessToken");
    const config = {
        url: "/api/user/create",
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
        throw handleAPIError(error);
    }
};

export const userSearchAPI = async (searchParams) => {
    const token = localStorage.getItem("accessToken"); 
    const config = {
        url: '/api/user/search', 
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
        throw handleAPIError(error);
    }
};

export const userDeleteAPI = async ( id ) => {
    const token = localStorage.getItem("accessToken");
    const config = {
        url: `/api/user/delete/${id}`, 
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
        throw handleAPIError(error);
    }
};

export const userUpdateAPI = async ( formData ) => {
    const token = localStorage.getItem("accessToken");
    const config = {
        url: `/api/user/update`, 
        method: 'PUT',
        headers: {
            "Content-Type": "multipart/form-data",
            ...(token && { Authorization: `Bearer ${token}` }),
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

export const userGetIdAPI = async ( id ) => {
    const token = localStorage.getItem("accessToken");
    const config = {
        url: `/api/user/${id}`,
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

export const userGetImageAPI = async (avatarUrl) => {
    const token = localStorage.getItem("accessToken");
    const config = {
        url: `/files/${avatarUrl}`, 
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

export const userDownloadAPI = async (avatarUrl) => {
    const token = localStorage.getItem("accessToken");
    const config = {
        url: `/api/user/download?avatarUrl=${encodeURIComponent(avatarUrl)}`, 
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

