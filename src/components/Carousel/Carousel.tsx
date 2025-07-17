import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import styles from './Carousel.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface ICarouselItem {
  subtitle: string;
  title: string;
  description: string;
  backgroundImage: string;
}

function Carousel() {

  const [items, setItems] = useState<ICarouselItem[]>([]);

  useEffect(() => {
    async function fetchItems() {
      try {
        const newItems = await axios.get<ICarouselItem[]>('http://localhost:3001/carousel');
        console.log('Itens do carrossel recebidos:', newItems.data);
        setItems(newItems.data);
      } catch (error) {
        console.error('Erro ao buscar os itens do carrossel:', error);
      }
    }

    fetchItems();
  }, []);

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
      items.length > 0 && setIdxItemAtual(prevIdxItemAtual => {
        return (prevIdxItemAtual + 1) % items.length;
      });
    }, 3000);

    return () => {
      console.log('limpou o interval....');
      clearInterval(timer);
    };
  }, [items]);

  console.log('idxItemAtual: ', idxItemAtual);

  return (
    <>
      {items && items.length > 0 && <section 
        className={styles.carouselSection}
        style={{ 
          backgroundImage: `url(${items[idxItemAtual]?.backgroundImage})`,
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
