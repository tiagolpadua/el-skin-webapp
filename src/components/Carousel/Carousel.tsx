import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { carouselService, ICarouselItem } from '../../services';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

interface CarouselSectionProps {
  backgroundImage: string;
}

const CarouselSection = styled.section<CarouselSectionProps>`
  position: relative;
  min-height: 500px;
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 40%, transparent 60%),
              linear-gradient(45deg, #f8f6f3 0%, #e8e4e0 100%),
              url(${props => props.backgroundImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
    pointer-events: none;
  }
`;

const CarouselContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing[8]};
  position: relative;
  z-index: 2;
`;

const CarouselContent = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[8]};
  max-width: 1000px;
`;

const NavButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  width: 48px;
  height: 48px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.normal};
  backdrop-filter: blur(10px);
  color: white;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateX(-2px);
  }

  &:last-child:hover {
    transform: translateX(2px);
  }
`;

const CarouselText = styled.div`
  flex: 1;

  > * {
    animation: ${fadeInUp} 0.6s ease-out forwards;
  }
`;

const CarouselSubtitle = styled.span`
  display: block;
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.primary[600]};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
  font-weight: ${({ theme }) => theme.fontWeights.normal};
  letter-spacing: 0.5px;
  animation-delay: 0.1s;
`;

const CarouselTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['6xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.primary[600]};
  margin: 0;
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  line-height: ${({ theme }) => theme.lineHeights.tight};
  text-shadow: 2px 2px 4px rgba(139, 74, 139, 0.1);
  animation-delay: 0.2s;
`;

const CarouselDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.semantic.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing[12]};
  line-height: ${({ theme }) => theme.lineHeights.loose};
  max-width: 400px;
  animation-delay: 0.3s;
`;

const CtaButton = styled.button`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary[600]}, ${({ theme }) => theme.colors.primary[700]});
  color: ${({ theme }) => theme.semantic.colors.text.inverse};
  border: none;
  padding: ${({ theme }) => theme.spacing[4]} ${({ theme }) => theme.spacing[12]};
  border-radius: ${({ theme }) => theme.borderRadius['2xl']};
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.normal};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  box-shadow: ${({ theme }) => theme.shadows.primary};
  text-transform: lowercase;
  animation-delay: 0.4s;

  &:hover {
    background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary[700]}, ${({ theme }) => theme.colors.primary[800]});
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.primaryLg};
  }

  &:active {
    transform: translateY(0);
  }
`;

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
      {carouselItems.length > 0 && (
        <CarouselSection 
          backgroundImage={carouselItems[idxItemAtual].backgroundImage}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <CarouselContainer>
            <CarouselContent>
              <NavButton aria-label="Voltar" onClick={previousItem}>
                <FontAwesomeIcon width="60" height="24" icon={faAngleLeft} />
              </NavButton>
            
              <CarouselText>
                <CarouselSubtitle>{carouselItems[idxItemAtual].subtitle}</CarouselSubtitle>
                <CarouselTitle>{carouselItems[idxItemAtual].title}</CarouselTitle>
                <CarouselDescription>{carouselItems[idxItemAtual].description}</CarouselDescription>
                <CtaButton onClick={handleComprarAgora}>
                  comprar agora
                  <FontAwesomeIcon icon={faAngleRight} />
                </CtaButton>
              </CarouselText>

              <NavButton aria-label="Próximo" onClick={nextItem}>
                <FontAwesomeIcon width="60" height="24" icon={faAngleRight} />
              </NavButton>
            </CarouselContent>
          </CarouselContainer>
        </CarouselSection>
      )}
    </>
  );
}

export default Carousel;
