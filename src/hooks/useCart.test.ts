import { renderHook } from '@testing-library/react';
import { useCart } from './useCart';
import { act } from 'react';

it('deve inicializar corretamente o carrinho vazio', () => {
  // Arrange
  // Act
  const { result } = renderHook(() => useCart());


  // Assert
  expect(result.current.items).toEqual([]);
  expect(result.current.getTotalItems()).toBe(0);
  expect(result.current.totalPrice).toBe(0);
});

it('deve adicionar um item ao carrinho', () => {
  // Arrange
  const { result } = renderHook(() => useCart());

  // Act
  const newItem = {
    id: '1',
    name: 'Produto Teste',
    price: 99.99,
    image: '/test.jpg'
  };

  act(() => {
    result.current.addItem(newItem);
  });

  // Assert
  expect(result.current.items).toHaveLength(1);
  expect(result.current.items[0]).toEqual({
    ...newItem,
    quantity: 1
  });
  expect(result.current.totalPrice).toBe(99.99);
});

it('deve adicionar um item ao carrinho', () => {
  // Arrange
  const { result } = renderHook(() => useCart());

  // Act
  const newItem = {
    id: '1',
    name: 'Produto Teste',
    price: 99.99,
    image: '/test.jpg'
  };

  act(() => {
    result.current.addItem(newItem);
  });

  act(() => {
    result.current.addItem(newItem);
  });

  // Assert
  expect(result.current.items).toHaveLength(1);
  expect(result.current.items[0]).toEqual({
    ...newItem,
    quantity: 2
  });
  expect(result.current.totalPrice).toBe(199.98);
});
