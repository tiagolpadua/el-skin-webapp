import React from 'react';
import './HeroSection.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

interface HeroSectionProps {
  subtitle?: string;
  title?: string;
  description?: string;
  buttonText?: string;
  backgroundImage?: string;
  onButtonClick?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  subtitle = "confira nossa linha",
  title = "corporal",
  description = "com benefícios além da hidratação",
  buttonText = "comprar agora",
  backgroundImage,
  onButtonClick
}) => {
  
  const handleButtonClick = () => {
    if (onButtonClick) {
      onButtonClick();
    } else {
      console.log('Botão clicado - navegando para produtos');
    }
  };

  return (
    <section 
      className="hero-section"
      style={{ 
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined 
      }}
    >
    <div
      className="hero-container"
    >
      <div className="hero-content">
        <button className="hero-back-button" aria-label="Voltar">
          <FontAwesomeIcon width="60"  height="24" icon={faAngleLeft} style={{color: 'white'}}/>
        </button>
        
        <div className="hero-text">
          <span className="hero-subtitle">{subtitle}</span>
          <h1 className="hero-title">{title}</h1>
          <p className="hero-description">{description}</p>
          <button 
            className="hero-cta-button"
            onClick={handleButtonClick}
          >
            {buttonText}
            <FontAwesomeIcon icon={faAngleRight} />
          </button>
        </div>
      </div>
    </div>
    </section>
  );
};

export default HeroSection;
