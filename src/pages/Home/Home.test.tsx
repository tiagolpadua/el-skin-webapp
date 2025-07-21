import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Home from './Home';

jest.mock('../../components/Carousel/Carousel', () => {
  return function MockCarousel() {
    return <div>Mocked Carousel</div>;
  };
});

jest.mock('../../components/ProductGrid/ProductGrid', () => {
  return function MockProductGrid() {
    return <div>Mocked ProductGrid</div>;
  };
});

describe('Home Page', () => {
  it('should render carousel component', async () => {
    render(<Home />);
    expect(screen.getByText('Mocked Carousel')).toBeInTheDocument();
  });

  it('should render ProductGrid component', async () => {
    render(<Home />);
    expect(screen.getByText('Mocked ProductGrid')).toBeInTheDocument();
  });
});
