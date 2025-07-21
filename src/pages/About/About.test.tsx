import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import About from './About';

describe('About', () => {
  it('should render the main title', () => {
    render(<About />);
    
    expect(screen.getByText('Sobre a AL SKIN')).toBeInTheDocument();
  });

  it('should render all section headings', () => {
    render(<About />);
    
    expect(screen.getByText('QUEM SOMOS')).toBeInTheDocument();
    expect(screen.getByText('POR QUE EXISTIMOS?')).toBeInTheDocument();
    expect(screen.getByText('O QUE A GENTE FAZ?')).toBeInTheDocument();
    expect(screen.getByText('VAMOS CONVERSAR?')).toBeInTheDocument();
  });

  it('should render section content', () => {
    render(<About />);
    
    expect(screen.getByText(/Sed ut perspiciatis unde omnis iste natus error/)).toBeInTheDocument();
    expect(screen.getByText(/Nemo enim ipsam voluptatem quia voluptas sit aspernatur/)).toBeInTheDocument();
    expect(screen.getByText(/Neque porro quisquam est, qui dolorem ipsum quia dolor/)).toBeInTheDocument();
  });

  it('should render product images', () => {
    render(<About />);
    
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(2);
    
    expect(screen.getByAltText('Produto AL SKIN sendo aplicado')).toBeInTheDocument();
    expect(screen.getByAltText('Processo de fabricação AL SKIN')).toBeInTheDocument();
  });

  it('should render contact button', () => {
    render(<About />);
    
    const contactButton = screen.getByRole('button', { name: /fale conosco/i });
    expect(contactButton).toBeInTheDocument();
  });

  it('should have proper structure for accessibility', () => {
    render(<About />);
    
    // Verifica se há uma estrutura hierárquica de headings
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(4);
  });

  it('should render contact section with emoji icon', () => {
    render(<About />);
    
    expect(screen.getByText('💬')).toBeInTheDocument();
  });

  it('should have responsive layout classes', () => {
    const { container } = render(<About />);
    
    expect(container.querySelector('.about-container')).toBeInTheDocument();
    expect(container.querySelector('.about-content')).toBeInTheDocument();
    expect(container.querySelector('.about-text-section')).toBeInTheDocument();
    expect(container.querySelector('.about-images-section')).toBeInTheDocument();
    expect(container.querySelector('.contact-section')).toBeInTheDocument();
  });

  it('should render all text sections with proper content', () => {
    const { container } = render(<About />);
    
    const textSections = container.querySelectorAll('.about-section');
    expect(textSections).toHaveLength(3);
  });

  it('should have contact button with proper styling classes', () => {
    render(<About />);
    
    const contactButton = screen.getByRole('button', { name: /fale conosco/i });
    expect(contactButton).toHaveClass('contact-button');
  });
});
