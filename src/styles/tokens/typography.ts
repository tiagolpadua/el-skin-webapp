// Design Tokens - Typography System
// Baseado em modular scale para harmonia visual

// Modular scale base (1.25 - Major Third)
const scaleRatio = 1.25;
const baseSize = 16; // 1rem

// Generate modular scale
const generateScale = (steps: number[], base = baseSize, ratio = scaleRatio) => {
  return steps.reduce((scale, step) => {
    const size = step === 0 ? base : base * Math.pow(ratio, step);
    return {
      ...scale,
      [step < 0 ? `xs${Math.abs(step)}` : step === 0 ? 'base' : `xl${step}`]: Math.round(size * 100) / 100,
    };
  }, {} as Record<string, number>);
};

// Font size scale (in px, will be converted to rem)
const fontSizeScale = generateScale([-2, -1, 0, 1, 2, 3, 4, 5, 6, 7]);

// Convert px to rem
const pxToRem = (px: number) => `${px / 16}rem`;

// Font families with proper fallbacks
export const fontFamilyTokens = {
  sans: [
    'Inter',
    'system-ui',
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Roboto',
    'Helvetica Neue',
    'Arial',
    'Noto Sans',
    'sans-serif',
    'Apple Color Emoji',
    'Segoe UI Emoji',
    'Segoe UI Symbol',
    'Noto Color Emoji',
  ].join(', '),
  
  serif: [
    'Georgia',
    'Cambria',
    'Times New Roman',
    'Times',
    'serif',
  ].join(', '),
  
  mono: [
    'JetBrains Mono',
    'Fira Code',
    'Consolas',
    'Monaco',
    'Courier New',
    'monospace',
  ].join(', '),
} as const;

// Font weights with semantic names
export const fontWeightTokens = {
  thin: 100,
  extralight: 200,
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900,
} as const;

// Font sizes (modular scale)
export const fontSizeTokens = {
  xs2: pxToRem(fontSizeScale.xs2), // ~10px
  xs: pxToRem(fontSizeScale.xs1),  // ~13px
  sm: pxToRem(fontSizeScale.base), // 16px
  base: pxToRem(fontSizeScale.base), // 16px
  lg: pxToRem(fontSizeScale.xl1),  // ~20px
  xl: pxToRem(fontSizeScale.xl2),  // ~25px
  '2xl': pxToRem(fontSizeScale.xl3), // ~31px
  '3xl': pxToRem(fontSizeScale.xl4), // ~39px
  '4xl': pxToRem(fontSizeScale.xl5), // ~49px
  '5xl': pxToRem(fontSizeScale.xl6), // ~61px
  '6xl': pxToRem(fontSizeScale.xl7), // ~76px
} as const;

// Line heights (optimized for readability)
export const lineHeightTokens = {
  none: 1,
  tight: 1.15,
  snug: 1.25,
  normal: 1.4,
  relaxed: 1.5,
  loose: 1.75,
} as const;

// Letter spacing (tracking)
export const letterSpacingTokens = {
  tighter: '-0.05em',
  tight: '-0.025em',
  normal: '0em',
  wide: '0.025em',
  wider: '0.05em',
  widest: '0.1em',
} as const;

// Text decoration
export const textDecorationTokens = {
  none: 'none',
  underline: 'underline',
  linethrough: 'line-through',
} as const;

// Text transform
export const textTransformTokens = {
  none: 'none',
  uppercase: 'uppercase',
  lowercase: 'lowercase',
  capitalize: 'capitalize',
} as const;

