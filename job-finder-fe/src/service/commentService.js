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

export const commentCreateAPI = async (comment) => {
    const token = localStorage.getItem("accessToken");
    const config = {
        url: "/api/comment/create",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
        },
        data: comment,
    };
    try {
        const { data } = await axios(config);
        return data;
    } catch (error) {
        console.error("Error response:", error.response || error);
        throw handleAPIError(error);
    }
};

export const commentSearchAPI = async ( searchParams ) => {
    const token = localStorage.getItem("accessToken");
    const config = {
        url: '/api/comment/search',
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

export const commentDeleteAPI = async ( id ) => {
    const token = localStorage.getItem("accessToken");
    const config = {
        url: `/api/comment/delete/${id}`,
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

export const commentUpdateAPI = async ( comment ) => {
    const token = localStorage.getItem("accessToken");
    const config = {
        url: `/api/comment/update`,
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
        },
        data: comment
    };
    try {
        const { data } = await axios(config);
        return data;
    } catch (error) {
        console.error("Error response:", error.response);
        throw handleAPIError(error);
    }
};

export const commentGetIdAPI = async ( id ) => {
    const token = localStorage.getItem("accessToken");
    const config = {
        url: `/api/comment/${id}`,
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

export const commentGetJobIdAPI = async (id) => {
    const token = localStorage.getItem("accessToken");
    const config = {
        url: `/api/comment/job/${id}`,
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


