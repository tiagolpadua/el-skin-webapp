import { faCartShopping, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useSearchContext } from '../../context/SearchContext';
import './Header.css';

function Header() {
  const { search, setSearch } = useSearchContext();

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  function onClickSearch(): void {
    console.log(`Você pesquisou por: ${search}`);
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
            <button className="cart-button">
              <FontAwesomeIcon icon={faCartShopping} />
            </button>
          </div>
        </div>
      </div>

      <nav className="header-nav">
      </nav>
      
    </header>
  );
}

export default Header;
