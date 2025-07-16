import React from 'react';
import './About.css';
import About1 from '../../assets/about1.png';

const About: React.FC = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <div className="about-text-section">
          <h1>Sobre a AL SKIN</h1>
          
          <div className="about-section">
            <h2>QUEM SOMOS</h2>
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem 
              accusantium doloremque laudantium, totam rem aperiam, eaque 
              ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae 
              dicta sunt explicabo.
            </p>
          </div>

          <div className="about-section">
            <h2>POR QUE EXISTIMOS?</h2>
            <p>
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit 
              aut fugit, sed quia consequuntur magni dolores eos qui ratione 
              voluptatem sequi nesciunt.
            </p>
          </div>

          <div className="about-section">
            <h2>O QUE A GENTE FAZ?</h2>
            <p>
              Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, 
              consectetur, adipisci velit, sed quia non numquam eius modi 
              tempora incidunt ut labore et dolore magnam aliquam quaerat 
              voluptatem.
            </p>
          </div>
        </div>

        <div className="about-images-section">
          <div className="product-image-container">
            <img 
              src={About1} 
              alt="Produto AL SKIN sendo aplicado"
              className="product-image"
            />
          </div>
        </div>
      </div>

      <div className="contact-section">
        <h2>VAMOS CONVERSAR?</h2>
        <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem.</p>
        
        <button className="contact-button">
          <span className="contact-icon">💬</span>
          <span>Fale conosco</span>
        </button>
      </div>
    </div>
  );
};

export default About;
