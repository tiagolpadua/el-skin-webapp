import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Img1 from '../../assets/img1.png';
import Img2 from '../../assets/img2.png';
import Img3 from '../../assets/img3.png';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import styles from './Carousel.module.css';
import { useEffect, useState } from 'react';

interface ICarouselItem {
  subtitle: string;
  title: string;
  description: string;
  backgroundImage: string;
}

function Carousel() {

  const items: ICarouselItem[] = [    {
    subtitle:'confira nossa linha',
    title:'corporal',
    description: 'com benefícios além da hidratação',
    backgroundImage: Img1
  },
  {
    subtitle:'toda linha',
    title:'anti-age',
    description: 'use o cupom ANTIAGE15',
    backgroundImage: Img2,
  },
  {
    subtitle:'',
    title:'kits incríveis',
    description: 'até 50% OFF',
    backgroundImage: Img3,
  }];

  const [idxItemAtual, setIdxItemAtual] = useState(0);

  function previousItem() {
    setIdxItemAtual((prevIdx) => (prevIdx === 0 ? items.length - 1 : prevIdx - 1));
  }

  function nextItem() {
    setIdxItemAtual((prevIdx) => (prevIdx === items.length - 1 ? 0 : prevIdx + 1));
  }

  useEffect(() => {
    console.log('criou o interval....');
    const timer = setInterval(() => {
      console.log('ciclou o elemento....');
      setIdxItemAtual(prevIdxItemAtual => {
        return (prevIdxItemAtual + 1) % items.length;
      });
    }, 3000);

    return () => {
      console.log('limpou o interval....');
      clearInterval(timer);
    };
  }, []);

  return (
    <section 
      className={styles.carouselSection}
      style={{ 
        backgroundImage: `url(${items[idxItemAtual].backgroundImage})`,
      }}
    >
      <div
        className={styles.carouselContainer}
      >
        <div className={styles.carouselContent}>
          <button className={styles.carouselNavButton} aria-label="Voltar" onClick={previousItem}>
            <FontAwesomeIcon width="60" height="24" icon={faAngleLeft} style={{ color: 'white' }} />
          </button>
          
          <div className={styles.carouselText}>
            <span className={styles.carouselSubtitle}>{items[idxItemAtual].subtitle}</span>
            <h1 className={styles.carouselTitle}>{items[idxItemAtual].title}</h1>
            <p className={styles.carouselDescription}>{items[idxItemAtual].description}</p>
            <button 
              className={styles.carouselCtaButton}>
              comprar agora
              <FontAwesomeIcon icon={faAngleRight} />
            </button>
          </div>

          <button className={styles.carouselNavButton} aria-label="Próximo" onClick={nextItem}>
            <FontAwesomeIcon width="60" height="24" icon={faAngleRight} style={{ color: 'white' }} />
          </button>
        </div>
      </div>
    </section>
  );
}

export default Carousel;
