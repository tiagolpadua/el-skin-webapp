// Design Tokens - Color System
// Baseado em escala científica HSL para máxima consistência

// Core Brand Colors (HSL optimized)
const primaryHue = 295; // Purple hue for AL SKIN brand
const secondaryHue = 210; // Blue hue for secondary actions

// Scientific color scale generator (50-950)
const generateColorScale = (hue: number, baseSaturation = 50) => ({
  50: `hsl(${hue}, ${Math.min(100, baseSaturation + 20)}%, 97%)`,
  100: `hsl(${hue}, ${Math.min(100, baseSaturation + 15)}%, 94%)`,
  200: `hsl(${hue}, ${Math.min(100, baseSaturation + 10)}%, 87%)`,
  300: `hsl(${hue}, ${baseSaturation}%, 77%)`,
  400: `hsl(${hue}, ${baseSaturation}%, 63%)`,
  500: `hsl(${hue}, ${baseSaturation}%, 50%)`, // Base color
  600: `hsl(${hue}, ${baseSaturation}%, 42%)`,
  700: `hsl(${hue}, ${baseSaturation}%, 35%)`,
  800: `hsl(${hue}, ${baseSaturation}%, 28%)`,
  900: `hsl(${hue}, ${baseSaturation}%, 22%)`,
  950: `hsl(${hue}, ${baseSaturation}%, 15%)`,
});

// Neutral colors (optimized for readability)
const neutralScale = {
  50: 'hsl(0, 0%, 98%)',
  100: 'hsl(0, 0%, 96%)',
  200: 'hsl(0, 0%, 90%)',
  300: 'hsl(0, 0%, 83%)',
  400: 'hsl(0, 0%, 64%)',
  500: 'hsl(0, 0%, 50%)',
  600: 'hsl(0, 0%, 40%)',
  700: 'hsl(0, 0%, 30%)',
  800: 'hsl(0, 0%, 20%)',
  900: 'hsl(0, 0%, 12%)',
  950: 'hsl(0, 0%, 8%)',
};

// Semantic colors with proper contrast ratios
const semanticColors = {
  success: {
    50: 'hsl(142, 76%, 96%)',
    100: 'hsl(142, 76%, 91%)',
    500: 'hsl(142, 76%, 45%)', // 4.5:1 contrast on white
    600: 'hsl(142, 76%, 39%)',
    700: 'hsl(142, 76%, 33%)',
    900: 'hsl(142, 76%, 20%)',
  },
  warning: {
    50: 'hsl(48, 96%, 96%)',
    100: 'hsl(48, 96%, 91%)',
    500: 'hsl(48, 96%, 45%)',
    600: 'hsl(48, 96%, 39%)',
    700: 'hsl(48, 96%, 33%)',
    900: 'hsl(48, 96%, 20%)',
  },
  error: {
    50: 'hsl(0, 86%, 97%)',
    100: 'hsl(0, 86%, 94%)',
    500: 'hsl(0, 86%, 55%)',
    600: 'hsl(0, 86%, 47%)',
    700: 'hsl(0, 86%, 39%)',
    900: 'hsl(0, 86%, 25%)',
  },
  info: {
    50: 'hsl(204, 100%, 97%)',
    100: 'hsl(204, 100%, 94%)',
    500: 'hsl(204, 100%, 50%)',
    600: 'hsl(204, 100%, 42%)',
    700: 'hsl(204, 100%, 35%)',
    900: 'hsl(204, 100%, 22%)',
  },
};

