import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Header from './Header';
import { CartProvider } from '../../context/CartContext';
import { SearchProvider } from '../../context/SearchContext';
import { theme } from '../../styles/theme';

const renderWithProviders = () => {
  return render(
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <SearchProvider>
          <CartProvider>
            <Header />
          </CartProvider>
        </SearchProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

describe('Header', () => {
  it('should render the AL SKIN logo', () => {
    renderWithProviders();
    
    expect(screen.getByText('AL SKIN')).toBeInTheDocument();
  });

  it('should update search term when typing in search input', () => {
    renderWithProviders();
    
    const searchInput = screen.getByPlaceholderText('O que você está procurando?');
    
    fireEvent.change(searchInput, { target: { value: 'protetor solar' } });
    
    expect(searchInput).toHaveValue('protetor solar');
  });

  it('should clear search when clear button is clicked', () => {
    renderWithProviders();
    
    const searchInput = screen.getByPlaceholderText('O que você está procurando?');
    
    // Primeiro adiciona texto
    fireEvent.change(searchInput, { target: { value: 'protetor solar' } });
    expect(searchInput).toHaveValue('protetor solar');
    
    // Depois clica no botão limpar
    const clearButton = screen.getByTestId('clear-search-button');
    fireEvent.click(clearButton);
    
    expect(searchInput).toHaveValue('');
  });

  it('should open cart modal when cart button is clicked', () => {
    renderWithProviders();
    
    const cartButton = screen.getByTestId('cart-button');
    fireEvent.click(cartButton);
    
    // Verifica se o modal do carrinho foi aberto
    expect(screen.getByText('Carrinho')).toBeInTheDocument();
  });
});
