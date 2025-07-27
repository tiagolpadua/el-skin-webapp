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
  background: ${({ theme }) => theme.semantic.colors.surface.primary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.md};
  transition: all ${({ theme }) => theme.transitions.normal};
  cursor: pointer;
  width: 100%;
  max-width: 300px;
  border: 1px solid ${({ theme }) => theme.semantic.colors.border.primary};
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
    outline: 2px solid ${({ theme }) => theme.colors.primary[600]};
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
  padding: ${({ theme }) => theme.spacing[8]};

  ${media.md} {
    padding: ${({ theme }) => theme.spacing[4]};
  }
`;

const ProductName = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.semantic.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing[2]} 0;
  line-height: ${({ theme }) => theme.lineHeights.normal};

  ${media.md} {
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
`;

const ProductDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.semantic.colors.text.secondary};
  margin: 0 0 ${({ theme }) => theme.spacing[4]} 0;
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  ${media.md} {
    font-size: ${({ theme }) => theme.fontSizes.xs};
  }
`;

const ProductTags = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[2]};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  flex-wrap: wrap;
`;

const ProductTag = styled.span<{ tagType: 'protection' | 'face' }>`
  padding: ${({ theme }) => theme.spacing[1]} ${({ theme }) => theme.spacing[6]};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background-color: ${({ theme, tagType }) => 
    tagType === 'protection' 
      ? theme.colors.primary[100] 
      : theme.colors.secondary[100]};
  color: ${({ theme, tagType }) => 
    tagType === 'protection' 
      ? theme.colors.primary[800] 
      : theme.colors.secondary[800]};
`;

const ProductFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${media.sm} {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing[6]};
    align-items: stretch;
  }
`;

const ProductPrice = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.semantic.colors.text.primary};

  ${media.md} {
    font-size: ${({ theme }) => theme.fontSizes.base};
  }
`;

const ProductBuyButton = styled.button`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary[600]}, ${({ theme }) => theme.colors.primary[700]});
  color: ${({ theme }) => theme.semantic.colors.text.inverse};
  border: none;
  padding: 10px ${({ theme }) => theme.spacing[8]};
  border-radius: ${({ theme }) => theme.borderRadius['2xl']};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.normal};
  text-transform: lowercase;

  &:hover {
    background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary[700]}, ${({ theme }) => theme.colors.primary[800]});
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.shadows.primary};
  }

  &:active {
    transform: translateY(0);
  }

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary[600]};
    outline-offset: 2px;
  }

  ${media.md} {
    padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[4]};
    font-size: ${({ theme }) => theme.fontSizes.xs};
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
