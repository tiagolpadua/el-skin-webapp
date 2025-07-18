import React from 'react';
import './ProductCard.css';
import { IProduct } from '../../service/productService';

interface ProductCardProps {
  product: IProduct;
  onProductClick: (productId: string) => void;
  onBuyClick: (productId: string, event: React.MouseEvent) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onProductClick,
  onBuyClick
}) => {
  const formatPrice = (price: number): string => {
    return `R$ ${price.toFixed(2).replace('.', ',')}`;
  };

  return (
    <a
      className="product-card"
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
          {product.tags.map((tag) => (
            <span 
              key={`${product.id}-${tag.label}-${tag.type}`}
              className={`product-tag product-tag--${tag.type}`}
            >
              {tag.label}
            </span>
          ))}
        </div>
        
        <div className="product-footer">
          <span className="product-price">
            {formatPrice(product.price)}
          </span>
          <button 
            className="product-buy-button"
            onClick={(e) => onBuyClick(product.id, e)}
            type="button"
          >
            comprar
          </button>
        </div>
      </div>
    </a>
  );
};

export default ProductCard;
