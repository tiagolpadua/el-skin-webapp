import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  /* Modern CSS Reset */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  * {
    margin: 0;
    padding: 0;
  }

  html {
    /* Improve text rendering */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    
    /* Enable smooth scrolling */
    scroll-behavior: smooth;
    
    /* Set base font size for rem calculations */
    font-size: 16px;
    
    /* Improve font rendering on iOS */
    -webkit-text-size-adjust: 100%;
    -moz-text-size-adjust: 100%;
    text-size-adjust: 100%;
    
    /* Set default height */
    height: 100%;
  }

  body {
    font-family: ${({ theme }) => theme.typography.fonts.sans};
    font-size: ${({ theme }) => theme.semantic.typography.body.medium.fontSize};
    font-weight: ${({ theme }) => theme.semantic.typography.body.medium.fontWeight};
    line-height: ${({ theme }) => theme.semantic.typography.body.medium.lineHeight};
    color: ${({ theme }) => theme.semantic.colors.text.primary};
    background-color: ${({ theme }) => theme.semantic.colors.background.primary};
    
    /* Improve touch scrolling on iOS */
    -webkit-overflow-scrolling: touch;
    
    /* Prevent horizontal scroll */
    overflow-x: hidden;
    
    /* Set minimum height */
    min-height: 100vh;
    
    /* Enable GPU acceleration for smoother animations */
    transform: translateZ(0);
  }

  /* Root container */
  #root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  /* Typography reset */
  h1, h2, h3, h4, h5, h6 {
    font-weight: inherit;
    color: inherit;
  }

  p, blockquote, dl, dd, ol, ul, figure {
    margin: 0;
  }

  ol, ul {
    list-style: none;
  }

  /* Media reset */
  img, picture, video, canvas, svg {
    display: block;
    max-width: 100%;
    height: auto;
  }

  img {
    /* Improve image loading */
    font-style: italic;
    background-repeat: no-repeat;
    background-size: cover;
  }

  /* Form reset */
  input, button, textarea, select {
    font: inherit;
    color: inherit;
  }

  button {
    border: none;
    background: none;
    cursor: pointer;
    
    /* Remove iOS button styling */
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }

  input, textarea {
    /* Remove iOS styling */
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    
    /* Remove default border radius on iOS */
    border-radius: 0;
  }

  /* Remove default focus styles - we'll add our own */
  :focus {
    outline: none;
  }

  /* Accessible focus styles */
  :focus-visible {
    outline: ${({ theme }) => theme.semantic.focus.ring.width} ${({ theme }) => theme.semantic.focus.ring.style} ${({ theme }) => theme.semantic.focus.ring.color};
    outline-offset: ${({ theme }) => theme.semantic.focus.ring.offset};
  }

  /* Improve table styling */
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  /* Remove default styles from anchor tags */
  a {
    color: inherit;
    text-decoration: none;
    
    /* Improve touch targets on mobile */
    touch-action: manipulation;
  }

  /* Improve button touch targets */
  button, [role="button"] {
    touch-action: manipulation;
    
    /* Minimum touch target size (44px) */
    min-height: ${({ theme }) => theme.sizes[11]};
    min-width: ${({ theme }) => theme.sizes[11]};
  }

  /* Utility classes for accessibility */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .skip-link {
    position: absolute;
    top: -40px;
    left: 6px;
    background: ${({ theme }) => theme.semantic.colors.background.primary};
    color: ${({ theme }) => theme.semantic.colors.text.primary};
    padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[4]};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    text-decoration: none;
    z-index: ${({ theme }) => theme.zIndex.skipLink};
    transition: ${({ theme }) => theme.transitions.fast};
    
    &:focus {
      top: 6px;
    }
  }

  /* Reduced motion preferences */
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }

  /* High contrast mode support */
  @media (prefers-contrast: high) {
    * {
      border-color: currentColor;
    }
  }

  /* Dark mode support */
  @media (prefers-color-scheme: dark) {
    :root {
      color-scheme: dark;
    }
  }

  /* Print styles */
  @media print {
    *,
    *::before,
    *::after {
      background: transparent !important;
      color: black !important;
      box-shadow: none !important;
      text-shadow: none !important;
    }

    a,
    a:visited {
      text-decoration: underline;
    }

    img {
      page-break-inside: avoid;
    }

    p,
    h2,
    h3 {
      orphans: 3;
      widows: 3;
    }

    h2,
    h3 {
      page-break-after: avoid;
    }
  }

  /* Scrollbar styling for webkit browsers */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.semantic.colors.background.secondary};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.semantic.colors.border.secondary};
    border-radius: ${({ theme }) => theme.borderRadius.full};
    
    &:hover {
      background: ${({ theme }) => theme.semantic.colors.text.tertiary};
    }
  }

  /* Selection styling */
  ::selection {
    background-color: ${({ theme }) => theme.colors.primary[100]};
    color: ${({ theme }) => theme.colors.primary[900]};
  }

  /* Focus ring for keyboard navigation */
  .js-focus-visible :focus:not(.focus-visible) {
    outline: none;
  }

  /* Loading state */
  .loading {
    cursor: wait;
  }

  .loading * {
    pointer-events: none;
  }

  /* Utility classes */
  .visually-hidden {
    position: absolute !important;
    width: 1px !important;
    height: 1px !important;
    padding: 0 !important;
    margin: -1px !important;
    overflow: hidden !important;
    clip: rect(0, 0, 0, 0) !important;
    white-space: nowrap !important;
    border: 0 !important;
  }

  /* Custom properties for theme switching */
  :root {
    --color-primary: ${({ theme }) => theme.colors.primary[500]};
    --color-background: ${({ theme }) => theme.semantic.colors.background.primary};
    --color-text: ${({ theme }) => theme.semantic.colors.text.primary};
    --font-family-sans: ${({ theme }) => theme.typography.fonts.sans};
    --transition-fast: ${({ theme }) => theme.transitions.fast};
    --transition-normal: ${({ theme }) => theme.transitions.normal};
    --shadow-sm: ${({ theme }) => theme.shadows.sm};
    --shadow-md: ${({ theme }) => theme.shadows.md};
    --border-radius-md: ${({ theme }) => theme.borderRadius.md};
    --spacing-sm: ${({ theme }) => theme.spacing[2]};
    --spacing-md: ${({ theme }) => theme.spacing[4]};
    --spacing-lg: ${({ theme }) => theme.spacing[6]};
  }
`;