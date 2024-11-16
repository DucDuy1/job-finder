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

export const statisticsUserAPI = async (formData) => {
    const token = localStorage.getItem("accessToken");
    const config = {
        url: "/api/statistics/user",
        method: "GET",
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