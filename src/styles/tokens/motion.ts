// Design Tokens - Motion & Animation System
// Baseado em curvas naturais e princípios de UX

// Duration tokens (in milliseconds)
export const durationTokens = {
  instant: '0ms',
  fast: '150ms',
  normal: '200ms',
  slow: '300ms',
  slower: '500ms',
  slowest: '800ms',
} as const;

// Easing tokens (natural motion curves)
export const easingTokens = {
  // Standard easing curves
  linear: 'linear',
  ease: 'ease',
  easeIn: 'ease-in',
  easeOut: 'ease-out',
  easeInOut: 'ease-in-out',
  
  // Custom cubic-bezier curves (more natural)
  spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', // Bouncy spring
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',  // Bounce effect
  smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',            // Material Design
  swift: 'cubic-bezier(0.4, 0, 0.6, 1)',             // Swift out
  snappy: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',    // Snappy
  
  // Entrance animations
  fadeIn: 'cubic-bezier(0, 0, 0.2, 1)',
  slideIn: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  scaleIn: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  
  // Exit animations
  fadeOut: 'cubic-bezier(0.4, 0, 1, 1)',
  slideOut: 'cubic-bezier(0.55, 0.06, 0.68, 0.19)',
  scaleOut: 'cubic-bezier(0.6, -0.28, 0.735, 0.045)',
} as const;

// Transition tokens (combined duration + easing)
export const transitionTokens = {
  // Quick interactions
  fast: `${durationTokens.fast} ${easingTokens.smooth}`,
  
  // Standard interactions
  normal: `${durationTokens.normal} ${easingTokens.smooth}`,
  
  // Slow, deliberate interactions
  slow: `${durationTokens.slow} ${easingTokens.smooth}`,
  
  // Specific interaction types
  button: `${durationTokens.fast} ${easingTokens.smooth}`,
  modal: `${durationTokens.normal} ${easingTokens.smooth}`,
  drawer: `${durationTokens.slow} ${easingTokens.swift}`,
  fade: `${durationTokens.normal} ${easingTokens.fadeIn}`,
  slide: `${durationTokens.normal} ${easingTokens.slideIn}`,
  scale: `${durationTokens.fast} ${easingTokens.scaleIn}`,
  
  // All properties
  all: `all ${durationTokens.normal} ${easingTokens.smooth}`,
} as const;

// Reduced motion preferences
export const reducedMotionTokens = {
  // Respect user preferences
  respectMotionPreferences: true,
  
  // Fallback values for reduced motion
  reducedDuration: '0.01ms',
  reducedEasing: 'linear',
  
  // Media query for reduced motion
  prefersReducedMotion: '@media (prefers-reduced-motion: reduce)',
  prefersMotion: '@media (prefers-reduced-motion: no-preference)',
} as const;

// Animation preset combinations
export const animationTokens = {
  // Button interactions
  buttonHover: {
    duration: durationTokens.fast,
    easing: easingTokens.smooth,
    properties: ['transform', 'box-shadow', 'background-color'],
  },
  
  // Modal animations
  modalEnter: {
    duration: durationTokens.normal,
    easing: easingTokens.scaleIn,
  },
  
  modalExit: {
    duration: durationTokens.fast,
    easing: easingTokens.scaleOut,
  },
  
  // Card interactions
  cardHover: {
    duration: durationTokens.normal,
    easing: easingTokens.smooth,
    transform: 'translateY(-4px)',
  },
  
  // Loading states
  skeleton: {
    duration: '1.5s',
    easing: easingTokens.easeInOut,
    iterationCount: 'infinite',
  },
} as const;