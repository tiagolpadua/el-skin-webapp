import React, { forwardRef } from 'react';
import styled, { css } from 'styled-components';
import { mediaQueries } from '../../../styles/theme-v2';

type CardVariant = 'default' | 'elevated' | 'outlined' | 'interactive';
type CardPadding = 'none' | 'sm' | 'md' | 'lg';
type CardRadius = 'sm' | 'md' | 'lg';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  padding?: CardPadding;
  radius?: CardRadius;
  interactive?: boolean;
  as?: React.ElementType;
  children: React.ReactNode;
}

const getVariantStyles = (variant: CardVariant) => {
  const variants = {
    default: css`
      background: ${({ theme }) => theme.semantic.colors.surface.primary};
      border: 1px solid ${({ theme }) => theme.semantic.colors.border.primary};
      box-shadow: ${({ theme }) => theme.shadows.sm};
    `,
    
    elevated: css`
      background: ${({ theme }) => theme.semantic.colors.surface.primary};
      border: none;
      box-shadow: ${({ theme }) => theme.shadows.md};
    `,
    
    outlined: css`
      background: ${({ theme }) => theme.semantic.colors.surface.primary};
      border: 2px solid ${({ theme }) => theme.semantic.colors.border.primary};
      box-shadow: none;
    `,
    
    interactive: css`
      background: ${({ theme }) => theme.semantic.colors.surface.primary};
      border: 1px solid ${({ theme }) => theme.semantic.colors.border.primary};
      box-shadow: ${({ theme }) => theme.shadows.sm};
      cursor: pointer;
      transition: ${({ theme }) => theme.transitions.normal};
      
      &:hover {
        transform: translateY(-2px);
        box-shadow: ${({ theme }) => theme.shadows.lg};
        border-color: ${({ theme }) => theme.semantic.colors.border.secondary};
      }
      
      &:active {
        transform: translateY(-1px);
        box-shadow: ${({ theme }) => theme.shadows.md};
      }
      
      &:focus-visible {
        outline: ${({ theme }) => theme.semantic.focus.ring.width} ${({ theme }) => theme.semantic.focus.ring.style} ${({ theme }) => theme.semantic.focus.ring.color};
        outline-offset: ${({ theme }) => theme.semantic.focus.ring.offset};
      }
    `,
  };
  
  return variants[variant];
};

const getPaddingStyles = (padding: CardPadding) => {
  const paddings = {
    none: css`
      padding: 0;
    `,
    sm: css`
      padding: ${({ theme }) => theme.components.card.padding.sm};
    `,
    md: css`
      padding: ${({ theme }) => theme.components.card.padding.md};
    `,
    lg: css`
      padding: ${({ theme }) => theme.components.card.padding.lg};
    `,
  };
  
  return paddings[padding];
};

const getRadiusStyles = (radius: CardRadius) => {
  const radiuses = {
    sm: css`
      border-radius: ${({ theme }) => theme.components.card.borderRadius.sm};
    `,
    md: css`
      border-radius: ${({ theme }) => theme.components.card.borderRadius.md};
    `,
    lg: css`
      border-radius: ${({ theme }) => theme.components.card.borderRadius.lg};
    `,
  };
  
  return radiuses[radius];
};

