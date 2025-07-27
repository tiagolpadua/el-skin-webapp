// Enhanced Theme System v2.0
// Integrates all design tokens for a robust design system

import { 
  colorTokens, 
  semanticColorTokens, 
  darkSemanticColorTokens 
} from './tokens/colors';
import { 
  fontFamilyTokens,
  fontWeightTokens,
  fontSizeTokens,
  lineHeightTokens,
  letterSpacingTokens,
  typographyTokens,
  responsiveTypographyTokens
} from './tokens/typography';
import { 
  spacingTokens,
  semanticSpacingTokens,
  borderRadiusTokens,
  borderWidthTokens,
  sizeTokens,
  zIndexTokens,
  aspectRatioTokens
} from './tokens/spacing';
import { 
  durationTokens,
  easingTokens,
  transitionTokens,
  animationTokens,
  reducedMotionTokens
} from './tokens/motion';

// Enhanced breakpoints with more granular control
const breakpointTokens = {
  xs: '320px',   // Mobile small
  sm: '480px',   // Mobile large
  md: '768px',   // Tablet
  lg: '1024px',  // Desktop small
  xl: '1280px',  // Desktop large
  '2xl': '1536px', // Desktop extra large
} as const;

// Shadow tokens with elevation system
const shadowTokens = {
  none: 'none',
  xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  
  // Colored shadows
  primary: '0 4px 14px 0 rgba(139, 74, 139, 0.2)',
  primaryLg: '0 10px 28px 0 rgba(139, 74, 139, 0.25)',
  success: '0 4px 14px 0 rgba(34, 197, 94, 0.2)',
  warning: '0 4px 14px 0 rgba(251, 191, 36, 0.2)',
  error: '0 4px 14px 0 rgba(239, 68, 68, 0.2)',
} as const;

// Focus ring tokens (accessibility)
const focusTokens = {
  ring: {
    width: '2px',
    style: 'solid',
    color: colorTokens.primary[500],
    offset: '2px',
  },
  
  // Combined focus styles
  default: `0 0 0 2px ${colorTokens.primary[500]}`,
  error: `0 0 0 2px ${colorTokens.error[500]}`,
  success: `0 0 0 2px ${colorTokens.success[500]}`,
} as const;

// Component-specific tokens
const componentTokens = {
  button: {
    height: {
      sm: sizeTokens[8],  // 32px
      md: sizeTokens[10], // 40px
      lg: sizeTokens[12], // 48px
    },
    padding: {
      sm: `${spacingTokens[2]} ${spacingTokens[3]}`, // 8px 12px
      md: `${spacingTokens[2]} ${spacingTokens[4]}`, // 8px 16px
      lg: `${spacingTokens[3]} ${spacingTokens[6]}`, // 12px 24px
    },
    fontSize: {
      sm: fontSizeTokens.sm,
      md: fontSizeTokens.base,
      lg: fontSizeTokens.lg,
    },
    borderRadius: {
      sm: borderRadiusTokens.md,
      md: borderRadiusTokens.lg,
      lg: borderRadiusTokens.xl,
    },
  },
  
  input: {
    height: {
      sm: sizeTokens[8],  // 32px
      md: sizeTokens[10], // 40px
      lg: sizeTokens[12], // 48px
    },
    padding: {
      horizontal: spacingTokens[3], // 12px
      vertical: spacingTokens[2],   // 8px
    },
    borderRadius: borderRadiusTokens.md,
    borderWidth: borderWidthTokens[1],
  },
  
  card: {
    padding: {
      sm: spacingTokens[4], // 16px
      md: spacingTokens[6], // 24px
      lg: spacingTokens[8], // 32px
    },
    borderRadius: {
      sm: borderRadiusTokens.lg,
      md: borderRadiusTokens.xl,
      lg: borderRadiusTokens['2xl'],
    },
    shadow: {
      sm: shadowTokens.sm,
      md: shadowTokens.md,
      lg: shadowTokens.lg,
    },
  },
  
  modal: {
    overlay: {
      background: colorTokens.alpha.black[50],
      backdropFilter: 'blur(4px)',
    },
    content: {
      borderRadius: borderRadiusTokens['2xl'],
      shadow: shadowTokens['2xl'],
      maxWidth: sizeTokens[96], // 384px
    },
  },
} as const;

// Light theme (default)
export const lightTheme = {
  // Raw tokens
  colors: colorTokens,
  spacing: spacingTokens,
  fontSizes: fontSizeTokens,
  fontWeights: fontWeightTokens,
  lineHeights: lineHeightTokens,
  letterSpacing: letterSpacingTokens,
  borderRadius: borderRadiusTokens,
  borderWidth: borderWidthTokens,
  sizes: sizeTokens,
  zIndex: zIndexTokens,
  aspectRatio: aspectRatioTokens,
  shadows: shadowTokens,
  transitions: transitionTokens,
  durations: durationTokens,
  easings: easingTokens,
  animations: animationTokens,
  breakpoints: breakpointTokens,
  
  // Semantic tokens
  semantic: {
    colors: semanticColorTokens,
    spacing: semanticSpacingTokens,
    typography: typographyTokens,
    focus: focusTokens,
  },
  
  // Component tokens
  components: componentTokens,
  
  // Typography system
  typography: {
    fonts: fontFamilyTokens,
    ...typographyTokens,
    responsive: responsiveTypographyTokens,
  },
  
  // Motion system
  motion: {
    durations: durationTokens,
    easings: easingTokens,
    transitions: transitionTokens,
    animations: animationTokens,
    reducedMotion: reducedMotionTokens,
  },
} as const;

// Dark theme
export const darkTheme = {
  ...lightTheme,
  semantic: {
    ...lightTheme.semantic,
    colors: darkSemanticColorTokens,
  },
} as const;

// Theme type
export type ThemeV2 = typeof lightTheme;

// Media query helpers (mobile-first)
export const mediaQueries = {
  xs: `@media (min-width: ${breakpointTokens.xs})`,
  sm: `@media (min-width: ${breakpointTokens.sm})`,
  md: `@media (min-width: ${breakpointTokens.md})`,
  lg: `@media (min-width: ${breakpointTokens.lg})`,
  xl: `@media (min-width: ${breakpointTokens.xl})`,
  '2xl': `@media (min-width: ${breakpointTokens['2xl']})`,
  
  // Max-width queries (desktop-first)
  maxXs: `@media (max-width: ${breakpointTokens.xs})`,
  maxSm: `@media (max-width: ${breakpointTokens.sm})`,
  maxMd: `@media (max-width: ${breakpointTokens.md})`,
  maxLg: `@media (max-width: ${breakpointTokens.lg})`,
  maxXl: `@media (max-width: ${breakpointTokens.xl})`,
  
  // Preference queries
  prefersReducedMotion: '@media (prefers-reduced-motion: reduce)',
  prefersColorScheme: '@media (prefers-color-scheme: dark)',
  prefersDark: '@media (prefers-color-scheme: dark)',
  prefersLight: '@media (prefers-color-scheme: light)',
  prefersHighContrast: '@media (prefers-contrast: high)',
} as const;

// Export default theme
export const themeV2 = lightTheme;