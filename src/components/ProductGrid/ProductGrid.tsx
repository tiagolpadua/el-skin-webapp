import React, { useEffect, useMemo } from 'react';
import './ProductGrid.css';
import ProductCard from '../ProductCard/ProductCard';
import { productService, IProduct } from '../../services';
import { useCartContext } from '../../context/CartContext';
import { useSearchContext } from '../../context/SearchContext';

function ProductGrid() {
  const title = 'nossos queridinhos estão aqui';
  // const products = defaultProducts;

  const [products, setProducts] = React.useState<IProduct[]>([]);
  const { addItem } = useCartContext();
  const { searchTerm } = useSearchContext();

  // Filtrar produtos baseado no termo de busca
  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) {
      return products;
    }
    
    return products.filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);  

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await productService.getProducts();
        setProducts(products);
      } catch (error) {
        console.error('Erro ao carregar produtos:', error);
        // Aqui você pode implementar um estado de erro ou fallback
      }
    };

    fetchProducts();
  }, []);

  const handleProductClick = (productId: string) => {
    console.log(`Produto clicado: ${productId}`);
  };

  const handleBuyClick = (productId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    
    const product = products.find(p => p.id === productId);
    if (product) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image
      });
      console.log(`Produto adicionado ao carrinho: ${productId}`);
    }
  };

  return (
    <section className="product-grid-section">
      <div className="product-grid-container">
        <h2 className="product-grid-title">{title}</h2>
        
        {searchTerm && (
          <div className="search-info">
            <p>Resultados para: &ldquo;<strong>{searchTerm}</strong>&rdquo; ({filteredProducts.length} produto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''})</p>
          </div>
        )}
        
        <div className="product-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onProductClick={handleProductClick}
                onBuyClick={handleBuyClick}
              />
            ))
          ) : (
            <div className="no-products-found">
              {searchTerm ? (
                <p>Nenhum produto encontrado para &ldquo;{searchTerm}&rdquo;. Tente buscar por outro termo.</p>
              ) : (
                <p>Nenhum produto disponível no momento.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ProductGrid;
