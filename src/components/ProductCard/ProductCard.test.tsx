import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductCard from './ProductCard';
import { IProduct } from '../../service/productService';
import About from '../../pages/About/About';

const product: IProduct = {
  id: '1',
  name: 'Produto Teste',
  description: 'Descrição do produto teste',
  price: 99.99,
  image: 'https://via.placeholder.com/150',
  tags: [
    { label: 'Proteção', type: 'protection' },
    { label: 'Rosto', type: 'face' }
  ]
};

const handleProductClick = jest.fn();
const handleBuyClick = jest.fn();

test('componente ProductCard deve ser renderizado', () => {

  // Act
  render(<ProductCard
    key={product.id}
    product={product}
    onProductClick={handleProductClick}
    onBuyClick={handleBuyClick}
  />);

  // Assert
  expect(screen.getByText('Produto Teste')).toBeInTheDocument();
});

test('deve acionar o método onProductClick quando o produto for clicado', () => {
  render(<ProductCard
    key={product.id}
    product={product}
    onProductClick={handleProductClick}
    onBuyClick={handleBuyClick}
  />);

  const card = screen.getByTestId('product-card');
  fireEvent.click(card);

  expect(handleProductClick).toBeCalledWith('1');
  expect(handleProductClick).toHaveBeenCalledTimes(1);
});