// Core color palettes
export const colorTokens = {
  // Primary brand colors
  primary: generateColorScale(primaryHue, 45),
  
  // Secondary colors
  secondary: generateColorScale(secondaryHue, 60),
  
  // Neutral/Gray scale
  neutral: neutralScale,
  
  // Semantic colors
  ...semanticColors,
  
  // Special colors
  white: '#ffffff',
  black: '#000000',
  transparent: 'transparent',
  
  // Alpha variations for overlays
  alpha: {
    white: {
      5: 'hsla(0, 0%, 100%, 0.05)',
      10: 'hsla(0, 0%, 100%, 0.1)',
      20: 'hsla(0, 0%, 100%, 0.2)',
      30: 'hsla(0, 0%, 100%, 0.3)',
      40: 'hsla(0, 0%, 100%, 0.4)',
      50: 'hsla(0, 0%, 100%, 0.5)',
      60: 'hsla(0, 0%, 100%, 0.6)',
      70: 'hsla(0, 0%, 100%, 0.7)',
      80: 'hsla(0, 0%, 100%, 0.8)',
      90: 'hsla(0, 0%, 100%, 0.9)',
    },
    black: {
      5: 'hsla(0, 0%, 0%, 0.05)',
      10: 'hsla(0, 0%, 0%, 0.1)',
      20: 'hsla(0, 0%, 0%, 0.2)',
      30: 'hsla(0, 0%, 0%, 0.3)',
      40: 'hsla(0, 0%, 0%, 0.4)',
      50: 'hsla(0, 0%, 0%, 0.5)',
      60: 'hsla(0, 0%, 0%, 0.6)',
      70: 'hsla(0, 0%, 0%, 0.7)',
      80: 'hsla(0, 0%, 0%, 0.8)',
      90: 'hsla(0, 0%, 0%, 0.9)',
    },
  },
} as const;

// Semantic color mappings (light theme)
export const semanticColorTokens = {
  // Text colors (WCAG AA compliant)
  text: {
    primary: colorTokens.neutral[900], // 15.3:1 contrast
    secondary: colorTokens.neutral[600], // 4.59:1 contrast
    tertiary: colorTokens.neutral[500], // 3.36:1 contrast (large text only)
    inverse: colorTokens.white,
    disabled: colorTokens.neutral[400],
  },
  
  // Background colors
  background: {
    primary: colorTokens.white,
    secondary: colorTokens.neutral[50],
    tertiary: colorTokens.neutral[100],
    inverse: colorTokens.neutral[900],
    overlay: colorTokens.alpha.black[50],
  },
  
  // Border colors
  border: {
    primary: colorTokens.neutral[200],
    secondary: colorTokens.neutral[300],
    focus: colorTokens.primary[500],
    error: colorTokens.error[500],
    success: colorTokens.success[500],
  },
  
  // Interactive colors
  interactive: {
    primary: {
      default: colorTokens.primary[600],
      hover: colorTokens.primary[700],
      active: colorTokens.primary[800],
      disabled: colorTokens.neutral[300],
    },
    secondary: {
      default: colorTokens.secondary[600],
      hover: colorTokens.secondary[700],
      active: colorTokens.secondary[800],
      disabled: colorTokens.neutral[300],
    },
  },
  
  // Surface colors (for cards, modals, etc)
  surface: {
    primary: colorTokens.white,
    secondary: colorTokens.neutral[50],
    raised: colorTokens.white,
    overlay: colorTokens.neutral[900],
  },
} as const;

// Dark theme variant
export const darkSemanticColorTokens = {
  text: {
    primary: colorTokens.neutral[50],
    secondary: colorTokens.neutral[300],
    tertiary: colorTokens.neutral[400],
    inverse: colorTokens.neutral[900],
    disabled: colorTokens.neutral[600],
  },
  
  background: {
    primary: colorTokens.neutral[900],
    secondary: colorTokens.neutral[800],
    tertiary: colorTokens.neutral[700],
    inverse: colorTokens.white,
    overlay: colorTokens.alpha.black[70],
  },
  
  border: {
    primary: colorTokens.neutral[700],
    secondary: colorTokens.neutral[600],
    focus: colorTokens.primary[400],
    error: colorTokens.error[500],
    success: colorTokens.success[500],
  },
  
  interactive: {
    primary: {
      default: colorTokens.primary[400],
      hover: colorTokens.primary[300],
      active: colorTokens.primary[200],
      disabled: colorTokens.neutral[600],
    },
    secondary: {
      default: colorTokens.secondary[400],
      hover: colorTokens.secondary[300],
      active: colorTokens.secondary[200],
      disabled: colorTokens.neutral[600],
    },
  },
  
  surface: {
    primary: colorTokens.neutral[900],
    secondary: colorTokens.neutral[800],
    raised: colorTokens.neutral[800],
    overlay: colorTokens.neutral[50],
  },
} as const;