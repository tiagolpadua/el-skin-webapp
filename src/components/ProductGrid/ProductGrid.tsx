import React from 'react';
import './ProductGrid.css';
import ProductCard, { IProduct } from '../ProductCard/ProductCard';
import ProductImg from '../../assets/product.png';

const defaultProducts: IProduct[] = [
  {
    id: '1',
    name: 'Protetor solar AL SUN',
    description: 'alta proteção e pele luminosa sem grude nem pelo encarnado',
    price: 79.90,
    image: ProductImg,
    tags: [
      { label: 'proteção', type: 'protection' },
      { label: 'rosto', type: 'face' }
    ]
  },
  {
    id: '2',
    name: 'Protetor solar AL SUN',
    description: 'alta proteção e pele luminosa sem grude nem pelo encarnado',
    price: 79.90,
    image: ProductImg,
    tags: [
      { label: 'proteção', type: 'protection' },
      { label: 'rosto', type: 'face' }
    ]
  },
  {
    id: '3',
    name: 'Protetor solar AL SUN',
    description: 'alta proteção e pele luminosa sem grude nem pelo encarnado',
    price: 79.90,
    image: ProductImg,
    tags: [
      { label: 'proteção', type: 'protection' },
      { label: 'rosto', type: 'face' }
    ]
  },
  {
    id: '4',
    name: 'Protetor solar AL SUN',
    description: 'alta proteção e pele luminosa sem grude nem pelo encarnado',
    price: 79.90,
    image: ProductImg,
    tags: [
      { label: 'proteção', type: 'protection' },
      { label: 'rosto', type: 'face' }
    ]
  },
  {
    id: '5',
    name: 'Protetor solar AL SUN',
    description: 'alta proteção e pele luminosa sem grude nem pelo encarnado',
    price: 79.90,
    image: ProductImg,
    tags: [
      { label: 'proteção', type: 'protection' },
      { label: 'rosto', type: 'face' }
    ]
  },
  {
    id: '6',
    name: 'Protetor solar AL SUN',
    description: 'alta proteção e pele luminosa sem grude nem pelo encarnado',
    price: 79.90,
    image: ProductImg,
    tags: [
      { label: 'proteção', type: 'protection' },
      { label: 'rosto', type: 'face' }
    ]
  },
  {
    id: '7',
    name: 'Protetor solar AL SUN',
    description: 'alta proteção e pele luminosa sem grude nem pelo encarnado',
    price: 79.90,
    image: ProductImg,
    tags: [
      { label: 'proteção', type: 'protection' },
      { label: 'rosto', type: 'face' }
    ]
  },
  {
    id: '8',
    name: 'Protetor solar AL SUN',
    description: 'alta proteção e pele luminosa sem grude nem pelo encarnado',
    price: 79.90,
    image: ProductImg,
    tags: [
      { label: 'proteção', type: 'protection' },
      { label: 'rosto', type: 'face' }
    ]
  }
];

function ProductGrid() {
  const title = 'nossos queridinhos estão aqui';
  const products = defaultProducts;

  const handleProductClick = (productId: string) => {
    console.log(`Produto clicado: ${productId}`);
  };

  const handleBuyClick = (productId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    console.log(`Comprar produto: ${productId}`);
  };

  return (
    <section className="product-grid-section">
      <div className="product-grid-container">
        <h2 className="product-grid-title">{title}</h2>
        
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onProductClick={handleProductClick}
              onBuyClick={handleBuyClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductGrid;
