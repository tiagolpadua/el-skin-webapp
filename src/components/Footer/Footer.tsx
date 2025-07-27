import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faPinterest,
  faTwitter,
  faYoutube
} from '@fortawesome/free-brands-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { media } from '../../styles/theme';

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface SocialLink {
  icon: IconDefinition;
  href: string;
  label: string;
}


const Footer: React.FC = () => {
  const socialLinks: SocialLink[] = [
    {
      icon: faInstagram,
      href: 'https://instagram.com/alskin',
      label: 'Instagram'
    },
    {
      icon: faFacebook,
      href: 'https://facebook.com/alskin',
      label: 'Facebook'
    },
    {
      icon: faYoutube,
      href: 'https://youtube.com/alskin',
      label: 'YouTube'
    },
    {
      icon: faPinterest,
      href: 'https://pinterest.com/alskin',
      label: 'Pinterest'
    },
    {
      icon: faTwitter,
      href: 'https://twitter.com/alskin',
      label: 'Twitter'
    },
    {
      icon: faLinkedin,
      href: 'https://linkedin.com/company/alskin',
      label: 'LinkedIn'
    },
    {
      icon: faGlobe,
      href: 'https://alskin.com.br',
      label: 'Website'
    }
  ];

  const footerSections: FooterSection[] = [
    {
      title: 'Sobre a AL SKIN',
      links: [
        { label: '- quem somos', href: '/about' },
        { label: '- time AL SKIN', href: '/about' },
        { label: '- carreiras', href: '/about' }
      ]
    },
    {
      title: 'Loja AL SKIN',
      links: [
        { label: '- lojas físicas', href: '/lojas' },
        { label: '- devolução', href: '/devolucao' }
      ]
    },
    {
      title: 'Atendimento',
      links: [
        { label: '- oi@alskin.com.br', href: 'mailto:oi@alskin.com.br' },
        { label: '- ajuda', href: '/ajuda' }
      ]
    },
    {
      title: 'Blog AL SKIN',
      links: [
        { label: '- Minha pele', href: '/blog/minha-pele' },
        { label: '- Ingredientes', href: '/blog/ingredientes' }
      ]
    }
  ];

  const handleSocialClick = (socialLink: SocialLink) => {
    console.log(`Abrindo ${socialLink.label}: ${socialLink.href}`);
  };

  return (
    <StyledFooter>
      <FooterSocial>
        <FooterContainer>
          <SocialIcons>
            {socialLinks.map((social, index) => (
              <SocialIcon
                key={social.label}
                index={index}
                onClick={() => handleSocialClick(social)}
                aria-label={`Abrir ${social.label}`}
                type="button"
              >
                <FontAwesomeIcon icon={social.icon} />
              </SocialIcon>
            ))}
          </SocialIcons>
        </FooterContainer>
      </FooterSocial>

      <FooterLinks>
        <FooterContainer>
          <FooterSections>
            {footerSections.map((section, index) => (
              <FooterSection key={section.title} index={index}>
                <FooterSectionTitle>{section.title}</FooterSectionTitle>
                <FooterSectionLinks>
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <FooterLink to={link.href}>{link.label}</FooterLink> 
                    </li>
                  ))}
                </FooterSectionLinks>
              </FooterSection>
            ))}
          </FooterSections>
        </FooterContainer>
      </FooterLinks>

      <FooterBottom>
        <FooterContainer>
          <div>
            <FooterBrandName>AL SKIN</FooterBrandName>
            <FooterCopyright>
              2025 AL SKIN. Todos os direitos reservados.
            </FooterCopyright>
            <FooterAddress>
              Av. Sete de Setembro, 467 - São Paulo/SP - CEP: 05240-010
            </FooterAddress>
          </div>
        </FooterContainer>
      </FooterBottom>
    </StyledFooter>
  );
};

export default Footer;

