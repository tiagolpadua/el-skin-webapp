
import { useCallback, useEffect, useState } from 'react';
import { useCart } from '../../hooks/useCart';
import { useProducts } from '../../hooks/useProducts';
import { useSearch } from '../../hooks/useSearch';
import { IProduct } from '../../service/productService';
import ProductCard from '../ProductCard/ProductCard';
import './ProductGrid.css';

function ProductGrid() {
  const title = 'nossos queridinhos estão aqui';
  // const [products, setProducts] = useState<IProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  
  // const { search } = useSearchContext();
  const {term} = useSearch();
  const { addItem } = useCart();

  const { products, loadProducts } = useProducts();

  useEffect(() => {
    if (products.length === 0) {
      loadProducts();
    }
  }, [products.length, loadProducts]);

  useEffect(() => {
    if (term) {
      setFilteredProducts(products.filter(product =>
        product.name.toLowerCase().includes(term.toLowerCase()) ||
        product.description.toLowerCase().includes(term.toLowerCase())
      ));
    } else {
      setFilteredProducts([...products]);
    }
  }, [term, products]);

  const handleProductClick = (productId: string) => {
    console.log(`Produto clicado: ${productId}`);
  };

  const handleBuyClick = useCallback((productId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    console.log(`Comprar produto: ${productId}`);

    const produtoComprado = products.find(product => product.id === productId);

    if(!produtoComprado) {
      console.error(`Produto com ID ${productId} não encontrado.`);
      return;
    }

    addItem(produtoComprado);
  }, [products, addItem]);

  return (
    <section className="product-grid-section">
      <div className="product-grid-container">

        <h2 className="product-grid-title">{title}</h2>
        
        <div className="product-grid">
          {filteredProducts.map((product) => (
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
