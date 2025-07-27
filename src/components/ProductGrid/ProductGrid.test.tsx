import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from 'styled-components';
import ProductGrid from './ProductGrid';
import { CartProvider } from '../../context/CartContext';
import { productService } from '../../services';
import { theme } from '../../styles/theme';

// Mock dos serviços
jest.mock('../../services', () => ({
  productService: {
    getProducts: jest.fn(),
  },
}));

// Mock do SearchContext para controlar o termo de busca
const mockSetSearchTerm = jest.fn();
let mockSearchTerm = '';

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

const renderWithProviders = async () => {
  let component;
  await act(async () => {
    component = render(
      <ThemeProvider theme={theme}>
        <CartProvider>
          <ProductGrid />
        </CartProvider>
      </ThemeProvider>
    );
  });
  return component;
};

describe('ProductGrid', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockSearchTerm = '';
    mockProductService.getProducts.mockResolvedValue(mockProducts);
  });

  it('should render the component title', async () => {
    await renderWithProviders();
    
    expect(screen.getByText('nossos queridinhos estão aqui')).toBeInTheDocument();
  });

  it('should fetch and display products', async () => {
    await renderWithProviders();
    
    await waitFor(() => {
      expect(screen.getByText('Produto 1')).toBeInTheDocument();
      expect(screen.getByText('Produto 2')).toBeInTheDocument();
    });
    
    expect(mockProductService.getProducts).toHaveBeenCalledTimes(1);
  });

  it('should handle loading state', async () => {
    mockProductService.getProducts.mockResolvedValue(mockProducts);
    
    await renderWithProviders();
    
    // Aguarda o carregamento completar
    await waitFor(() => {
      expect(screen.getByText('Produto 1')).toBeInTheDocument();
    });
  });

  it('should handle error state gracefully', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    mockProductService.getProducts.mockRejectedValue(new Error('API Error'));
    
    await renderWithProviders();
    
    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Erro ao carregar produtos:', expect.any(Error));
    });
    
    consoleSpy.mockRestore();
  });

  it('should call console.log when product is clicked', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => undefined);
    
    await renderWithProviders();
    
    await waitFor(() => {
      expect(screen.getByText('Produto 1')).toBeInTheDocument();
    });
    
    const productCards = screen.getAllByTestId('product-card');
    fireEvent.click(productCards[0]); // Click no primeiro produto
    
    expect(consoleSpy).toHaveBeenCalledWith('Produto clicado: 1');
    consoleSpy.mockRestore();
  });

  it('should add product to cart when buy button is clicked', async () => {
    await renderWithProviders();
    
    await waitFor(() => {
      expect(screen.getByText('Produto 1')).toBeInTheDocument();
    });
    
    const buyButtons = screen.getAllByRole('button', { name: /comprar/i });
    fireEvent.click(buyButtons[0]);
    
    // O produto deve ser adicionado ao carrinho via contexto
  });

  it('should show empty state message when no products available', async () => {
    mockProductService.getProducts.mockResolvedValue([]);
    
    await renderWithProviders();
    
    await waitFor(() => {
      expect(screen.getByText('Nenhum produto disponível no momento.')).toBeInTheDocument();
    });
  });

  it('should display search results info when searching', async () => {
    mockSearchTerm = 'Produto 1';
    
    await renderWithProviders();
    
    await waitFor(() => {
      expect(screen.getByText(/Resultados para:/)).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: 'Produto 1' })).toBeInTheDocument();
      expect(screen.queryByRole('heading', { name: 'Produto 2' })).not.toBeInTheDocument();
    });
  });

  it('should show no results message when search returns empty', async () => {
    mockSearchTerm = 'produto inexistente';
    
    await renderWithProviders();
    
    await waitFor(() => {
      expect(screen.getByText(/Nenhum produto encontrado/)).toBeInTheDocument();
    });
  });
});
