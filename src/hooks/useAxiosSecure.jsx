// src/hooks/useAxiosSecure.jsx
import axios from 'axios';
import { useEffect } from 'react';
import useAuth from './useAuth'; // Assumes you have useAuth hook
import { useNavigate } from 'react-router';

// 1. Create a secured Axios instance
const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL, // আপনার সার্ভার URL
    withCredentials: true, // If using cookies (less common with JWT in localStorage)
});

const useAxiosSecure = () => {
    const { logOut } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // --- Request Interceptor ---
        axiosSecure.interceptors.request.use((config) => {
            // Get token from local storage
            const token = localStorage.getItem('access-token');
            if (token) {
                // Attach the token to the Authorization header
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        });

        // --- Response Interceptor ---
        // Handles 401 (Unauthorized) and 403 (Forbidden) errors
        axiosSecure.interceptors.response.use(
            (response) => response,
            async (error) => {
                const status = error.response?.status;
                // If token is expired or invalid (401 or 403)
                if (status === 401 || status === 403) {
                    await logOut(); // Log out the user
                    navigate('/login'); // Redirect to login page
                }
                return Promise.reject(error);
            }
        );

    }, [logOut, navigate]); // Dependencies

    return axiosSecure;
};

export default useAxiosSecure;