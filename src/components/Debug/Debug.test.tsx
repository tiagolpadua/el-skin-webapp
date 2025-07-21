import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Debug from './Debug';

describe('Debug', () => {
  it('should render children correctly', () => {
    render(
      <Debug>
        <p>Conteúdo de teste</p>
      </Debug>
    );
    
    expect(screen.getByText('Conteúdo de teste')).toBeInTheDocument();
  });

  it('should apply red border style', () => {
    const { container } = render(
      <Debug>
        <span>Test content</span>
      </Debug>
    );
    
    const debugDiv = container.firstChild as HTMLElement;
    expect(debugDiv).toHaveStyle({ border: '1px solid red' });
  });

  it('should wrap multiple children', () => {
    render(
      <Debug>
        <h1>Título</h1>
        <p>Parágrafo</p>
        <button>Botão</button>
      </Debug>
    );
    
    expect(screen.getByText('Título')).toBeInTheDocument();
    expect(screen.getByText('Parágrafo')).toBeInTheDocument();
    expect(screen.getByText('Botão')).toBeInTheDocument();
  });

  it('should handle empty children', () => {
    const { container } = render(<Debug>{null}</Debug>);
    
    const debugDiv = container.firstChild as HTMLElement;
    expect(debugDiv).toBeInTheDocument();
    expect(debugDiv).toHaveStyle({ border: '1px solid red' });
  });

  it('should handle text content as children', () => {
    render(<Debug>Texto simples</Debug>);
    
    expect(screen.getByText('Texto simples')).toBeInTheDocument();
  });

  it('should handle complex nested components', () => {
    render(
      <Debug>
        <div>
          <header>
            <h1>Header</h1>
          </header>
          <main>
            <section>
              <p>Conteúdo principal</p>
            </section>
          </main>
        </div>
      </Debug>
    );
    
    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('Conteúdo principal')).toBeInTheDocument();
  });

  it('should maintain proper DOM structure', () => {
    const { container } = render(
      <Debug>
        <div data-testid="child">Child content</div>
      </Debug>
    );
    
    const debugDiv = container.firstChild as HTMLElement;
    const childDiv = screen.getByTestId('child');
    
    expect(debugDiv.tagName).toBe('DIV');
    expect(debugDiv.contains(childDiv)).toBe(true);
  });
});
