/**
 * DESIGN TOKENS
 * Single source of truth for gallery white canvas, crisp ink, and refined designer proportions.
 */

export const DESIGN_TOKENS = {
  colors: {
    surface: {
      white: '#FFFFFF',
      muted: '#F9F9FA',
      subtle: '#F4F4F6',
      border: '#E8E8EC',
      borderStrong: '#D6D6DC',
    },
    ink: {
      950: '#0A0A0A',
      900: '#141414',
      800: '#222222',
      700: '#3D3D3D',
      600: '#5A5A5A',
      500: '#767676',
      400: '#9E9E9E',
      300: '#CCCCCC',
      200: '#E5E5E5',
      100: '#F2F2F2',
      50: '#FAFAFA',
    },
    clay: {
      50: '#FAF5F3',
      100: '#F4EAE6',
      500: '#A04628',
      600: '#8E3C20',
      700: '#753018',
    },
    olive: {
      50: '#F4F7F4',
      100: '#E7EDE7',
      600: '#2D5438',
      700: '#23422C',
    },
    ochre: {
      50: '#FAF7EE',
      100: '#F3ECD6',
      600: '#A47020',
      700: '#865A16',
    },
  },
  typography: {
    fontFamilies: {
      serif: '"Fraunces", "Playfair Display", Georgia, serif',
      sans: '"Plus Jakarta Sans", "Inter", -apple-system, sans-serif',
      mono: '"JetBrains Mono", monospace',
    },
    scale: {
      'display': { size: '2.25rem', lineHeight: '2.6rem', letterSpacing: '-0.03em' },
      'h1': { size: '1.75rem', lineHeight: '2.1rem', letterSpacing: '-0.02em' },
      'h2': { size: '1.375rem', lineHeight: '1.75rem', letterSpacing: '-0.015em' },
      'h3': { size: '1.125rem', lineHeight: '1.5rem', letterSpacing: '-0.01em' },
      'body': { size: '0.875rem', lineHeight: '1.45rem', letterSpacing: '0em' },
      'caption': { size: '0.75rem', lineHeight: '1.1rem', letterSpacing: '0.01em' },
      'archival-tag': { size: '0.6875rem', lineHeight: '0.95rem', letterSpacing: '0.18em' },
    },
  },
  radii: {
    xs: '2px',
    sm: '4px',
    md: '6px',
    lg: '8px',
    pill: '9999px',
  },
};
