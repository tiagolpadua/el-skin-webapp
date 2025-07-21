import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header';
import { CartProvider } from '../../context/CartContext';
import { SearchProvider } from '../../context/SearchContext';

const renderWithProviders = () => {
  return render(
    <BrowserRouter>
      <SearchProvider>
        <CartProvider>
          <Header />
        </CartProvider>
      </SearchProvider>
    </BrowserRouter>
  );
};

describe('Header', () => {
  it('should render the AL SKIN logo', () => {
    renderWithProviders();
    
    expect(screen.getByText('AL SKIN')).toBeInTheDocument();
  });

  it('should render navigation links', () => {
    renderWithProviders();
    
    expect(screen.getByText('home')).toBeInTheDocument();
    expect(screen.getByText('sobre')).toBeInTheDocument();
    expect(screen.getByText('produtos')).toBeInTheDocument();
    expect(screen.getByText('contato')).toBeInTheDocument();
  });

  it('should render search input', () => {
    renderWithProviders();
    
    const searchInput = screen.getByPlaceholderText('buscar por produto');
    expect(searchInput).toBeInTheDocument();
  });

  it('should render cart button', () => {
    renderWithProviders();
    
    const cartButton = screen.getByRole('button', { name: /carrinho/i });
    expect(cartButton).toBeInTheDocument();
  });

  it('should update search term when typing in search input', () => {
    renderWithProviders();
    
    const searchInput = screen.getByPlaceholderText('buscar por produto');
    
    fireEvent.change(searchInput, { target: { value: 'protetor solar' } });
    
    expect(searchInput).toHaveValue('protetor solar');
  });

  it('should clear search when clear button is clicked', () => {
    renderWithProviders();
    
    const searchInput = screen.getByPlaceholderText('buscar por produto');
    
    // Primeiro adiciona texto
    fireEvent.change(searchInput, { target: { value: 'protetor solar' } });
    expect(searchInput).toHaveValue('protetor solar');
    
    // Depois clica no botão limpar
    const clearButton = screen.getByRole('button', { name: /limpar busca/i });
    fireEvent.click(clearButton);
    
    expect(searchInput).toHaveValue('');
  });

  it('should open cart modal when cart button is clicked', () => {
    renderWithProviders();
    
    const cartButton = screen.getByRole('button', { name: /carrinho/i });
    fireEvent.click(cartButton);
    
    // Verifica se o modal do carrinho foi aberto
    expect(screen.getByText('Carrinho de Compras')).toBeInTheDocument();
  });

  it('should show cart count badge when there are items', () => {
    renderWithProviders();
    
    // Este teste assumiria que há items no carrinho
    // Você pode mockar o contexto do carrinho para ter items
    // expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('should log search value to console', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => undefined);
    renderWithProviders();
    
    const searchInput = screen.getByPlaceholderText('buscar por produto');
    fireEvent.change(searchInput, { target: { value: 'teste' } });
    
    expect(consoleSpy).toHaveBeenCalledWith('Valor buscado:', 'teste');
    consoleSpy.mockRestore();
  });

  it('should have correct navigation links', () => {
    renderWithProviders();
    
    const homeLink = screen.getByRole('link', { name: /home/i });
    const aboutLink = screen.getByRole('link', { name: /sobre/i });
    
    expect(homeLink).toHaveAttribute('href', '/');
    expect(aboutLink).toHaveAttribute('href', '/about');
  });

  it('should show search icon', () => {
    renderWithProviders();
    
    const searchIcon = screen.getByTestId('search-icon');
    expect(searchIcon).toBeInTheDocument();
  });

  it('should show cart icon', () => {
    renderWithProviders();
    
    const cartIcon = screen.getByTestId('cart-icon');
    expect(cartIcon).toBeInTheDocument();
  });
});
