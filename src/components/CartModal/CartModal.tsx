import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { media } from '../../styles/theme';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onFinalizePurchase: () => void;
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideIn = keyframes`
  from {
    transform: scale(0.9) translateY(-20px);
    opacity: 0;
  }
  to {
    transform: scale(1) translateY(0);
    opacity: 1;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.semantic.colors.background.overlay};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: ${({ theme }) => theme.zIndex.modal};
  backdrop-filter: blur(2px);
  animation: ${fadeIn} ${({ theme }) => theme.transitions.normal};
`;

const Modal = styled.div`
  background: ${({ theme }) => theme.semantic.colors.surface.primary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows['2xl']};
  color: ${({ theme }) => theme.semantic.colors.text.inverse};
  animation: ${slideIn} ${({ theme }) => theme.transitions.normal};

  ${media.md} {
    width: 95%;
    max-height: 95vh;
  }
`;

const ModalHeader = styled.div`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary[600]}, ${({ theme }) => theme.colors.primary[700]});
  padding: ${({ theme }) => theme.spacing[8]};
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  ${media.md} {
    padding: ${({ theme }) => theme.spacing[6]};
  }
`;

const ModalTitle = styled.h2`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.semantic.colors.text.inverse};

  ${media.md} {
    font-size: ${({ theme }) => theme.fontSizes.xl};
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.semantic.colors.text.inverse};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing[1]};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const ModalContent = styled.div`
  padding: ${({ theme }) => theme.spacing[8]};
  max-height: 60vh;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.semantic.colors.surface.primary};
  }

  &::-webkit-scrollbar-thumb {
    background: #6b7280;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #9ca3af;
  }

  ${media.md} {
    padding: ${({ theme }) => theme.spacing[6]};
  }
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: 40px ${({ theme }) => theme.spacing[8]};
  color: ${({ theme }) => theme.semantic.colors.text.tertiary};
`;

const CartItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[8]};
  margin-bottom: ${({ theme }) => theme.spacing[8]};
`;

const CartItem = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[6]};
  padding: ${({ theme }) => theme.spacing[6]};
  background: ${({ theme }) => theme.semantic.colors.surface.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  position: relative;

  ${media.md} {
    flex-direction: column;
    gap: 10px;
  }
`;

const CartItemImage = styled.div`
  width: 80px;
  height: 80px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  ${media.md} {
    width: 60px;
    height: 60px;
  }
`;

const CartItemInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const CartItemName = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  margin: 0;
  color: ${({ theme }) => theme.semantic.colors.text.inverse};
  line-height: ${({ theme }) => theme.lineHeights.normal};
`;

const CartItemControls = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;

  ${media.md} {
    justify-content: space-between;
  }
`;

const QuantityLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: #ccc;
  margin-right: 10px;
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[1]};
  background: ${({ theme }) => theme.semantic.colors.border.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  padding: ${({ theme }) => theme.spacing[1]};

  ${media.md} {
    order: 1;
  }
`;

const QuantityButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.semantic.colors.text.inverse};
  width: 30px;
  height: 30px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color ${({ theme }) => theme.transitions.fast};
  font-size: ${({ theme }) => theme.fontSizes.sm};

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const QuantityDisplay = styled.span`
  background: ${({ theme }) => theme.semantic.colors.surface.secondary};
  color: ${({ theme }) => theme.semantic.colors.text.inverse};
  padding: ${({ theme }) => theme.spacing[1]} ${({ theme }) => theme.spacing[6]};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  min-width: 40px;
  text-align: center;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.error[600]};
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing[2]};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  transition: background-color ${({ theme }) => theme.transitions.fast};
  margin-left: auto;

  &:hover {
    background: rgba(239, 68, 68, 0.1);
  }

  ${media.md} {
    order: 2;
    margin-left: 0;
  }
`;

const CartItemPrice = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.primary[600]};
  margin-top: auto;
`;

const CartTotal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing[8]} 0;
  border-top: 1px solid ${({ theme }) => theme.semantic.colors.border.secondary};
  margin-top: ${({ theme }) => theme.spacing[8]};
`;

const TotalLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.semantic.colors.text.inverse};
`;

const TotalPrice = styled.span`
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.primary[600]};
`;

const FinalizeButton = styled.button`
  width: 100%;
  padding: ${({ theme }) => theme.spacing[6]};
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary[600]}, ${({ theme }) => theme.colors.primary[700]});
  color: ${({ theme }) => theme.semantic.colors.text.inverse};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  margin-top: 10px;

  &:hover {
    background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary[700]}, ${({ theme }) => theme.colors.primary[800]});
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.shadows.primary};
  }
`;

const CartModal: React.FC<CartModalProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onFinalizePurchase
}) => {
  if (!isOpen) return null;

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const formatPrice = (price: number): string => {
    return `R$ ${price.toFixed(2).replace('.', ',')}`;
  };

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
    <ModalOverlay 
      onClick={handleBackdropClick}
      onKeyDown={handleBackdropKeyDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-modal-title"
      tabIndex={-1}
    >
      <Modal>
        <ModalHeader>
          <ModalTitle id="cart-modal-title">Carrinho</ModalTitle>
          <CloseButton onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} />
          </CloseButton>
        </ModalHeader>

        <ModalContent>
          {items.length === 0 ? (
            <EmptyCart>
              <p>Seu carrinho está vazio</p>
            </EmptyCart>
          ) : (
            <>
              <CartItems>
                {items.map((item) => (
                  <CartItem key={item.id}>
                    <CartItemImage>
                      <img src={item.image} alt={item.name} />
                    </CartItemImage>
                    
                    <CartItemInfo>
                      <CartItemName>{item.name}</CartItemName>
                      
                      <CartItemControls>
                        <QuantityLabel>Quantidade</QuantityLabel>
                        <QuantityControls>
                          <QuantityButton 
                            onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          >
                            <FontAwesomeIcon icon={faMinus} />
                          </QuantityButton>
                          <QuantityDisplay>{item.quantity}</QuantityDisplay>
                          <QuantityButton 
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          >
                            <FontAwesomeIcon icon={faPlus} />
                          </QuantityButton>
                        </QuantityControls>
                        
                        <RemoveButton 
                          onClick={() => onRemoveItem(item.id)}
                          title="Remover item"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </RemoveButton>
                      </CartItemControls>
                      
                      <CartItemPrice>
                        {formatPrice(item.price * item.quantity)}
                      </CartItemPrice>
                    </CartItemInfo>
                  </CartItem>
                ))}
              </CartItems>

              <CartTotal>
                <TotalLabel>Total</TotalLabel>
                <TotalPrice>{formatPrice(total)}</TotalPrice>
              </CartTotal>

              <FinalizeButton 
                onClick={onFinalizePurchase}
              >
                Finalizar compra
              </FinalizeButton>
            </>
          )}
        </ModalContent>
      </Modal>
    </ModalOverlay>
  );
};

export default CartModal;
