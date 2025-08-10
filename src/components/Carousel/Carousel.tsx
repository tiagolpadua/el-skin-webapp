'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import styles from './Carousel.module.css';
import { useEffect, useState } from 'react';
import { useGetCarouselItemsQuery } from '../../store/api/apiSlice';

function Carousel() {
  const { data: items = [], isLoading, error } = useGetCarouselItemsQuery();
  const [idxItemAtual, setIdxItemAtual] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => nextItem(), 3000);
    return () => {
      clearInterval(timer);
    };
  }, [items]);

  function previousItem() {
    if (items.length === 0) {
      return;
    }
    setIdxItemAtual((prevIdx) => (prevIdx === 0 ? items.length - 1 : prevIdx - 1));
  }

  function nextItem() {
    if (items.length === 0) {
      return;
    }
    setIdxItemAtual((prevIdx) => (prevIdx === items.length - 1 ? 0 : prevIdx + 1));
  }

  if (isLoading) {
    return <h6>Carregando...</h6>;
  }

  if (error) {
    return <h6>Erro ao carregar carousel</h6>;
  }

  if (items.length === 0) {
    return <h6>Nenhum item encontrado</h6>;
  }

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
