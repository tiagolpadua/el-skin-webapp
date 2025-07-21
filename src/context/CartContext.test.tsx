import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CartProvider, useCartContext } from './CartContext';
import React from 'react';

// Componente de teste para acessar o contexto
const TestComponent: React.FC = () => {
  const { items, addItem, removeItem, getTotalItems, getTotalPrice, clearCart } = useCartContext();
  
  return (
    <div>
      <div data-testid="total-items">{getTotalItems()}</div>
      <div data-testid="total-price">{getTotalPrice()}</div>
      <div data-testid="items-count">{items.length}</div>
      
      <button 
        onClick={() => addItem({
          id: '1',
          name: 'Produto Teste',
          price: 99.99,
          image: '/test.jpg'
        })}
      >
        Adicionar Item
      </button>
      
      <button onClick={() => removeItem('1')}>
        Remover Item
      </button>
      
      <button onClick={clearCart}>
        Limpar Carrinho
      </button>
      
      {items.map((item, index) => (
        <div key={item.id} data-testid={`item-${index}`}>
          {item.name} - Quantidade: {item.quantity}
        </div>
      ))}
    </div>
  );
};

const renderWithCartProvider = () => {
  return render(
    <CartProvider>
      <TestComponent />
    </CartProvider>
  );
};

describe('CartContext', () => {
  it('should provide cart context to children', () => {
    renderWithCartProvider();
    
    expect(screen.getByTestId('total-items')).toHaveTextContent('0');
    expect(screen.getByTestId('total-price')).toHaveTextContent('0');
    expect(screen.getByTestId('items-count')).toHaveTextContent('0');
  });

  it('should throw error when useCartContext is used outside provider', () => {
    // Suprime console.error para este teste
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    
    expect(() => {
      render(<TestComponent />);
    }).toThrow('useCartContext must be used within a CartProvider');
    
    consoleSpy.mockRestore();
  });

  it('should provide all cart functionalities', () => {
    renderWithCartProvider();
    
    // Verifica se todos os botões estão disponíveis
    expect(screen.getByText('Adicionar Item')).toBeInTheDocument();
    expect(screen.getByText('Remover Item')).toBeInTheDocument();
    expect(screen.getByText('Limpar Carrinho')).toBeInTheDocument();
  });

  it('should maintain cart state across re-renders', () => {
    const { rerender } = renderWithCartProvider();
    
    // O carrinho deve manter o estado mesmo após re-render
    rerender(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    
    expect(screen.getByTestId('total-items')).toHaveTextContent('0');
  });
});
