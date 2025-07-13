import { faCartShopping, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import './Header.css';

function Header() {
  const [texto, setTexto] = useState('');

  function handleOnChangeBuscador(e: React.ChangeEvent<HTMLInputElement>) {
    const valor = e.target.value;
    setTexto(valor);
    console.log('Valor buscado:', valor);
  }

  function handleOnClickCart() {
    console.log('click no carrinho');
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
              onChange={handleOnChangeBuscador}
            />
            <button className="search-button">
              <FontAwesomeIcon icon={faSearch} />
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
    </header>
  );
}

export default Header;
