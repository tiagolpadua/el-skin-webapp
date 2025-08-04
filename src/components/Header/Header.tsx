import { faCartShopping, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import CartModal from '../CartModal/CartModal';
import './Header.css';
// import { useCartContext } from '../../context/CartContext';
import styled from 'styled-components';
import { useSearch } from '../../hooks/useSearch';

const Logo = styled.div`
  font-size: ${({ theme }) => theme.fontSize.base};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
  letter-spacing: 0.5px;
`;

function Header() {
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const {term, setTerm} = useSearch();
  
  const handleCloseCart = () => {
    setIsCartModalOpen(false);
  };

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTerm(e.target.value);
  }

  function onClickSearch(): void {
    console.log(`Você pesquisou por: ${term}`);
  }

  function handleOnClickCart() {
    setIsCartModalOpen(true);
  }

  return (
    <header className="header">
      <div className="header-top">
        <div className="container">
          <Logo>
            AL SKIN
          </Logo>

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
