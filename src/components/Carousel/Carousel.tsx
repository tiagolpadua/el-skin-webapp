import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useGetCarouselItemsQuery } from '../../store/api/apiSlice';
import styles from './Carousel.module.css';

interface ICarouselItem {
  subtitle: string;
  title: string;
  description: string;
  backgroundImage: string;
}

function Carousel() {
  const [idxItemAtual, setIdxItemAtual] = useState(0);

  const { data: itemsCarousel = [], isLoading: isLoadingCarousel, error: errorCarousel } = useGetCarouselItemsQuery();

  useEffect(() => {
    console.log('iniciou o timer do carrousel');
    const timer = setInterval(() => nextItem(), 3000);
    return () => {
      clearInterval(timer);
      console.log('limpou o timer do carrousel');
    };
  }, [itemsCarousel]);

  function previousItem() {
    if (itemsCarousel.length === 0) {
      return;
    }
    setIdxItemAtual((prevIdx) => (prevIdx === 0 ? itemsCarousel.length - 1 : prevIdx - 1));
  }

  function nextItem() {
    if (itemsCarousel.length === 0) {
      return;
    }
    setIdxItemAtual((prevIdx) => (prevIdx === itemsCarousel.length - 1 ? 0 : prevIdx + 1));
  }

  return (
    <>
      {isLoadingCarousel && <h6>Carregando...</h6>}

      {errorCarousel && <h6>Ocorreu um erro: {JSON.stringify(errorCarousel)}</h6>}

      {!isLoadingCarousel && !errorCarousel && <section 
        className={styles.carouselSection}
        style={{ 
          backgroundImage: `url(${itemsCarousel[idxItemAtual].backgroundImage})`,
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
              <span className={styles.carouselSubtitle}>{itemsCarousel[idxItemAtual].subtitle}</span>
              <h1 className={styles.carouselTitle}>{itemsCarousel[idxItemAtual].title}</h1>
              <p className={styles.carouselDescription}>{itemsCarousel[idxItemAtual].description}</p>
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
      </section>}
    </>
  );
}

export default Carousel;