// Typography preset combinations (semantic)
export const typographyTokens = {
  // Display text (hero sections)
  display: {
    large: {
      fontSize: fontSizeTokens['6xl'],
      fontWeight: fontWeightTokens.bold,
      lineHeight: lineHeightTokens.tight,
      letterSpacing: letterSpacingTokens.tight,
    },
    medium: {
      fontSize: fontSizeTokens['5xl'],
      fontWeight: fontWeightTokens.bold,
      lineHeight: lineHeightTokens.tight,
      letterSpacing: letterSpacingTokens.tight,
    },
    small: {
      fontSize: fontSizeTokens['4xl'],
      fontWeight: fontWeightTokens.semibold,
      lineHeight: lineHeightTokens.snug,
      letterSpacing: letterSpacingTokens.normal,
    },
  },
  
  // Headings
  heading: {
    h1: {
      fontSize: fontSizeTokens['3xl'],
      fontWeight: fontWeightTokens.bold,
      lineHeight: lineHeightTokens.snug,
      letterSpacing: letterSpacingTokens.tight,
    },
    h2: {
      fontSize: fontSizeTokens['2xl'],
      fontWeight: fontWeightTokens.semibold,
      lineHeight: lineHeightTokens.snug,
      letterSpacing: letterSpacingTokens.normal,
    },
    h3: {
      fontSize: fontSizeTokens.xl,
      fontWeight: fontWeightTokens.semibold,
      lineHeight: lineHeightTokens.snug,
      letterSpacing: letterSpacingTokens.normal,
    },
    h4: {
      fontSize: fontSizeTokens.lg,
      fontWeight: fontWeightTokens.medium,
      lineHeight: lineHeightTokens.normal,
      letterSpacing: letterSpacingTokens.normal,
    },
    h5: {
      fontSize: fontSizeTokens.base,
      fontWeight: fontWeightTokens.medium,
      lineHeight: lineHeightTokens.normal,
      letterSpacing: letterSpacingTokens.normal,
    },
    h6: {
      fontSize: fontSizeTokens.sm,
      fontWeight: fontWeightTokens.medium,
      lineHeight: lineHeightTokens.normal,
      letterSpacing: letterSpacingTokens.wide,
      textTransform: textTransformTokens.uppercase,
    },
  },
  
  // Body text
  body: {
    large: {
      fontSize: fontSizeTokens.lg,
      fontWeight: fontWeightTokens.normal,
      lineHeight: lineHeightTokens.relaxed,
      letterSpacing: letterSpacingTokens.normal,
    },
    medium: {
      fontSize: fontSizeTokens.base,
      fontWeight: fontWeightTokens.normal,
      lineHeight: lineHeightTokens.normal,
      letterSpacing: letterSpacingTokens.normal,
    },
    small: {
      fontSize: fontSizeTokens.sm,
      fontWeight: fontWeightTokens.normal,
      lineHeight: lineHeightTokens.normal,
      letterSpacing: letterSpacingTokens.normal,
    },
  },
  
  // Labels and captions
  label: {
    large: {
      fontSize: fontSizeTokens.sm,
      fontWeight: fontWeightTokens.medium,
      lineHeight: lineHeightTokens.normal,
      letterSpacing: letterSpacingTokens.normal,
    },
    medium: {
      fontSize: fontSizeTokens.xs,
      fontWeight: fontWeightTokens.medium,
      lineHeight: lineHeightTokens.normal,
      letterSpacing: letterSpacingTokens.wide,
    },
    small: {
      fontSize: fontSizeTokens.xs2,
      fontWeight: fontWeightTokens.medium,
      lineHeight: lineHeightTokens.normal,
      letterSpacing: letterSpacingTokens.wider,
      textTransform: textTransformTokens.uppercase,
    },
  },
  
  // Code text
  code: {
    inline: {
      fontSize: '0.875em', // Relative to parent
      fontFamily: fontFamilyTokens.mono,
      fontWeight: fontWeightTokens.normal,
      lineHeight: lineHeightTokens.normal,
    },
    block: {
      fontSize: fontSizeTokens.sm,
      fontFamily: fontFamilyTokens.mono,
      fontWeight: fontWeightTokens.normal,
      lineHeight: lineHeightTokens.relaxed,
    },
  },
} as const;

// Responsive typography utilities
export const responsiveTypographyTokens = {
  // Fluid typography using clamp()
  fluid: {
    display: {
      large: `clamp(${fontSizeTokens['4xl']}, 8vw, ${fontSizeTokens['6xl']})`,
      medium: `clamp(${fontSizeTokens['3xl']}, 6vw, ${fontSizeTokens['5xl']})`,
      small: `clamp(${fontSizeTokens['2xl']}, 4vw, ${fontSizeTokens['4xl']})`,
    },
    heading: {
      h1: `clamp(${fontSizeTokens['2xl']}, 3vw, ${fontSizeTokens['3xl']})`,
      h2: `clamp(${fontSizeTokens.xl}, 2.5vw, ${fontSizeTokens['2xl']})`,
      h3: `clamp(${fontSizeTokens.lg}, 2vw, ${fontSizeTokens.xl})`,
    },
  },
} as const;