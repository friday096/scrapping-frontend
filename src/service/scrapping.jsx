import axios from 'axios';

// Get the API URL from the environment variable with a fallback
const API_URL = import.meta.env.VITE_API_URL;

// Create an Axios instance with the base URL
const API = axios.create({
    baseURL: `${API_URL}/api`, // Set the base URL for all requests
});

// Create a new scrap entry
export const createScrap = async (scrapData) => {
    try {
        const response = await API.post('/scrap', scrapData);
        return response.data;
    } catch (error) {
        console.error('Error creating scrap:', error);
        throw error;
    }
};

// Get all scraps (list)
export const getAllScraps = async () => {
    try {
        const response = await API.get('/scrap');
        return response.data;
    } catch (error) {
        console.error('Error fetching scraps:', error);
        throw error;
    }
};

// Get the details of a single company by ID
export const getCompanyDetails = async (id) => {
    try {
        const response = await API.get(`/scrap/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching company details:', error);
        throw error;
    }
};

// Delete a single or multiple scraps by ID(s)
export const deleteScraps = async (ids) => {
    try {
        const response = await API.delete('/scrap', {
            data: { ids }
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting scraps:', error);
        throw error;
    }
};

