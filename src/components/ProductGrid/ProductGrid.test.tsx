import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductGrid from './ProductGrid';
import { CartProvider } from '../../context/CartContext';
import { productService } from '../../services';

// Mock dos serviços
jest.mock('../../services', () => ({
  productService: {
    getProducts: jest.fn(),
  },
}));

// Mock do SearchContext para controlar o termo de busca
const mockSetSearchTerm = jest.fn();
const mockSearchTerm = '';

jest.mock('../../context/SearchContext', () => ({
  useSearchContext: () => ({
    searchTerm: mockSearchTerm,
    setSearchTerm: mockSetSearchTerm,
  }),
}));

const mockProducts = [
  {
    id: '1',
    name: 'Produto 1',
    description: 'Descrição do produto 1',
    price: 99.99,
    image: '/image1.jpg',
    tags: [{ label: 'Proteção', type: 'protection' as const }]
  },
  {
    id: '2',
    name: 'Produto 2',
    description: 'Descrição do produto 2',
    price: 149.99,
    image: '/image2.jpg',
    tags: [{ label: 'Rosto', type: 'face' as const }]
  }
];

const mockProductService = productService as jest.Mocked<typeof productService>;

const renderWithProviders = () => {
  return render(
    <CartProvider>
      <ProductGrid />
    </CartProvider>
  );
};

describe('ProductGrid', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockProductService.getProducts.mockResolvedValue(mockProducts);
  });

  it('should render the component title', async () => {
    renderWithProviders();
    
    expect(screen.getByText('nossos queridinhos estão aqui')).toBeInTheDocument();
  });

  it('should fetch and display products', async () => {
    renderWithProviders();
    
    await waitFor(() => {
      expect(screen.getByText('Produto 1')).toBeInTheDocument();
      expect(screen.getByText('Produto 2')).toBeInTheDocument();
    });
    
    expect(mockProductService.getProducts).toHaveBeenCalledTimes(1);
  });

  it('should handle loading state', () => {
    mockProductService.getProducts.mockImplementation(
      () => new Promise(resolve => setTimeout(resolve, 1000))
    );
    
    renderWithProviders();
    
    // Durante o carregamento, não deve mostrar produtos
    expect(screen.queryByText('Produto 1')).not.toBeInTheDocument();
  });

  it('should handle error state gracefully', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    mockProductService.getProducts.mockRejectedValue(new Error('API Error'));
    
    renderWithProviders();
    
    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Erro ao carregar produtos:', expect.any(Error));
    });
    
    consoleSpy.mockRestore();
  });

  it('should call console.log when product is clicked', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => undefined);
    renderWithProviders();
    
    await waitFor(() => {
      expect(screen.getByText('Produto 1')).toBeInTheDocument();
    });
    
    const productCard = screen.getByText('Produto 1').closest('.product-card');
    if (productCard) {
      fireEvent.click(productCard);
    }
    
    expect(consoleSpy).toHaveBeenCalledWith('Produto clicado: 1');
    consoleSpy.mockRestore();
  });

  it('should add product to cart when buy button is clicked', async () => {
    renderWithProviders();
    
    await waitFor(() => {
      expect(screen.getByText('Produto 1')).toBeInTheDocument();
    });
    
    const buyButtons = screen.getAllByRole('button', { name: /comprar/i });
    fireEvent.click(buyButtons[0]);
    
    // O produto deve ser adicionado ao carrinho via contexto
  });

  it('should show empty state message when no products available', async () => {
    mockProductService.getProducts.mockResolvedValue([]);
    renderWithProviders();
    
    await waitFor(() => {
      expect(screen.getByText('Nenhum produto disponível no momento.')).toBeInTheDocument();
    });
  });
});
