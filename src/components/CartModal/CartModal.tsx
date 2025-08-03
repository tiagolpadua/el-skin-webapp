import { faMinus, faPlus, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './CartModal.css';
import { useCart } from '../../hooks/useCart';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function formatPrice(price: number): string {
  return `R$ ${price.toFixed(2).replace('.', ',')}`;
}

const CartModal: React.FC<CartModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const { items, updateQuantity, removeItem: removerProduto, totalPrice: totalPriceMemo } = useCart();

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleBackdropKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div 
      className="cart-modal-overlay" 
      onClick={handleBackdropClick}
      onKeyDown={handleBackdropKeyDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-modal-title"
      tabIndex={-1}
    >
      <div className="cart-modal">
        <div className="cart-modal-header">
          <h2 id="cart-modal-title">Carrinho</h2>
          <button className="cart-modal-close" onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        <div className="cart-modal-content">
          {items.length === 0 ? (
            <div className="cart-empty">
              <p>Seu carrinho está vazio</p>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {items.map((item) => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-image">
                      <img src={item.image} alt={item.name} />
                    </div>
                    
                    <div className="cart-item-info">
                      <h3 className="cart-item-name">{item.name}</h3>
                      
                      <div className="cart-item-controls">
                        <span className="quantity-label">Quantidade</span>
                        <div className="quantity-controls">
                          <button 
                            className="quantity-btn"
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          >
                            <FontAwesomeIcon icon={faMinus} />
                          </button>
                          <span className="quantity-display">{item.quantity}</span>
                          <button 
                            className="quantity-btn"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <FontAwesomeIcon icon={faPlus} />
                          </button>
                        </div>
                        
                        <button 
                          className="remove-btn"
                          onClick={() => removerProduto(item.id)}
                          title="Remover item"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </div>
                      
                      <div className="cart-item-price">
                        {formatPrice(item.price * item.quantity)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-total">
                <span className="total-label">Total</span>
                <span className="total-price">{formatPrice(totalPriceMemo)}</span>
              </div>

              <button 
                className="finalize-btn"
              >
                Finalizar compra
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartModal;
