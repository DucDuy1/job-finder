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

export const loginAPI = async (username, password, navigate) => {
  const token = localStorage.getItem("accessToken");
  const config = {
    url: '/api/auth/login',
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    data: { username, password },
  };
  try {
    const response = await axios(config);
    localStorage.setItem("accessToken", response.data.accessToken);
    return response.data;
  } catch (error) {
    throw handleAPIError(error, navigate);
  }
};

export const logoutAPI = async (navigate) => {
  const config = {
    url: '/api/auth/logout',
    method: 'POST',
  };
  try {
    return await axios(config);
  } catch (error) {
    throw handleAPIError(error, navigate);
  }
};

export const registerAPI = async (username, password, email, navigate) => {
  const config = {
    url: '/api/auth/register',
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      username,
      password,
      email,
    },
  };
  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    throw handleAPIError(error, navigate);
  }
};

export const forgotPasswordAPI = async (email, navigate) => {
  const config = {
    url: '/api/auth/forgot-password',
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      email,
    },
  };
  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    throw handleAPIError(error, navigate);
  }
};

export const changePasswordAPI = async (email, otp, newPassword, navigate) => {
  const config = {
    url: '/api/auth/change-password',
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      email,
      otp,
      newPassword,
    },
  };
  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    throw handleAPIError(error, navigate);
  }
};
