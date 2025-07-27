// Design Tokens - Spacing System
// Baseado em 8pt grid system para consistência visual

// Base unit: 8px (0.5rem)
const baseUnit = 0.5; // rem

// Spacing scale (8pt grid: 0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128)
export const spacingTokens = {
  // Exact 8pt values
  0: '0',
  0.5: '0.125rem', // 2px
  1: '0.25rem',    // 4px
  1.5: '0.375rem', // 6px
  2: '0.5rem',     // 8px
  2.5: '0.625rem', // 10px
  3: '0.75rem',    // 12px
  3.5: '0.875rem', // 14px
  4: '1rem',       // 16px
  5: '1.25rem',    // 20px
  6: '1.5rem',     // 24px
  7: '1.75rem',    // 28px
  8: '2rem',       // 32px
  9: '2.25rem',    // 36px
  10: '2.5rem',    // 40px
  11: '2.75rem',   // 44px
  12: '3rem',      // 48px
  14: '3.5rem',    // 56px
  16: '4rem',      // 64px
  20: '5rem',      // 80px
  24: '6rem',      // 96px
  28: '7rem',      // 112px
  32: '8rem',      // 128px
  36: '9rem',      // 144px
  40: '10rem',     // 160px
  44: '11rem',     // 176px
  48: '12rem',     // 192px
  52: '13rem',     // 208px
  56: '14rem',     // 224px
  60: '15rem',     // 240px
  64: '16rem',     // 256px
  72: '18rem',     // 288px
  80: '20rem',     // 320px
  96: '24rem',     // 384px
} as const;

// Semantic spacing (based on usage context)
export const semanticSpacingTokens = {
  // Component spacing
  component: {
    xs: spacingTokens[1],   // 4px - minimal spacing
    sm: spacingTokens[2],   // 8px - small spacing
    md: spacingTokens[4],   // 16px - medium spacing
    lg: spacingTokens[6],   // 24px - large spacing
    xl: spacingTokens[8],   // 32px - extra large spacing
    xxl: spacingTokens[12], // 48px - extra extra large
  },
  
  // Layout spacing
  layout: {
    xs: spacingTokens[4],   // 16px
    sm: spacingTokens[6],   // 24px
    md: spacingTokens[8],   // 32px
    lg: spacingTokens[12],  // 48px
    xl: spacingTokens[16],  // 64px
    xxl: spacingTokens[24], // 96px
  },
  
  // Container spacing
  container: {
    xs: spacingTokens[4],   // 16px
    sm: spacingTokens[6],   // 24px
    md: spacingTokens[8],   // 32px
    lg: spacingTokens[12],  // 48px
    xl: spacingTokens[16],  // 64px
  },
  
  // Section spacing (vertical rhythm)
  section: {
    xs: spacingTokens[8],   // 32px
    sm: spacingTokens[12],  // 48px
    md: spacingTokens[16],  // 64px
    lg: spacingTokens[24],  // 96px
    xl: spacingTokens[32],  // 128px
  },
} as const;

// Border radius tokens
export const borderRadiusTokens = {
  none: '0',
  xs: '0.125rem',  // 2px
  sm: '0.25rem',   // 4px
  md: '0.375rem',  // 6px
  lg: '0.5rem',    // 8px
  xl: '0.75rem',   // 12px
  '2xl': '1rem',   // 16px
  '3xl': '1.5rem', // 24px
  full: '9999px',  // Fully rounded
} as const;

// Border width tokens
export const borderWidthTokens = {
  0: '0',
  1: '1px',
  2: '2px',
  4: '4px',
  8: '8px',
} as const;

// Size tokens (for width/height)
export const sizeTokens = {
  // Fixed sizes
  0: '0',
  px: '1px',
  0.5: spacingTokens[0.5],
  1: spacingTokens[1],
  1.5: spacingTokens[1.5],
  2: spacingTokens[2],
  2.5: spacingTokens[2.5],
  3: spacingTokens[3],
  3.5: spacingTokens[3.5],
  4: spacingTokens[4],
  5: spacingTokens[5],
  6: spacingTokens[6],
  7: spacingTokens[7],
  8: spacingTokens[8],
  9: spacingTokens[9],
  10: spacingTokens[10],
  11: spacingTokens[11],
  12: spacingTokens[12],
  14: spacingTokens[14],
  16: spacingTokens[16],
  20: spacingTokens[20],
  24: spacingTokens[24],
  28: spacingTokens[28],
  32: spacingTokens[32],
  36: spacingTokens[36],
  40: spacingTokens[40],
  44: spacingTokens[44],
  48: spacingTokens[48],
  52: spacingTokens[52],
  56: spacingTokens[56],
  60: spacingTokens[60],
  64: spacingTokens[64],
  72: spacingTokens[72],
  80: spacingTokens[80],
  96: spacingTokens[96],
  
  // Fractional sizes
  '1/2': '50%',
  '1/3': '33.333333%',
  '2/3': '66.666667%',
  '1/4': '25%',
  '2/4': '50%',
  '3/4': '75%',
  '1/5': '20%',
  '2/5': '40%',
  '3/5': '60%',
  '4/5': '80%',
  '1/6': '16.666667%',
  '2/6': '33.333333%',
  '3/6': '50%',
  '4/6': '66.666667%',
  '5/6': '83.333333%',
  
  // Full size
  full: '100%',
  
  // Viewport sizes
  screen: '100vw',
  
  // Minimum sizes
  min: 'min-content',
  max: 'max-content',
  fit: 'fit-content',
} as const;

// Z-index tokens (stacking order)
export const zIndexTokens = {
  hide: -1,
  auto: 'auto',
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800,
} as const;

// Aspect ratio tokens
export const aspectRatioTokens = {
  auto: 'auto',
  square: '1 / 1',
  video: '16 / 9',
  portrait: '3 / 4',
  landscape: '4 / 3',
  widescreen: '21 / 9',
  ultrawide: '32 / 9',
  golden: '1.618 / 1', // Golden ratio
} as const;