// Styled Components
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const StyledFooter = styled.footer`
  background-color: ${({ theme }) => theme.colors.background.light};
  margin-top: 60px;
`;

const FooterContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.xl};

  ${media.md} {
    padding: 0 ${({ theme }) => theme.spacing.md};
  }
`;

const FooterSocial = styled.div`
  background-color: ${({ theme }) => theme.colors.background.white};
  padding: 40px 0;
  border-bottom: 1px solid #e9ecef;

  ${media.md} {
    padding: 30px 0;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.xl};
  flex-wrap: wrap;

  ${media.md} {
    gap: ${({ theme }) => theme.spacing.lg};
  }

  ${media.sm} {
    gap: ${({ theme }) => theme.spacing.lg};
  }
`;

const SocialIcon = styled.button<{ index: number }>`
  width: 50px;
  height: 50px;
  border-radius: ${({ theme }) => theme.borderRadius.round};
  background-color: #6c757d;
  color: ${({ theme }) => theme.colors.text.white};
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.normal};
  font-size: ${({ theme }) => theme.fontSize.xl};
  animation: ${fadeInUp} 0.6s ease-out ${({ index }) => 0.1 + (index * 0.05)}s forwards;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.primary};
  }

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }

  ${media.md} {
    width: 45px;
    height: 45px;
    font-size: ${({ theme }) => theme.fontSize.lg};
  }

  ${media.sm} {
    width: 40px;
    height: 40px;
    font-size: ${({ theme }) => theme.fontSize.base};
  }
`;

const FooterLinks = styled.div`
  background-color: ${({ theme }) => theme.colors.background.light};
  padding: 50px 0;

  ${media.md} {
    padding: 40px 0;
  }
`;

const FooterSections = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;

  ${media.md} {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 30px;
  }

  ${media.sm} {
    grid-template-columns: 1fr;
    gap: 25px;
    text-align: center;
  }
`;

const FooterSection = styled.div<{ index: number }>`
  text-align: left;
  animation: ${fadeInUp} 0.6s ease-out ${({ index }) => 0.1 + (index * 0.1)}s forwards;

  ${media.sm} {
    text-align: center;
  }
`;

const FooterSectionTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  margin-top: 0;

  ${media.md} {
    font-size: ${({ theme }) => theme.fontSize.base};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  ${media.sm} {
    font-size: ${({ theme }) => theme.fontSize.sm};
  }
`;

const FooterSectionLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
`;

const FooterLink = styled(Link)`
  background: none;
  border: none;
  color: #6c757d;
  font-size: ${({ theme }) => theme.fontSize.sm};
  cursor: pointer;
  transition: color ${({ theme }) => theme.transitions.normal};
  text-align: left;
  padding: 0;
  font-family: inherit;
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
    border-radius: 2px;
  }

  ${media.sm} {
    font-size: ${({ theme }) => theme.fontSize.xs};
  }
`;

const FooterBottom = styled.div`
  background-color: ${({ theme }) => theme.colors.text.primary};
  color: ${({ theme }) => theme.colors.text.white};
  padding: 30px 0;
  text-align: center;

  ${media.md} {
    padding: 25px 0;
  }
`;

const FooterBrandName = styled.h2`
  font-size: ${({ theme }) => theme.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  margin: 0 0 ${({ theme }) => theme.spacing.lg} 0;
  color: ${({ theme }) => theme.colors.text.white};

  ${media.md} {
    font-size: ${({ theme }) => theme.fontSize.xl};
  }

  ${media.sm} {
    font-size: ${({ theme }) => theme.fontSize.lg};
  }
`;

const FooterCopyright = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  margin: 0 0 ${({ theme }) => theme.spacing.sm} 0;
  color: #adb5bd;

  ${media.sm} {
    font-size: ${({ theme }) => theme.fontSize.xs};
  }
`;

const FooterAddress = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xs};
  margin: 0;
  color: #6c757d;

  ${media.sm} {
    font-size: 11px;
  }
`;
