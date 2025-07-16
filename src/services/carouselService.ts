import api from './api';
import { API_CONFIG } from '../config/api';

export interface ICarouselItem {
  subtitle: string;
  title: string;
  description: string;
  backgroundImage: string;
}

export const carouselService = {
  async getCarouselItems(): Promise<ICarouselItem[]> {
    try {
      const response = await api.get<ICarouselItem[]>(API_CONFIG.ENDPOINTS.CAROUSEL);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar itens do carousel:', error);
      throw error;
    }
  },
};
