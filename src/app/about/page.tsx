import React from 'react';
import styles from './styles.module.css'; // Assuming you have a CSS module for styles
import About1 from '../../assets/about1.png';
import Image from 'next/image';

const About: React.FC = () => {
  return (
    <div className={styles.about_container}>
      <div className={styles.about_content}>
        <div className={styles.about_text_section}>
          <h1>Sobre a AL SKIN</h1>
          
          <div className={styles.about_section}>
            <h2>QUEM SOMOS</h2>
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem 
              accusantium doloremque laudantium, totam rem aperiam, eaque 
              ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae 
              dicta sunt explicabo.
            </p>
          </div>

          <div className={styles.about_section}>
            <h2>POR QUE EXISTIMOS?</h2>
            <p>
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit 
              aut fugit, sed quia consequuntur magni dolores eos qui ratione 
              voluptatem sequi nesciunt.
            </p>
          </div>

          <div className={styles.about_section}>
            <h2>O QUE A GENTE FAZ?</h2>
            <p>
              Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, 
              consectetur, adipisci velit, sed quia non numquam eius modi 
              tempora incidunt ut labore et dolore magnam aliquam quaerat 
              voluptatem.
            </p>
          </div>
        </div>

        <div className={styles.about_images_section}>
          <div className={styles.product_image_container}>
                {/* <Image
                  src={About1.src}
                  width={500}
                  height={500}
                  alt="Picture of the author"
                /> */}
            <img 
              src={About1.src} 
              alt="Produto AL SKIN sendo aplicado"
              className={styles.product_image}
            />
          </div>
        </div>
      </div>

      <div className={styles.contact_section}>
        <h2>VAMOS CONVERSAR?</h2>
        <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem.</p>
        
        <button className={styles.contact_button}>
          <span className={styles.contact_icon}>💬</span>
          <span>Fale conosco</span>
        </button>
      </div>
    </div>
  );
};

export default About;
