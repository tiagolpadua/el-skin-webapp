import React, { forwardRef } from 'react';
import styled, { css } from 'styled-components';
import { mediaQueries } from '../../../styles/theme-v2';

// Button variant types
type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';
type ButtonState = 'default' | 'loading' | 'disabled';

interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'size'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  state?: ButtonState;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

// Variant styles
const getVariantStyles = (variant: ButtonVariant) => {
  const variants = {
    primary: css`
      background: ${({ theme }) => theme.semantic.colors.interactive.primary.default};
      color: ${({ theme }) => theme.semantic.colors.text.inverse};
      border: 1px solid transparent;
      
      &:hover:not(:disabled) {
        background: ${({ theme }) => theme.semantic.colors.interactive.primary.hover};
        transform: translateY(-1px);
        box-shadow: ${({ theme }) => theme.shadows.primary};
      }
      
      &:active:not(:disabled) {
        background: ${({ theme }) => theme.semantic.colors.interactive.primary.active};
        transform: translateY(0);
      }
      
      &:focus-visible {
        box-shadow: ${({ theme }) => theme.semantic.focus.default}, ${({ theme }) => theme.shadows.primary};
      }
    `,
    
    secondary: css`
      background: ${({ theme }) => theme.semantic.colors.background.primary};
      color: ${({ theme }) => theme.semantic.colors.interactive.primary.default};
      border: 1px solid ${({ theme }) => theme.semantic.colors.border.primary};
      
      &:hover:not(:disabled) {
        background: ${({ theme }) => theme.semantic.colors.background.secondary};
        border-color: ${({ theme }) => theme.semantic.colors.interactive.primary.hover};
        transform: translateY(-1px);
        box-shadow: ${({ theme }) => theme.shadows.sm};
      }
      
      &:active:not(:disabled) {
        background: ${({ theme }) => theme.semantic.colors.background.tertiary};
        transform: translateY(0);
      }
    `,
    
    ghost: css`
      background: transparent;
      color: ${({ theme }) => theme.semantic.colors.interactive.primary.default};
      border: 1px solid transparent;
      
      &:hover:not(:disabled) {
        background: ${({ theme }) => theme.colors.primary[50]};
      }
      
      &:active:not(:disabled) {
        background: ${({ theme }) => theme.colors.primary[100]};
      }
    `,
    
    danger: css`
      background: ${({ theme }) => theme.colors.error[600]};
      color: ${({ theme }) => theme.semantic.colors.text.inverse};
      border: 1px solid transparent;
      
      &:hover:not(:disabled) {
        background: ${({ theme }) => theme.colors.error[700]};
        transform: translateY(-1px);
        box-shadow: ${({ theme }) => theme.shadows.error};
      }
      
      &:active:not(:disabled) {
        background: ${({ theme }) => theme.colors.error[700]};
        transform: translateY(0);
      }
      
      &:focus-visible {
        box-shadow: ${({ theme }) => theme.semantic.focus.error};
      }
    `,
  };
  
  return variants[variant];
};

// Size styles
const getSizeStyles = (size: ButtonSize) => {
  const sizes = {
    sm: css`
      height: ${({ theme }) => theme.components.button.height.sm};
      padding: ${({ theme }) => theme.components.button.padding.sm};
      font-size: ${({ theme }) => theme.components.button.fontSize.sm};
      border-radius: ${({ theme }) => theme.components.button.borderRadius.sm};
      gap: ${({ theme }) => theme.spacing[1.5]};
    `,
    
    md: css`
      height: ${({ theme }) => theme.components.button.height.md};
      padding: ${({ theme }) => theme.components.button.padding.md};
      font-size: ${({ theme }) => theme.components.button.fontSize.md};
      border-radius: ${({ theme }) => theme.components.button.borderRadius.md};
      gap: ${({ theme }) => theme.spacing[2]};
    `,
    
    lg: css`
      height: ${({ theme }) => theme.components.button.height.lg};
      padding: ${({ theme }) => theme.components.button.padding.lg};
      font-size: ${({ theme }) => theme.components.button.fontSize.lg};
      border-radius: ${({ theme }) => theme.components.button.borderRadius.lg};
      gap: ${({ theme }) => theme.spacing[2.5]};
    `,
  };
  
  return sizes[size];
};

// Loading spinner component
const Spinner = styled.div<{ size: ButtonSize }>`
  width: ${({ size }) => size === 'sm' ? '12px' : size === 'md' ? '16px' : '20px'};
  height: ${({ size }) => size === 'sm' ? '12px' : size === 'md' ? '16px' : '20px'};
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

// Styled button component
const StyledButton = styled.button<{
  $variant: ButtonVariant;
  $size: ButtonSize;
  $fullWidth: boolean;
  $state: ButtonState;
}>`
  /* Base styles */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  user-select: none;
  transition: ${({ theme }) => theme.transitions.normal};
  position: relative;
  overflow: hidden;
  
  /* Size styles */
  ${({ $size }) => getSizeStyles($size)}
  
  /* Variant styles */
  ${({ $variant }) => getVariantStyles($variant)}
  
  /* Full width */
  ${({ $fullWidth }) => $fullWidth && css`
    width: 100%;
  `}
  
  /* Disabled state */
  &:disabled,
  &[aria-disabled="true"] {
    opacity: 0.6;
    cursor: not-allowed;
    pointer-events: none;
    transform: none !important;
    box-shadow: none !important;
  }
  
  /* Loading state */
  ${({ $state }) => $state === 'loading' && css`
    cursor: wait;
    pointer-events: none;
  `}
  
  /* Focus styles */
  &:focus-visible {
    outline: ${({ theme }) => theme.semantic.focus.ring.width} ${({ theme }) => theme.semantic.focus.ring.style} ${({ theme }) => theme.semantic.focus.ring.color};
    outline-offset: ${({ theme }) => theme.semantic.focus.ring.offset};
  }
  
  /* High contrast mode */
  @media (prefers-contrast: high) {
    border: 2px solid currentColor;
  }
  
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
    min-height: ${({ theme }) => theme.sizes[11]};
    touch-action: manipulation;
  }
`;

// Icon wrapper
const IconWrapper = styled.span<{ position: 'left' | 'right' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  
  ${({ position }) => position === 'left' && css`
    margin-right: -2px;
  `}
  
  ${({ position }) => position === 'right' && css`
    margin-left: -2px;
  `}
`;

// Main Button component
export const Button = forwardRef<HTMLButtonElement, ButtonProps>((
  {
    variant = 'primary',
    size = 'md',
    state = 'default',
    fullWidth = false,
    leftIcon,
    rightIcon,
    children,
    disabled,
    ...props
  },
  ref
) => {
  const isDisabled = disabled || state === 'disabled';
  const isLoading = state === 'loading';
  
  const content = (
    <>
      {isLoading ? (
        <Spinner size={size} aria-hidden="true" />
      ) : (
        <>
          {leftIcon && (
            <IconWrapper position="left" aria-hidden="true">
              {leftIcon}
            </IconWrapper>
          )}
          
          <span>{children}</span>
          
          {rightIcon && (
            <IconWrapper position="right" aria-hidden="true">
              {rightIcon}
            </IconWrapper>
          )}
        </>
      )}
    </>
  );
  
  return (
    <StyledButton
      ref={ref}
      type="button"
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      $state={state}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      aria-busy={isLoading}
      {...props}
    >
      {content}
    </StyledButton>
  );
});

Button.displayName = 'Button';

export default Button;