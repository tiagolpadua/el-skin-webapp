import { faCartShopping, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import CartModal from '../CartModal/CartModal';
import { useCartContext } from '../../context/CartContext';
import { useSearchContext } from '../../context/SearchContext';

function Header() {
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  
  const { items, updateQuantity, removeItem, getTotalItems } = useCartContext();
  const { searchTerm, setSearchTerm } = useSearchContext();

  function handleOnChangeBuscador(e: React.ChangeEvent<HTMLInputElement>) {
    const valor = e.target.value;
    setSearchTerm(valor);
    console.log('Valor buscado:', valor);
  }

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  function handleOnClickCart() {
    setIsCartModalOpen(true);
  }

  const handleCloseCart = () => {
    setIsCartModalOpen(false);
  };

  const handleFinalizePurchase = () => {
    console.log('Finalizando compra...');
    // Aqui você implementaria a lógica de checkout
    setIsCartModalOpen(false);
  };

  return (
    <header className="header">
      <div className="header-top">
        <div className="container">
          <Link className="footer-link" to={'/'}>
            <div className="logo">
              <span>AL SKIN</span>
            </div>  
          </Link> 
          
          <div className="search-bar">
            <input 
              type="text" 
              placeholder="O que você está procurando?"
              className="search-input"
              value={searchTerm}
              onChange={handleOnChangeBuscador}
            />
            <button className="search-button" type="button">
              <FontAwesomeIcon icon={faSearch} />
            </button>
            {searchTerm && (
              <button 
                className="clear-search-button" 
                data-testid="clear-search-button"
                onClick={handleClearSearch}
                type="button"
                title="Limpar pesquisa"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            )}
          </div>
          
          <div className="header-actions">
            <button className="cart-button" onClick={handleOnClickCart} data-testid="cart-button" type="button" >
              <FontAwesomeIcon icon={faCartShopping} />
              {getTotalItems() > 0 && (
                <span className="cart-badge">{getTotalItems()}</span>
              )}
            </button>
          </div>
        </div>
      </div>
      
      <nav className="header-nav">
        <div className="container">
          <ul className="nav-menu">
            <li><a href="#categorias">Categorias</a></li>
            <li><a href="#tipo-pele">Tipo de pele</a></li>
            <li><a href="#necessidade">Necessidade</a></li>
            <li><a href="#ingredientes">Ingredientes</a></li>
          </ul>
          <div className="promo-badge">
            Kits até 50% OFF
          </div>
        </div>
      </nav>
      
      {/* Modal do Carrinho */}
      <CartModal
        isOpen={isCartModalOpen}
        onClose={handleCloseCart}
        items={items}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        onFinalizePurchase={handleFinalizePurchase}
      />
    </header>
  );
}

export default Header;
