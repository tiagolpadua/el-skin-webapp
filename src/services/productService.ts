import api from './api';
import { API_CONFIG } from '../config/api';

export interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  tags: Array<{
    label: string;
    type: 'protection' | 'face';
  }>;
}

export const productService = {
  async getProducts(): Promise<IProduct[]> {
    try {
      const response = await api.get<IProduct[]>(API_CONFIG.ENDPOINTS.PRODUCTS);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      throw error;
    }
  },

  async getProductById(id: string): Promise<IProduct> {
    try {
      const response = await api.get<IProduct>(`${API_CONFIG.ENDPOINTS.PRODUCTS}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar produto ${id}:`, error);
      throw error;
    }
  },
};
