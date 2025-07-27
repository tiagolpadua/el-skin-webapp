import { faCartShopping, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import CartModal from '../CartModal/CartModal';
import { useCartContext } from '../../context/CartContext';
import { useSearchContext } from '../../context/SearchContext';

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;

const StyledHeader = styled.header`
  background-color: ${({ theme }) => theme.colors.background.white};
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

const HeaderTop = styled.div`
  padding: ${({ theme }) => theme.spacing.md} 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.md};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.div`
  font-size: ${({ theme }) => theme.fontSize.base};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
  letter-spacing: 0.5px;
`;

const FooterLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const SearchBar = styled.div`
  flex: 2;
  max-width: 400px;
  margin: 0 ${({ theme }) => theme.spacing.xl};
  position: relative;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border.medium};
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  font-size: ${({ theme }) => theme.fontSize.base};
  outline: none;
  transition: border-color ${({ theme }) => theme.transitions.normal};
  padding-right: 80px;

  &:focus {
    border-color: ${({ theme }) => theme.colors.secondary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.tertiary};
  }
`;

const SearchButton = styled.button`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.round};
  color: ${({ theme }) => theme.colors.text.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color ${({ theme }) => theme.transitions.normal};

  &:hover {
    background-color: ${({ theme }) => theme.colors.button.hover};
  }
`;

const ClearSearchButton = styled.button`
  position: absolute;
  right: 45px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.round};
  color: ${({ theme }) => theme.colors.text.tertiary};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ${({ theme }) => theme.transitions.normal};
  z-index: 1;

  &:hover {
    background-color: ${({ theme }) => theme.colors.button.hover};
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

const CartButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.round};
  color: ${({ theme }) => theme.colors.text.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color ${({ theme }) => theme.transitions.normal};
  position: relative;

  &:hover {
    background-color: ${({ theme }) => theme.colors.button.hover};
  }
`;

const CartBadge = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  background: ${({ theme }) => theme.colors.primaryGradient};
  color: ${({ theme }) => theme.colors.text.white};
  border-radius: ${({ theme }) => theme.borderRadius.round};
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  min-width: 18px;
  animation: ${pulse} 2s infinite;
`;

const HeaderNav = styled.nav`
  background-color: ${({ theme }) => theme.colors.background.light};
  padding: 0.75rem 0;
`;

const NavMenu = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: ${({ theme }) => theme.spacing.xl};

  li a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.text.secondary};
    font-size: ${({ theme }) => theme.fontSize.sm};
    font-weight: ${({ theme }) => theme.fontWeight.medium};
    transition: color ${({ theme }) => theme.transitions.normal};

    &:hover {
      color: ${({ theme }) => theme.colors.secondary};
    }
  }
`;

const PromoBadge = styled.div`
  background-color: ${({ theme }) => theme.colors.promo};
  color: ${({ theme }) => theme.colors.text.white};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.xxl};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  white-space: nowrap;
`;

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
    <StyledHeader>
      <HeaderTop>
        <Container>
          <FooterLink to={'/'}>
            <Logo>
              <span>AL SKIN</span>
            </Logo>  
          </FooterLink> 
          
          <SearchBar>
            <SearchInput 
              type="text" 
              placeholder="O que você está procurando?"
              value={searchTerm}
              onChange={handleOnChangeBuscador}
            />
            <SearchButton type="button">
              <FontAwesomeIcon icon={faSearch} />
            </SearchButton>
            {searchTerm && (
              <ClearSearchButton 
                data-testid="clear-search-button"
                onClick={handleClearSearch}
                type="button"
                title="Limpar pesquisa"
              >
                <FontAwesomeIcon icon={faTimes} />
              </ClearSearchButton>
            )}
          </SearchBar>
          
          <HeaderActions>
            <CartButton onClick={handleOnClickCart} data-testid="cart-button" type="button" >
              <FontAwesomeIcon icon={faCartShopping} />
              {getTotalItems() > 0 && (
                <CartBadge>{getTotalItems()}</CartBadge>
              )}
            </CartButton>
          </HeaderActions>
        </Container>
      </HeaderTop>
      
      <HeaderNav>
        <Container>
          <NavMenu>
            <li><a href="#categorias">Categorias</a></li>
            <li><a href="#tipo-pele">Tipo de pele</a></li>
            <li><a href="#necessidade">Necessidade</a></li>
            <li><a href="#ingredientes">Ingredientes</a></li>
          </NavMenu>
          <PromoBadge>
            Kits até 50% OFF
          </PromoBadge>
        </Container>
      </HeaderNav>
      
      <CartModal
        isOpen={isCartModalOpen}
        onClose={handleCloseCart}
        items={items}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        onFinalizePurchase={handleFinalizePurchase}
      />
    </StyledHeader>
  );
}

export default Header;
