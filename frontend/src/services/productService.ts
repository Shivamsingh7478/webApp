import axios from 'axios';
import { Product, CreateProductInput, UpdateProductInput } from '../types/product';
import { authService } from './authService';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

// Create axios instance with auth header
const getAuthHeader = () => {
  const token = authService.getCurrentToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const productService = {
  async getAllProducts(): Promise<Product[]> {
    try {
      const response = await axios.get(`${API_URL}/products`, {
        headers: getAuthHeader(),
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getProductById(id: string): Promise<Product> {
    try {
      const response = await axios.get(`${API_URL}/products/${id}`, {
        headers: getAuthHeader(),
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async createProduct(product: CreateProductInput): Promise<Product> {
    try {
      const response = await axios.post(`${API_URL}/products`, product, {
        headers: getAuthHeader(),
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async updateProduct(product: UpdateProductInput): Promise<Product> {
    try {
      const { id, ...data } = product;
      const response = await axios.put(`${API_URL}/products/${id}`, data, {
        headers: getAuthHeader(),
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async deleteProduct(id: string): Promise<void> {
    try {
      await axios.delete(`${API_URL}/products/${id}`, {
        headers: getAuthHeader(),
      });
    } catch (error) {
      throw error;
    }
  },

  async filterProducts(filters: {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    minRating?: number;
  }): Promise<Product[]> {
    try {
      const response = await axios.get(`${API_URL}/products/filter`, {
        params: filters,
        headers: getAuthHeader(),
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async searchProducts(query: string): Promise<Product[]> {
    try {
      const response = await axios.get(`${API_URL}/products/search`, {
        params: { q: query },
        headers: getAuthHeader(),
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async uploadImage(file: File): Promise<string> {
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await axios.post(`${API_URL}/products/upload-image`, formData, {
        headers: {
          ...getAuthHeader(),
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data.imageUrl;
    } catch (error) {
      throw error;
    }
  },
}; 