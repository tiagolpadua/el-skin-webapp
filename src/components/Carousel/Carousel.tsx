import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import styles from './Carousel.module.css';
import { useEffect, useState } from 'react';
import { carouselService } from '../../service/carouselService';

interface ICarouselItem {
  subtitle: string;
  title: string;
  description: string;
  backgroundImage: string;
}

function Carousel() {
  const [items, setItems] = useState<ICarouselItem[]>([]);

  const [idxItemAtual, setIdxItemAtual] = useState(0);

  useEffect(() => {
    async function fetchItems() {
      const newItems = await carouselService.getCarouselItems();
      setItems(newItems);
    }

    fetchItems();
  }, []);

  useEffect(() => {
    console.log('iniciou o timer do carrousel');
    const timer = setInterval(() => nextItem(), 3000);
    return () => {
      clearInterval(timer);
      console.log('limpou o timer do carrousel');
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

  return (
    <>
      {items.length === 0 && <h6>Carregando...</h6>}
      {items.length > 0 && <section 
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
      </section>}
    </>
  );
}

export default Carousel;
