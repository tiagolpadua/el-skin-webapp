import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Home from './Home';
import { CartProvider } from '../../context/CartContext';
import { SearchProvider } from '../../context/SearchContext';

// Mock dos serviços
jest.mock('../services', () => ({
  productService: {
    getProducts: jest.fn().mockResolvedValue([
      {
        id: '1',
        name: 'Produto Teste',
        description: 'Descrição do produto',
        price: 99.99,
        image: '/test.jpg',
        tags: [{ label: 'Teste', type: 'face' }]
      }
    ]),
  },
  carouselService: {
    getCarouselItems: jest.fn().mockResolvedValue([
      {
        id: '1',
        image: '/carousel1.jpg',
        title: 'Slide 1',
        subtitle: 'Subtítulo 1'
      }
    ]),
  },
}));

const renderWithProviders = () => {
  return render(
    <BrowserRouter>
      <SearchProvider>
        <CartProvider>
          <Home />
        </CartProvider>
      </SearchProvider>
    </BrowserRouter>
  );
};

describe('Home Page', () => {
  it('should render carousel component', async () => {
    renderWithProviders();
    
    // Aguarda o carregamento dos componentes
    await waitFor(() => {
      expect(screen.getByTestId('carousel')).toBeInTheDocument();
    });
  });

  it('should render product grid component', async () => {
    renderWithProviders();
    
    await waitFor(() => {
      expect(screen.getByText('nossos queridinhos estão aqui')).toBeInTheDocument();
    });
  });

  it('should render both main sections', async () => {
    renderWithProviders();
    
    await waitFor(() => {
      // Verifica se ambas as seções principais estão presentes
      expect(screen.getByTestId('carousel')).toBeInTheDocument();
      expect(screen.getByText('nossos queridinhos estão aqui')).toBeInTheDocument();
    });
  });

  it('should have proper page structure', () => {
    const { container } = renderWithProviders();
    
    // Verifica a estrutura básica da página
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should load products in product grid', async () => {
    renderWithProviders();
    
    await waitFor(() => {
      expect(screen.getByText('Produto Teste')).toBeInTheDocument();
    });
  });

  it('should be responsive and accessible', () => {
    renderWithProviders();
    
    // Verifica se a página não tem problemas básicos de acessibilidade
    const container = screen.getByRole('main');
    expect(container).toBeInTheDocument();
  });
});
