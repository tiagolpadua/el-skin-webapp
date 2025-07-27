import styled from 'styled-components';
import ProductGrid from '../../components/ProductGrid/ProductGrid';
import Carousel from '../../components/Carousel/Carousel';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

function Home() {
  return (
    <HomeContainer>
      <Carousel />
      <ProductGrid />
    </HomeContainer>
  );
}

export default Home;
