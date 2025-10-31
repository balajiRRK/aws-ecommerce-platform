import axios from 'axios';

// API Base URL - Update this with your API Gateway URL when configured
const INVENTORY_SERVICE_URL = process.env.REACT_APP_INVENTORY_SERVICE_URL || 'http://localhost:3001';

// Create axios instance with default config
const inventoryAPI = axios.create({
  baseURL: INVENTORY_SERVICE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10_000,
});

export const apiService = {
  // Get all available items
  getAllItems: async () => {
    try {
      const response = await inventoryAPI.get('/inventory-management/inventory');
      return response.data;
    } catch (error) {
      console.error('Error fetching inventory:', error);
      throw error;
    }
  },

  // Get item by ID
  getItemById: async (id) => {
    try {
      const response = await inventoryAPI.get(`/inventory-management/inventory/items/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching item ${id}:`, error);
      throw error;
    }
  },

  // Search items by name
  searchItemsByName: async (name) => {
    try {
      const response = await inventoryAPI.get('/inventory-management/inventory/items', {
        params: { name }
      });
      return response.data;
    } catch (error) {
      console.error(`Error searching for "${name}":`, error);
      throw error;
    }
  },

  // Check inventory availability
  checkAvailability: async (items) => {
    try {
      const response = await inventoryAPI.post('/order-processing/order', { items });
      return response.data;
    } catch (error) {
      console.error('Error checking inventory availability:', error);
      throw error;
    }
  },
};

// Error handling helper
export const handleAPIError = (error) => {
  if (error.response) {
    // Server responded with error status
    return {
      message: error.response.data.message || error.response.data.error || 'An error occurred',
      status: error.response.status,
      details: error.response.data.details || null
    };
  } else if (error.request) {
    // Request was made but no response
    return {
      message: 'Service unavailable. Please check your connection and try again.',
      status: 503,
      details: null
    };
  } else {
    // Something else happened
    return {
      message: error.message || 'An unexpected error occurred',
      status: 500,
      details: null
    };
  }
};

export default { inventoryService, handleAPIError };
