import React, { useEffect } from 'react';
import Header from '../components/Header/Header';
import HeroSection from '../components/HeroSection/HeroSection';
import ImageCarousel from '../components/ImageCarousel/ImageCarousel';
// import Debug from '../components/Debug/Debug';
import Img1 from './../assets/img1.png'; // Import a default background image if needed
import Img2 from './../assets/img2.png'; // Import a default background image if needed
import Img3 from './../assets/img3.png'; // Import a default background image if needed
import { skinProductImages } from '../assets/carouselImages';
// import './Home.css';

function Home() {
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

  return (
    <div>
      {/* Header/Navigation */}
      <Header/>
      
      {/* Promotional Banner */}
      {/* <section className="promo-banner">
        <p>primeira compra? <span className="highlight">R$25 OFF</span> A PARTIR DE R$ 200</p>
      </section> */}

      {/* Hero Section */}
      <HeroSection 
        subtitle="confira nossa linha"
        title="corporal"
        description="com benefícios além da hidratação"
        buttonText="comprar agora"
        backgroundImage={fotos[fotoAtual]} // Use the current image from the carousel
        onButtonClick={() => console.log('Navegando para produtos corporais')}
      />

      {/* Image Carousel Section */}
      <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#333', fontSize: '24px' }}>
          Galeria de Produtos
        </h2>
        <ImageCarousel 
          images={skinProductImages}
          autoSlideInterval={5000}
          showDots={true}
          showArrows={true}
          height="500px"
        />
      </div>

      {/* Products Section */}
      {/* <section className="products">
        <h2 className="products-title">nossos queridinhos estão aqui</h2>
        <div className="products-grid">
          <div className="product-card">
            <div className="product-image">
              <img src="/path/to/product1.jpg" alt="Protetor solar AL SUN" />
            </div>
            <h3 className="product-name">Protetor solar AL SUN</h3>
            <p className="product-description">alta proteção e pele luminosa sem grude nem pelo encarnado</p>
            <div className="product-tags">
              <span className="tag tag-protection">proteção</span>
              <span className="tag tag-face">rosto</span>
            </div>
            <div className="product-price">
              <span className="price">R$ 79,90</span>
              <button className="buy-button">comprar</button>
            </div>
          </div>

          <div className="product-card">
            <div className="product-image">
              <img src="/path/to/product2.jpg" alt="Protetor solar AL SUN" />
            </div>
            <h3 className="product-name">Protetor solar AL SUN</h3>
            <p className="product-description">alta proteção e pele luminosa sem grude nem pelo encarnado</p>
            <div className="product-tags">
              <span className="tag tag-protection">proteção</span>
              <span className="tag tag-face">rosto</span>
            </div>
            <div className="product-price">
              <span className="price">R$ 79,90</span>
              <button className="buy-button">comprar</button>
            </div>
          </div>

          <div className="product-card">
            <div className="product-image">
              <img src="/path/to/product3.jpg" alt="Protetor solar AL SUN" />
            </div>
            <h3 className="product-name">Protetor solar AL SUN</h3>
            <p className="product-description">alta proteção e pele luminosa sem grude nem pelo encarnado</p>
            <div className="product-tags">
              <span className="tag tag-protection">proteção</span>
              <span className="tag tag-face">rosto</span>
            </div>
            <div className="product-price">
              <span className="price">R$ 79,90</span>
              <button className="buy-button">comprar</button>
            </div>
          </div>

          <div className="product-card">
            <div className="product-image">
              <img src="/path/to/product4.jpg" alt="Protetor solar AL SUN" />
            </div>
            <h3 className="product-name">Protetor solar AL SUN</h3>
            <p className="product-description">alta proteção e pele luminosa sem grude nem pelo encarnado</p>
            <div className="product-tags">
              <span className="tag tag-protection">proteção</span>
              <span className="tag tag-face">rosto</span>
            </div>
            <div className="product-price">
              <span className="price">R$ 79,90</span>
              <button className="buy-button">comprar</button>
            </div>
          </div>

        </div>
      </section> */}

      {/* Footer */}
      {/* <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Sobre a AL SKIN</h4>
            <ul>
              <li>Quem somos</li>
              <li>Fale AL SKIN</li>
              <li>Carreiras</li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Loja AL SKIN</h4>
            <ul>
              <li>Suas filiais</li>
              <li>Revenda</li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Atendimento</h4>
            <ul>
              <li>segalink.com.br</li>
              <li>Ajuda</li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Blog AL SKIN</h4>
            <ul>
              <li>Menos pelo</li>
              <li>Ingredientes</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>AL SKIN</p>
          <p>2023 AL SKIN. Todos os direitos reservados.</p>
          <p>Av. Sete de Setembro, 467 - São Paulo/SP - CEP: 05240-010</p>
        </div>
      </footer> */}
    </div>
  );
}

export default Home;
