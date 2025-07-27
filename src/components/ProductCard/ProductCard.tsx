import React from 'react';
import styled from 'styled-components';
import { IProduct } from '../../services';
import { media } from '../../styles/theme';

interface ProductCardProps {
  product: IProduct;
  onProductClick: (productId: string) => void;
  onBuyClick: (productId: string, event: React.MouseEvent) => void;
}

const StyledProductCard = styled.a`
  background: ${({ theme }) => theme.colors.background.card};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.md};
  transition: all ${({ theme }) => theme.transitions.normal};
  cursor: pointer;
  width: 100%;
  max-width: 300px;
  border: 1px solid ${({ theme }) => theme.colors.border.dark};
  padding: 0;
  text-align: left;
  font-family: inherit;
  text-decoration: none;
  display: block;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

const ProductImage = styled.div`
  width: 100%;
  height: 200px;
  background-color: #C8B99C;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProductInfo = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};

  ${media.md} {
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

const ProductName = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.base};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.sm} 0;
  line-height: ${({ theme }) => theme.lineHeight.normal};

  ${media.md} {
    font-size: ${({ theme }) => theme.fontSize.sm};
  }
`;

const ProductDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0 0 ${({ theme }) => theme.spacing.md} 0;
  line-height: ${({ theme }) => theme.lineHeight.relaxed};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  ${media.md} {
    font-size: ${({ theme }) => theme.fontSize.xs};
  }
`;

const ProductTags = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
`;

const ProductTag = styled.span<{ tagType: 'protection' | 'face' }>`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background-color: ${({ theme, tagType }) => 
    tagType === 'protection' 
      ? theme.colors.tag.protection.bg 
      : theme.colors.tag.face.bg};
  color: ${({ theme, tagType }) => 
    tagType === 'protection' 
      ? theme.colors.tag.protection.text 
      : theme.colors.tag.face.text};
`;

const ProductFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${media.sm} {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.lg};
    align-items: stretch;
  }
`;

const ProductPrice = styled.span`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};

  ${media.md} {
    font-size: ${({ theme }) => theme.fontSize.base};
  }
`;

const ProductBuyButton = styled.button`
  background: ${({ theme }) => theme.colors.primaryGradient};
  color: ${({ theme }) => theme.colors.text.white};
  border: none;
  padding: 10px ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.xxl};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.normal};
  text-transform: lowercase;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryGradientHover};
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.shadows.primary};
  }

  &:active {
    transform: translateY(0);
  }

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }

  ${media.md} {
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
    font-size: ${({ theme }) => theme.fontSize.xs};
  }

  ${media.sm} {
    width: 100%;
    text-align: center;
  }
`;

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onProductClick,
  onBuyClick
}) => {
  const formatPrice = (price: number): string => {
    return `R$ ${price.toFixed(2).replace('.', ',')}`;
  };

  return (
    <StyledProductCard
      data-testid="product-card"
      onClick={() => onProductClick(product.id)}>
      <ProductImage>
        <img 
          src={product.image} 
          alt={product.name}
        />
      </ProductImage>
      
      <ProductInfo>
        <ProductName>{product.name}</ProductName>
        <ProductDescription>{product.description}</ProductDescription>
        
        <ProductTags>
          {product.tags.map((tag) => (
            <ProductTag 
              key={`${product.id}-${tag.label}-${tag.type}`}
              tagType={tag.type}
            >
              {tag.label}
            </ProductTag>
          ))}
        </ProductTags>
        
        <ProductFooter>
          <ProductPrice>
            {formatPrice(product.price)}
          </ProductPrice>
          <ProductBuyButton 
            onClick={(e) => onBuyClick(product.id, e)}
            type="button"
          >
            comprar
          </ProductBuyButton>
        </ProductFooter>
      </ProductInfo>
    </StyledProductCard>
  );
};

export default ProductCard;
