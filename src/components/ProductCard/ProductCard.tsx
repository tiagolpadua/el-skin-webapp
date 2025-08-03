import React from 'react';
import './ProductCard.css';
import { IProduct } from '../../service/productService';
import styled from 'styled-components';

interface ProductCardProps {
  product: IProduct;
  onProductClick: (productId: string) => void;
  onBuyClick: (productId: string, event: React.MouseEvent) => void;
}

/* </span>
              <span 
    key={`${product.id}-${tag.label || idx}-${tag.type || idx}`}
    className={`product-tag product-tag--${tag.type}`}
  >
    {tag.label}
  </span> */

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
      <div className="product-image">
        <img 
          src={product.image} 
          alt={product.name}
        />
      </div>
      
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        
        <div className="product-tags">
          {product.tags?.map((tag, idx) => (
            <ProductTag
              tagtype={tag.type}
              key={`${product.id}-${tag.label || idx}-${tag.type || idx}`}
            >
              {tag.label}
            </ProductTag>
          ))}
        </div>
        
        <div className="product-footer">
          <span className="product-price">
            {formatPrice(product.price)}
          </span>
          <button
            data-testid="buy-button"
            className="product-buy-button"
            onClick={(e) => onBuyClick(product.id, e)}
            type="button"
          >
            comprar
          </button>
        </div>
      </div>
    </StyledProductCard>
  );
};

const StyledProductCard = styled.a`
  background: white;
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  width: 100%;
  max-width: 300px;
  border: 1px solid black;
  padding: 0;
  text-align: left;
  font-family: inherit;
  text-decoration: none;
  display: block;

  &:hover {
    transform: translateY(-4px);
  }

  &:focus {
    outline-offset: 2px;
  }
`;

const ProductTag = styled.span<{ tagtype: 'protection' | 'face' }>`
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background-color: ${({ tagtype }) => 
    tagtype === 'protection' ? '#E3F2FD' : '#FCE4EC'};
  color: ${({ tagtype }) => 
    tagtype === 'protection' ? '#1976D2' : '#C2185B'};
`;

export default ProductCard;
