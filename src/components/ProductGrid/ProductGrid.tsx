import React, { useEffect, useMemo } from 'react';
import styled, { keyframes } from 'styled-components';
import ProductCard from '../ProductCard/ProductCard';
import { productService, IProduct } from '../../services';
import { useCartContext } from '../../context/CartContext';
import { useSearchContext } from '../../context/SearchContext';
import { media } from '../../styles/theme';

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
    <ProductGridSection>
      <ProductGridContainer>
        <ProductGridTitle>{title}</ProductGridTitle>
        
        {searchTerm && (
          <SearchInfo>
            <p>Resultados para: &ldquo;<strong>{searchTerm}</strong>&rdquo; ({filteredProducts.length} produto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''})</p>
          </SearchInfo>
        )}
        
        <StyledProductGrid>
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
            <NoProductsFound>
              {searchTerm ? (
                <p>Nenhum produto encontrado para &ldquo;{searchTerm}&rdquo;. Tente buscar por outro termo.</p>
              ) : (
                <p>Nenhum produto disponível no momento.</p>
              )}
            </NoProductsFound>
          )}
        </StyledProductGrid>
      </ProductGridContainer>
    </ProductGridSection>
  );
}

export default ProductGrid;

// Styled Components
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ProductGridSection = styled.section`
  padding: 60px ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.background.white};
`;

const ProductGridContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const ProductGridTitle = styled.h2`
  text-align: center;
  font-size: ${({ theme }) => theme.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 40px;
`;

const StyledProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 25px;
  justify-items: center;

  > *:nth-child(1) { animation: ${fadeInUp} 0.5s ease-out 0.1s forwards; }
  > *:nth-child(2) { animation: ${fadeInUp} 0.5s ease-out 0.2s forwards; }
  > *:nth-child(3) { animation: ${fadeInUp} 0.5s ease-out 0.3s forwards; }
  > *:nth-child(4) { animation: ${fadeInUp} 0.5s ease-out 0.4s forwards; }
  > *:nth-child(5) { animation: ${fadeInUp} 0.5s ease-out 0.5s forwards; }
  > *:nth-child(6) { animation: ${fadeInUp} 0.5s ease-out 0.6s forwards; }
  > *:nth-child(7) { animation: ${fadeInUp} 0.5s ease-out 0.7s forwards; }
  > *:nth-child(8) { animation: ${fadeInUp} 0.5s ease-out 0.8s forwards; }
`;

const SearchInfo = styled.div`
  margin-bottom: 30px;
  text-align: center;

  p {
    color: ${({ theme }) => theme.colors.text.secondary};
    font-size: ${({ theme }) => theme.fontSize.base};
    margin: 0;
    padding: 10px ${({ theme }) => theme.spacing.xl};
    background-color: ${({ theme }) => theme.colors.background.light};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    border-left: 4px solid #8b5cf6;

    ${media.md} {
      font-size: ${({ theme }) => theme.fontSize.sm};
      padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
    }
  }

  strong {
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

const NoProductsFound = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  padding: 60px ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.text.secondary};

  p {
    font-size: ${({ theme }) => theme.fontSize.lg};
    padding: ${({ theme }) => theme.spacing.xl};
    background-color: ${({ theme }) => theme.colors.background.light};
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    border: 2px dashed ${({ theme }) => theme.colors.border.medium};
    max-width: 500px;
    margin: 0 auto;

    ${media.md} {
      font-size: ${({ theme }) => theme.fontSize.base};
      padding: ${({ theme }) => theme.spacing.md};
    }
  }
`;
