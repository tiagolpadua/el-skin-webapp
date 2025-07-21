import { productService, IProduct } from './productService';
import api from './api';

// Mock do módulo api
jest.mock('./api', () => ({
  get: jest.fn(),
}));

const mockApi = api as jest.Mocked<typeof api>;

describe('productService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getProducts', () => {
    const mockProducts: IProduct[] = [
      {
        id: '1',
        name: 'Protetor Solar',
        description: 'Protetor solar facial FPS 60',
        price: 89.99,
        image: '/images/protetor.jpg',
        tags: [
          { label: 'Proteção Solar', type: 'protection' },
          { label: 'Rosto', type: 'face' }
        ]
      },
      {
        id: '2',
        name: 'Hidratante Facial',
        description: 'Hidratante facial com ácido hialurônico',
        price: 79.99,
        image: '/images/hidratante.jpg',
        tags: [
          { label: 'Rosto', type: 'face' }
        ]
      }
    ];

    it('should fetch products successfully', async () => {
      mockApi.get.mockResolvedValue({ data: mockProducts });

      const result = await productService.getProducts();

      expect(mockApi.get).toHaveBeenCalledWith('/products');
      expect(result).toEqual(mockProducts);
    });

    it('should handle API errors and rethrow them', async () => {
      const errorMessage = 'Network Error';
      mockApi.get.mockRejectedValue(new Error(errorMessage));

      await expect(productService.getProducts()).rejects.toThrow(errorMessage);
      expect(mockApi.get).toHaveBeenCalledWith('/products');
    });

    it('should return empty array when API returns empty data', async () => {
      mockApi.get.mockResolvedValue({ data: [] });

      const result = await productService.getProducts();

      expect(result).toEqual([]);
    });

    it('should handle malformed API response', async () => {
      mockApi.get.mockResolvedValue({ data: null });

      const result = await productService.getProducts();

      expect(result).toBeNull();
    });

    it('should handle timeout errors', async () => {
      const timeoutError = new Error('timeout of 5000ms exceeded');
      mockApi.get.mockRejectedValue(timeoutError);

      await expect(productService.getProducts()).rejects.toThrow('timeout of 5000ms exceeded');
    });

    it('should handle 404 errors', async () => {
      const notFoundError = {
        response: {
          status: 404,
          data: { message: 'Products not found' }
        }
      };
      mockApi.get.mockRejectedValue(notFoundError);

      await expect(productService.getProducts()).rejects.toEqual(notFoundError);
    });

    it('should handle 500 server errors', async () => {
      const serverError = {
        response: {
          status: 500,
          data: { message: 'Internal Server Error' }
        }
      };
      mockApi.get.mockRejectedValue(serverError);

      await expect(productService.getProducts()).rejects.toEqual(serverError);
    });

    it('should validate product structure', async () => {
      const validProduct = mockProducts[0];
      mockApi.get.mockResolvedValue({ data: [validProduct] });

      const result = await productService.getProducts();

      expect(result[0]).toHaveProperty('id');
      expect(result[0]).toHaveProperty('name');
      expect(result[0]).toHaveProperty('description');
      expect(result[0]).toHaveProperty('price');
      expect(result[0]).toHaveProperty('image');
      expect(result[0]).toHaveProperty('tags');
      expect(Array.isArray(result[0].tags)).toBe(true);
    });
  });
});
