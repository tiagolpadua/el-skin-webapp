import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
// import Img1 from '../../assets/img1.png';
// import Img2 from '../../assets/img2.png';
// import Img3 from '../../assets/img3.png';
import styles from './Carousel.module.css';
import { carouselService, ICarouselItem } from '../../services';

function Carousel() {

  const [carouselItems, setCarouselItems] = useState<ICarouselItem[]>([]);

  const [idxItemAtual, setIdxItemAtual] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      setIdxItemAtual(prevIdxItemAtual => {
        return (prevIdxItemAtual + 1) % carouselItems.length;
      });
    }, 3000);

    return () => clearInterval(timer);
  }, [carouselItems.length, isAutoPlaying]);

  useEffect(() => {
    const fetchCarouselItems = async () => {
      try {
        const items = await carouselService.getCarouselItems();
        setCarouselItems(items);
      } catch (error) {
        console.error('Erro ao carregar itens do carousel:', error);
        // Aqui você pode implementar um estado de erro ou fallback
      }
    };

    fetchCarouselItems();
  }, []);

  function previousItem() {
    setIdxItemAtual(idxItemAtual => (idxItemAtual === 0 ? carouselItems.length - 1 : idxItemAtual - 1));
  }

  function nextItem() {
    setIdxItemAtual(idxItemAtual => (idxItemAtual + 1) % carouselItems.length);
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
    <>
      {carouselItems.length > 0 && <section 
        className={styles.carouselSection}
        style={{ 
          backgroundImage: `url(${carouselItems[idxItemAtual].backgroundImage})`
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
              <span className={styles.carouselSubtitle}>{carouselItems[idxItemAtual].subtitle}</span>
              <h1 className={styles.carouselTitle}>{carouselItems[idxItemAtual].title}</h1>
              <p className={styles.carouselDescription}>{carouselItems[idxItemAtual].description}</p>
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
      }
    </>
  );
}

export default Carousel;
