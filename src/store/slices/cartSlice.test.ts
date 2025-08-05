import cartReducer, { addItem, removeItem, updateQuantity, clearCart, ICartItem } from './cartSlice';

interface CartState {
  items: ICartItem[];
}

describe('cartSlice', () => {
  const initialState: CartState = {
    items: [],
  };

  const mockItem: Omit<ICartItem, 'quantity'> = {
    id: '1',
    name: 'Produto Teste',
    price: 99.99,
    image: '/test.jpg',
  };

  const mockItemWithQuantity: ICartItem = {
    ...mockItem,
    quantity: 1,
  };

  it('deve retornar o estado inicial', () => {
    expect(cartReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('addItem', () => {
    it('deve adicionar um novo item ao carrinho', () => {
      const actual = cartReducer(initialState, addItem(mockItem));
      expect(actual.items).toHaveLength(1);
      expect(actual.items[0]).toEqual(mockItemWithQuantity);
    });

    it('deve incrementar quantidade de item existente', () => {
      const previousState: CartState = {
        items: [mockItemWithQuantity],
      };
      
      const actual = cartReducer(previousState, addItem(mockItem));
      expect(actual.items).toHaveLength(1);
      expect(actual.items[0]).toEqual({
        ...mockItemWithQuantity,
        quantity: 2,
      });
    });
  });

  describe('removeItem', () => {
    it('deve remover item do carrinho', () => {
      const previousState: CartState = {
        items: [mockItemWithQuantity],
      };
      
      const actual = cartReducer(previousState, removeItem('1'));
      expect(actual.items).toHaveLength(0);
    });

    it('não deve fazer nada se item não existir', () => {
      const previousState: CartState = {
        items: [mockItemWithQuantity],
      };
      
      const actual = cartReducer(previousState, removeItem('2'));
      expect(actual.items).toHaveLength(1);
      expect(actual.items[0]).toEqual(mockItemWithQuantity);
    });
  });

  describe('updateQuantity', () => {
    it('deve atualizar quantidade do item', () => {
      const previousState: CartState = {
        items: [mockItemWithQuantity],
      };
      
      const actual = cartReducer(previousState, updateQuantity({ id: '1', quantity: 3 }));
      expect(actual.items[0].quantity).toBe(3);
    });

    it('deve remover item quando quantidade for 0', () => {
      const previousState: CartState = {
        items: [mockItemWithQuantity],
      };
      
      const actual = cartReducer(previousState, updateQuantity({ id: '1', quantity: 0 }));
      expect(actual.items).toHaveLength(0);
    });

    it('deve remover item quando quantidade for negativa', () => {
      const previousState: CartState = {
        items: [mockItemWithQuantity],
      };
      
      const actual = cartReducer(previousState, updateQuantity({ id: '1', quantity: -1 }));
      expect(actual.items).toHaveLength(0);
    });

    it('não deve fazer nada se item não existir', () => {
      const previousState: CartState = {
        items: [mockItemWithQuantity],
      };
      
      const actual = cartReducer(previousState, updateQuantity({ id: '2', quantity: 5 }));
      expect(actual.items).toHaveLength(1);
      expect(actual.items[0]).toEqual(mockItemWithQuantity);
    });
  });

  describe('clearCart', () => {
    it('deve limpar todos os itens do carrinho', () => {
      const previousState: CartState = {
        items: [
          mockItemWithQuantity,
          { ...mockItemWithQuantity, id: '2', name: 'Produto 2' },
        ],
      };
      
      const actual = cartReducer(previousState, clearCart());
      expect(actual.items).toHaveLength(0);
    });

    it('deve manter estado vazio se carrinho já estiver vazio', () => {
      const actual = cartReducer(initialState, clearCart());
      expect(actual.items).toHaveLength(0);
    });
  });

  describe('múltiplas operações', () => {
    it('deve lidar com múltiplas operações sequenciais', () => {
      let state = initialState;
      
      // Adicionar primeiro item
      state = cartReducer(state, addItem(mockItem));
      expect(state.items).toHaveLength(1);
      
      // Adicionar segundo item
      const secondItem = { ...mockItem, id: '2', name: 'Produto 2' };
      state = cartReducer(state, addItem(secondItem));
      expect(state.items).toHaveLength(2);
      
      // Atualizar quantidade do primeiro item
      state = cartReducer(state, updateQuantity({ id: '1', quantity: 3 }));
      expect(state.items[0].quantity).toBe(3);
      
      // Remover segundo item
      state = cartReducer(state, removeItem('2'));
      expect(state.items).toHaveLength(1);
      expect(state.items[0].id).toBe('1');
      
      // Limpar carrinho
      state = cartReducer(state, clearCart());
      expect(state.items).toHaveLength(0);
    });
  });
});