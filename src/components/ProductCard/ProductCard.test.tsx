import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductCard from './ProductCard';
import { IProduct } from '../../services';

const mockProduct: IProduct = {
  id: '1',
  name: 'Teste Produto',
  description: 'Descrição do produto teste',
  price: 99.99,
  image: '/test-image.jpg',
  tags: [
    { label: 'Proteção Solar', type: 'protection' },
    { label: 'Rosto', type: 'face' }
  ]
};

const mockProps = {
  product: mockProduct,
  onProductClick: jest.fn(),
  onBuyClick: jest.fn(),
};

describe('ProductCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render product information correctly', () => {
    render(<ProductCard {...mockProps} />);
    
    expect(screen.getByText('Teste Produto')).toBeInTheDocument();
    expect(screen.getByText('Descrição do produto teste')).toBeInTheDocument();
    expect(screen.getByText('R$ 99,99')).toBeInTheDocument();
  });

  it('should render product image with correct attributes', () => {
    render(<ProductCard {...mockProps} />);
    
    const image = screen.getByAltText('Teste Produto');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/test-image.jpg');
  });

  it('should call onProductClick when card is clicked', () => {
    render(<ProductCard {...mockProps} />);
    
    const card = screen.getByTestId('product-card');
    fireEvent.click(card);
    
    expect(mockProps.onProductClick).toHaveBeenCalledWith('1');
    expect(mockProps.onProductClick).toHaveBeenCalledTimes(1);
  });

  it('should call onBuyClick when buy button is clicked', () => {
    render(<ProductCard {...mockProps} />);
    
    const buyButton = screen.getByRole('button', { name: /comprar/i });
    fireEvent.click(buyButton);
    
    expect(mockProps.onBuyClick).toHaveBeenCalledWith('1', expect.any(Object));
    expect(mockProps.onBuyClick).toHaveBeenCalledTimes(1);
  });

  // it('should stop propagation when buy button is clicked', () => {
  //   render(<ProductCard {...mockProps} />);
    
  //   const buyButton = screen.getByRole('button', { name: /comprar/i });
  //   const mockEvent = { stopPropagation: jest.fn() };
    
  //   fireEvent.click(buyButton, mockEvent);
    
  //   // Verifica se onProductClick não foi chamado quando clicamos no botão
  //   expect(mockProps.onProductClick).not.toHaveBeenCalled();
  // });

  it('should format price correctly', () => {
    const productWithDifferentPrice = {
      ...mockProduct,
      price: 1234.56
    };
    
    render(<ProductCard {...mockProps} product={productWithDifferentPrice} />);
    
    expect(screen.getByText('R$ 1234,56')).toBeInTheDocument();
  });

  it('should format price with zero decimals correctly', () => {
    const productWithWholePrice = {
      ...mockProduct,
      price: 100
    };
    
    render(<ProductCard {...mockProps} product={productWithWholePrice} />);
    
    expect(screen.getByText('R$ 100,00')).toBeInTheDocument();
  });
});
