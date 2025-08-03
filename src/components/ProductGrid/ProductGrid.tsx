
import { useCallback, useEffect, useMemo } from 'react';
import { useCart } from '../../hooks/useCart';
import { useSearch } from '../../hooks/useSearch';
import { useProducts } from '../../hooks/useProducts';
import ProductCard from '../ProductCard/ProductCard';
import './ProductGrid.css';

function ProductGrid() {
  const title = 'nossos queridinhos estão aqui';
  
  const { search } = useSearch();
  const { addItem } = useCart();
  const { products, loading, error, loadProducts, getProductById } = useProducts();

  useEffect(() => {
    if (products.length === 0) {
      loadProducts();
    }
  }, [products.length, loadProducts]);

  const filteredProducts = useMemo(() => {
    if (!search) return products;
    
    return products.filter(product =>
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.description.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, products]);

  const handleProductClick = (productId: string) => {
    console.log(`Produto clicado: ${productId}`);
  };

  const handleBuyClick = useCallback((productId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    console.log(`Comprar produto: ${productId}`);

    const produtoComprado = getProductById(productId);

    if(!produtoComprado) {
      console.error(`Produto com ID ${productId} não encontrado.`);
      return;
    }

    addItem(produtoComprado);
  }, [getProductById, addItem]);

  if (loading) {
    return (
      <section className="product-grid-section">
        <div className="product-grid-container">
          <h2 className="product-grid-title">{title}</h2>
          <div className="product-grid">
            <p>Carregando produtos...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="product-grid-section">
        <div className="product-grid-container">
          <h2 className="product-grid-title">{title}</h2>
          <div className="product-grid">
            <p>Erro ao carregar produtos: {error}</p>
          </div>
        </div>
      </section>
    );
  }

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