const StyledCard = styled.div<{
  $variant: CardVariant;
  $padding: CardPadding;
  $radius: CardRadius;
  $interactive: boolean;
}>`
  position: relative;
  overflow: hidden;
  
  /* Variant styles */
  ${({ $variant }) => getVariantStyles($variant)}
  
  /* Padding styles */
  ${({ $padding }) => getPaddingStyles($padding)}
  
  /* Radius styles */
  ${({ $radius }) => getRadiusStyles($radius)}
  
  /* Interactive styles */
  ${({ $interactive, $variant }) => $interactive && $variant !== 'interactive' && css`
    cursor: pointer;
    transition: ${({ theme }) => theme.transitions.normal};
    
    &:hover {
      transform: translateY(-1px);
      box-shadow: ${({ theme }) => theme.shadows.md};
    }
    
    &:focus-visible {
      outline: ${({ theme }) => theme.semantic.focus.ring.width} ${({ theme }) => theme.semantic.focus.ring.style} ${({ theme }) => theme.semantic.focus.ring.color};
      outline-offset: ${({ theme }) => theme.semantic.focus.ring.offset};
    }
  `}
  
  /* Reduced motion */
  @media (prefers-reduced-motion: reduce) {
    transition: none;
    transform: none !important;
    
    &:hover {
      transform: none !important;
    }
  }
  
  /* Mobile optimizations */
  ${mediaQueries.maxMd} {
    /* Adjust padding on mobile */
    ${({ $padding }) => $padding === 'lg' && css`
      padding: ${({ theme }) => theme.components.card.padding.md};
    `}
    
    /* Remove hover effects on touch devices */
    @media (hover: none) {
      &:hover {
        transform: none;
        box-shadow: inherit;
      }
    }
  }
`;

// Card Header component
export const CardHeader = styled.div<{ padding?: CardPadding }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  ${({ padding = 'md' }) => padding !== 'none' && css`
    padding: ${({ theme }) => theme.components.card.padding[padding]};
    padding-bottom: ${({ theme }) => theme.spacing[3]};
  `}
  
  /* If card has no padding, add padding to header */
  .card-no-padding & {
    padding: ${({ theme }) => theme.components.card.padding.md};
    padding-bottom: ${({ theme }) => theme.spacing[3]};
  }
`;

// Card Content component
export const CardContent = styled.div<{ padding?: CardPadding }>`
  flex: 1;
  
  ${({ padding }) => padding && getPaddingStyles(padding)}
`;

// Card Footer component
export const CardFooter = styled.div<{ padding?: CardPadding }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid ${({ theme }) => theme.semantic.colors.border.primary};
  
  ${({ padding = 'md' }) => padding !== 'none' && css`
    padding: ${({ theme }) => theme.components.card.padding[padding]};
    padding-top: ${({ theme }) => theme.spacing[3]};
  `}
  
  /* If card has no padding, add padding to footer */
  .card-no-padding & {
    padding: ${({ theme }) => theme.components.card.padding.md};
    padding-top: ${({ theme }) => theme.spacing[3]};
  }
`;

// Card Image component
export const CardImage = styled.div`
  width: 100%;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: ${({ theme }) => theme.transitions.normal};
  }
  
  /* Card hover effect on image */
  .card-interactive:hover & img {
    transform: scale(1.02);
  }
  
  /* Reduced motion */
  @media (prefers-reduced-motion: reduce) {
    img {
      transition: none;
      transform: none !important;
    }
  }
`;

// Main Card component
export const Card = forwardRef<HTMLDivElement, CardProps>((
  {
    variant = 'default',
    padding = 'md',
    radius = 'md',
    interactive = false,
    as = 'div',
    className,
    children,
    tabIndex,
    role,
    ...props
  },
  ref
) => {
  const isInteractive = interactive || variant === 'interactive';
  
  // Add appropriate ARIA attributes for interactive cards
  const accessibilityProps = isInteractive
    ? {
        tabIndex: tabIndex ?? 0,
        role: role ?? 'button',
      }
    : {};
  
  const cardClassName = [
    className,
    padding === 'none' && 'card-no-padding',
    isInteractive && 'card-interactive',
  ].filter(Boolean).join(' ');
  
  return (
    <StyledCard
      ref={ref}
      as={as}
      $variant={variant}
      $padding={padding}
      $radius={radius}
      $interactive={isInteractive}
      className={cardClassName}
      {...accessibilityProps}
      {...props}
    >
      {children}
    </StyledCard>
  );
});

Card.displayName = 'Card';

export default Card;