import React from 'react';
import styled from 'styled-components';
import Carousel from '../../components/Carousel/Carousel';
import ProductGrid from '../../components/ProductGrid/ProductGrid';

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
