import React, { useEffect } from 'react';
import './Carousel.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import Img1 from '../../assets/img1.png';
import Img2 from '../../assets/img2.png';
import Img3 from '../../assets/img3.png';

function Carousel() {

  const fotos = [Img1, Img2, Img3]; // Array of images for the carousel

  const [fotoAtual, setFotoAtual] = React.useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setFotoAtual(prevFoto => {
        return (prevFoto + 1) % 3;
      });
    }, 3000);

    // Cleanup na desmontagem do componente
    return () => clearInterval(timer);
  }, []);

   
  const subtitle="confira nossa linha";
  const title="corporal";
  const description="com benefícios além da hidratação";
  const buttonText="comprar agora";
  const backgroundImage=fotos[fotoAtual];
  const onButtonClick=() => console.log('Navegando para produtos corporais');
    
  
  const handleButtonClick = () => {
    if (onButtonClick) {
      onButtonClick();
    } else {
      console.log('Botão clicado - navegando para produtos');
    }
  };

  return (
    <section 
      className="carousel-section"
      style={{ 
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined 
      }}
    >
    <div
      className="carousel-container"
    >
      <div className="carousel-content">
        <button className="carousel-back-button" aria-label="Voltar">
          <FontAwesomeIcon width="60"  height="24" icon={faAngleLeft} style={{color: 'white'}}/>
        </button>
        
        <div className="carousel-text">
          <span className="carousel-subtitle">{subtitle}</span>
          <h1 className="carousel-title">{title}</h1>
          <p className="carousel-description">{description}</p>
          <button 
            className="carousel-cta-button"
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

export default Carousel;
