import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import About from './About';

describe('About', () => {
  it('should render the main title', () => {
    render(<About />);
    
    expect(screen.getByText('Sobre a AL SKIN')).toBeInTheDocument();
  });
});
