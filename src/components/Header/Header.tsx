import { faCartShopping, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useSearchContext } from '../../context/SearchContext';
import './Header.css';
import CartModal from '../CartModal/CartModal';
import { useCartContext } from '../../context/CartContext';

function Header() {
  const { search, setSearch } = useSearchContext();
  const { items } = useCartContext();
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  
  const handleCloseCart = () => {
    setIsCartModalOpen(false);
  };

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  function onClickSearch(): void {
    console.log(`Você pesquisou por: ${search}`);
  }

  function handleOnClickCart() {
    setIsCartModalOpen(true);
  }

  return (
    <header className="header">
      <div className="header-top">
        <div className="container">

          <div className="logo">
            <span>AL SKIN</span>
          </div>

          <div className="search-bar">
            <input 
              type="text" 
              placeholder="O que você está procurando?"
              className="search-input"
              onChange={handleOnChange}/>
            <button className="search-button" onClick={onClickSearch}>
              <FontAwesomeIcon icon={faSearch}/>
            </button>
          </div>

          <div className="header-actions">
            <button className="cart-button" onClick={handleOnClickCart}>
              <FontAwesomeIcon icon={faCartShopping} />
            </button>
          </div>
        </div>
      </div>

      <nav className="header-nav">
      </nav>

      <CartModal
        isOpen={isCartModalOpen}
        onClose={handleCloseCart}
      />
      
    </header>
  );
}

export default Header;
