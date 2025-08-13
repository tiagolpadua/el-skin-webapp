import React from 'react';
import About1 from '../../assets/about1.png';
import { AboutContainer, AboutContent, AboutImagesSection, AboutSection, AboutTextSection, ContactButton, ContactIcon, ContactSection, ProductImage, ProductImageContainer } from './about_styled';

const About: React.FC = () => {
  return (
    <AboutContainer>
      <AboutContent>
        <AboutTextSection>
          <h1>Sobre a AL SKIN</h1>
          
          <AboutSection>
            <h2>QUEM SOMOS</h2>
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem 
              accusantium doloremque laudantium, totam rem aperiam, eaque 
              ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae 
              dicta sunt explicabo.
            </p>
          </AboutSection>

          <AboutSection>
            <h2>POR QUE EXISTIMOS?</h2>
            <p>
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit 
              aut fugit, sed quia consequuntur magni dolores eos qui ratione 
              voluptatem sequi nesciunt.
            </p>
          </AboutSection>

          <AboutSection>
            <h2>O QUE A GENTE FAZ?</h2>
            <p>
              Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, 
              consectetur, adipisci velit, sed quia non numquam eius modi 
              tempora incidunt ut labore et dolore magnam aliquam quaerat 
              voluptatem.
            </p>
          </AboutSection>
        </AboutTextSection>

        <AboutImagesSection>
          <ProductImageContainer>
            <ProductImage 
              src={About1} 
              alt="Produto AL SKIN sendo aplicado"
            />
          </ProductImageContainer>
        </AboutImagesSection>
      </AboutContent>

      <ContactSection>
        <h2>VAMOS CONVERSAR?</h2>
        <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem.</p>
        
        <ContactButton>
          <ContactIcon>💬</ContactIcon>
          <span>Fale conosco</span>
        </ContactButton>
      </ContactSection>
    </AboutContainer>
  );
};

export default About;
