import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import Img1 from '../../assets/img1.png';
import Img2 from '../../assets/img2.png';
import Img3 from '../../assets/img3.png';
import styles from './Carousel.module.css';

interface ICarouselItem {
  subtitle: string;
  title: string;
  description: string;
  backgroundImage: string;
}

function Carousel() {

  const items: ICarouselItem[] = [
    {
      subtitle:'confira nossa linha',
      title:'corporal',
      description: 'com benefícios além da hidratação',
      backgroundImage: Img1,
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
    }
  ];

  const [idxItemAtual, setIdxItemAtual] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      setIdxItemAtual(prevIdxItemAtual => {
        return (prevIdxItemAtual + 1) % items.length;
      });
    }, 3000);

    return () => clearInterval(timer);
  }, [items.length, isAutoPlaying]);

  function previousItem() {
    setIdxItemAtual(idxItemAtual => (idxItemAtual === 0 ? items.length - 1 : idxItemAtual - 1));
  }

  function nextItem() {
    setIdxItemAtual(idxItemAtual => (idxItemAtual + 1) % items.length);
  }

  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
  };

  const handleComprarAgora = () => {
    console.log('Botão clicado: Comprar Agora!');
  };

  return (
    <section 
      className={styles.carouselSection}
      style={{ 
        backgroundImage: `url(${items[idxItemAtual].backgroundImage})`
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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
              className={styles.carouselCtaButton}
              onClick={handleComprarAgora}>
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
