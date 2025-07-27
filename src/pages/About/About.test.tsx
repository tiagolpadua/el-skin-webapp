import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from 'styled-components';
import About from './About';
import { theme } from '../../styles/theme';

describe('About', () => {
  it('should render the main title', () => {
    render(
      <ThemeProvider theme={theme}>
        <About />
      </ThemeProvider>
    );
    
    expect(screen.getByText('Sobre a AL SKIN')).toBeInTheDocument();
  });
});
