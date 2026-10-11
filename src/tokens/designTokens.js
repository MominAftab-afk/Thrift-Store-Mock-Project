/**
 * DESIGN TOKENS
 * Single source of truth for all color palettes, typography scales,
 * spacing units, and motion parameters used across DOM and Three.js elements.
 */

export const DESIGN_TOKENS = {
  colors: {
    sand: {
      50: '#FAF6F0',
      100: '#F5EBE1', // primary page canvas
      200: '#EBDDCF', // secondary background
      300: '#E0CEBC', // subtle border / card surface
      400: '#C7B29B', // border medium
      500: '#A6917B', // neutral medium
      600: '#826F5C', // subdued copy
      700: '#5C4D3E',
      800: '#3D3329',
      900: '#241D17',
    },
    ink: {
      950: '#12100E', // deepest charcoal espresso
      900: '#1C1917', // primary ink text
      800: '#2B2623',
      700: '#443D38',
      600: '#615750',
      500: '#7E736A',
      400: '#A3988E',
      300: 'rgba(200, 191, 183, 1)',
      200: '#E4DFDA',
      100: '#F2EFEB',
      50: '#FAF8F6',
    },
    clay: {
      50: '#FBF4F1',
      100: '#F6E6E1',
      200: '#ECCBC2',
      300: '#DEABA0',
      400: '#CE8674',
      500: '#B85D3D', // terracotta accent
      600: '#A14F32', // primary CTA
      700: '#833F27',
      800: '#683320',
      900: '#4D2517',
    },
    olive: {
      50: '#F4F6F2',
      100: '#E6ECE2',
      200: '#CCD8C4',
      300: '#ACC1A2',
      400: '#8CA780',
      500: '#5B7854',
      600: '#435B40', // verified stamp / like-new
      700: '#364A34',
    },
    ochre: {
      50: '#FAF5EC',
      100: '#F4E9D2',
      200: '#E8D2A6',
      300: '#DCB97A',
      400: '#D0A04E',
      500: '#C48729',
      600: '#B87B2E', // vintage deal alert
      700: '#986422',
    },
  },
  typography: {
    fontFamilies: {
      serif: '"Fraunces", "Playfair Display", Georgia, serif',
      sans: '"Plus Jakarta Sans", "Inter", -apple-system, sans-serif',
      mono: '"JetBrains Mono", monospace',
    },
    sizes: {
      'display-2xl': { size: '4.5rem', lineHeight: '1.05', letterSpacing: '-0.03em' },
      'display-xl': { size: '3.75rem', lineHeight: '1.08', letterSpacing: '-0.025em' },
      'display-lg': { size: '3rem', lineHeight: '1.12', letterSpacing: '-0.02em' },
      'heading-1': { size: '2.25rem', lineHeight: '1.2', letterSpacing: '-0.015em' },
      'heading-2': { size: '1.75rem', lineHeight: '1.25', letterSpacing: '-0.01em' },
      'heading-3': { size: '1.375rem', lineHeight: '1.3', letterSpacing: '0em' },
      'body-lg': { size: '1.125rem', lineHeight: '1.6', letterSpacing: '0em' },
      'body-base': { size: '1rem', lineHeight: '1.55', letterSpacing: '0em' },
      'body-sm': { size: '0.875rem', lineHeight: '1.5', letterSpacing: '0.01em' },
      'caption': { size: '0.75rem', lineHeight: '1.4', letterSpacing: '0.02em' },
      'archival-tag': { size: '0.6875rem', lineHeight: '1.2', letterSpacing: '0.22em' },
    },
  },
  motion: {
    easing: {
      luxury: [0.16, 1, 0.3, 1], // fluid decelerating luxury curve
      tactile: [0.2, 0.8, 0.2, 1], // responsive micro-interaction curve
      gentle: [0.4, 0, 0.2, 1], // ambient fade
    },
    duration: {
      fast: 0.15,
      normal: 0.28,
      slow: 0.45,
      cinematic: 0.8,
    },
  },
  radii: {
    xs: '4px',
    sm: '6px',
    md: '10px',
    lg: '16px',
    xl: '24px',
    pill: '9999px',
  },
  shadows: {
    softSm: '0 2px 8px -2px rgba(28, 25, 23, 0.05)',
    softMd: '0 8px 24px -4px rgba(28, 25, 23, 0.07)',
    softLg: '0 16px 40px -8px rgba(28, 25, 23, 0.1)',
    card: '0 4px 20px -2px rgba(92, 77, 62, 0.08)',
  }
};
