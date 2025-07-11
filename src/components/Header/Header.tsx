import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Header.css';
import { faCartShopping, faSearch } from '@fortawesome/free-solid-svg-icons';

function Header() {
  // let texto = '555';
  // https://react.dev/reference/react/useState

  const [texto, setTexto] = useState('');

  const [contador, setContador] = useState(0);

  const [hora, setHora] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setHora(new Date());
    }, 1000);

    // Cleanup na desmontagem do componente
    return () => clearInterval(timer);
  }, []);

  function handleOnChangeBuscador(e: React.ChangeEvent<HTMLInputElement>) {
    const valor = e.target.value;
    setTexto(valor);
    console.log('Valor buscado:', valor);
  }

  function handleOnClickCart() {
    setContador(contador + 1);
    setContador(contador + 1);
    setContador(contador + 1);
    setContador(contador + 1);
    setContador(c => c + 1);
    setContador(c => c + 1);
    setContador(c => c + 1);
    setContador(c => c + 1);
    setContador(c => c + 1);
    setContador(c => c + 1);
    console.log('Contador de carrinho:', contador + 1);
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
              // onChange={(e) => {
              //   setTexto(e.target.value);
              //   console.log('Valor buscado:', texto);
              // }}
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

      {/* <div className="center-text">
        Valor buscado: {texto}
      </div>
      <div className="center-text">
        Valor Contador: {contador}
      </div>
      <div className="center-text">
        Hora atual: {hora.toLocaleTimeString()}
      </div> */}
    </header>
  );
}

export default Header;
