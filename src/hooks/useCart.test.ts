import { renderHook, act } from '@testing-library/react';
import { useCart } from './useCart';

describe('useCart', () => {
  it('should initialize with empty cart', () => {
    const { result } = renderHook(() => useCart());
    
    expect(result.current.items).toEqual([]);
    expect(result.current.getTotalItems()).toBe(0);
    expect(result.current.getTotalPrice()).toBe(0);
  });

  it('should add new item to cart', () => {
    const { result } = renderHook(() => useCart());
    
    const newItem = {
      id: '1',
      name: 'Produto Teste',
      price: 99.99,
      image: '/test.jpg'
    };

    act(() => {
      result.current.addItem(newItem);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0]).toEqual({
      ...newItem,
      quantity: 1
    });
  });

  it('should increase quantity when adding existing item', () => {
    const { result } = renderHook(() => useCart());
    
    const item = {
      id: '1',
      name: 'Produto Teste',
      price: 99.99,
      image: '/test.jpg'
    };

    act(() => {
      result.current.addItem(item);
      result.current.addItem(item);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].quantity).toBe(2);
  });

  it('should remove item from cart', () => {
    const { result } = renderHook(() => useCart());
    
    const item = {
      id: '1',
      name: 'Produto Teste',
      price: 99.99,
      image: '/test.jpg'
    };

    act(() => {
      result.current.addItem(item);
    });

    expect(result.current.items).toHaveLength(1);

    act(() => {
      result.current.removeItem('1');
    });

    expect(result.current.items).toHaveLength(0);
  });

  it('should update item quantity', () => {
    const { result } = renderHook(() => useCart());
    
    const item = {
      id: '1',
      name: 'Produto Teste',
      price: 99.99,
      image: '/test.jpg'
    };

    act(() => {
      result.current.addItem(item);
    });

    act(() => {
      result.current.updateQuantity('1', 5);
    });

    expect(result.current.items[0].quantity).toBe(5);
  });

  it('should remove item when quantity is set to 0', () => {
    const { result } = renderHook(() => useCart());
    
    const item = {
      id: '1',
      name: 'Produto Teste',
      price: 99.99,
      image: '/test.jpg'
    };

    act(() => {
      result.current.addItem(item);
    });

    act(() => {
      result.current.updateQuantity('1', 0);
    });

    expect(result.current.items).toHaveLength(0);
  });

  it('should clear entire cart', () => {
    const { result } = renderHook(() => useCart());
    
    const items = [
      { id: '1', name: 'Produto 1', price: 99.99, image: '/test1.jpg' },
      { id: '2', name: 'Produto 2', price: 149.99, image: '/test2.jpg' }
    ];

    act(() => {
      items.forEach(item => result.current.addItem(item));
    });

    expect(result.current.items).toHaveLength(2);

    act(() => {
      result.current.clearCart();
    });

    expect(result.current.items).toHaveLength(0);
  });

  it('should calculate total items correctly', () => {
    const { result } = renderHook(() => useCart());
    
    const items = [
      { id: '1', name: 'Produto 1', price: 99.99, image: '/test1.jpg' },
      { id: '2', name: 'Produto 2', price: 149.99, image: '/test2.jpg' }
    ];

    act(() => {
      result.current.addItem(items[0]);
      result.current.addItem(items[0]); // quantidade 2
      result.current.addItem(items[1]); // quantidade 1
    });

    expect(result.current.getTotalItems()).toBe(3);
  });

  it('should calculate total price correctly', () => {
    const { result } = renderHook(() => useCart());
    
    const items = [
      { id: '1', name: 'Produto 1', price: 100, image: '/test1.jpg' },
      { id: '2', name: 'Produto 2', price: 200, image: '/test2.jpg' }
    ];

    act(() => {
      result.current.addItem(items[0]);
      result.current.addItem(items[0]); // 2 × 100 = 200
      result.current.addItem(items[1]); // 1 × 200 = 200
    });

    expect(result.current.getTotalPrice()).toBe(400);
  });

  it('should handle non-existent item removal gracefully', () => {
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.removeItem('non-existent-id');
    });

    expect(result.current.items).toHaveLength(0);
  });

  it('should handle non-existent item quantity update gracefully', () => {
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.updateQuantity('non-existent-id', 5);
    });

    expect(result.current.items).toHaveLength(0);
  });
});
