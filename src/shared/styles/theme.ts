import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

// 색상 토큰
const colors = {
  background: '#fafafa',
  foreground: '#171717',

  card: '#ffffff',
  cardForeground: '#171717',

  popover: '#ffffff',
  popoverForeground: '#171717',

  primary: '#16a34a',
  primaryForeground: '#ffffff',

  secondary: '#f5f5f5',
  secondaryForeground: '#737373',

  muted: '#f5f5f5',
  mutedForeground: '#737373',

  accent: '#f5f5f5',
  accentForeground: '#404040',

  destructive: '#ef4444',
  destructiveForeground: '#ffffff',

  border: '#d1d5db',

  input: '#ffffff',
  inputBackground: '#ffffff',

  switchBackground: '#e5e5e5',

  ring: '#16a34a',

  // 로그인 페이지
  leftsideBackground: '#e2ffeaff',
  rightsideBackground: '#ffffffc0',
  termsTextColor: '#919191ff',
  kakaoYellow: '#fee500',
  cardTitle: '#111827',
  cardDescription: '#4b5563',
  checkCircle: '#10b981',
  borderTop: '#f3f4f6',

  // 차트 색상들
  chart: {
    1: '#16a34a',
    2: '#404040',
    3: '#737373',
    4: '#a3a3a3',
    5: '#d4d4d4',
  },

  // 사이드바
  sidebar: '#ffffff',
  sidebarForeground: '#171717',
  sidebarPrimary: '#16a34a',
  sidebarPrimaryForeground: '#ffffff',
  sidebarAccent: '#f5f5f5',
  sidebarAccentForeground: '#404040',
  sidebarBorder: '#e5e5e5',
  sidebarRing: '#16a34a',
};

// 차크라 UI 다크모드 설정값
const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

// 타이포그라피 토큰
const textStyles = {
  // 제목 (Title)
  title1Bold: {
    fontSize: '1.25rem', // 20px
    fontWeight: '700',
    lineHeight: '1.6875rem', // 27px
  },
  title1Regular: {
    fontSize: '1.25rem',
    fontWeight: '400',
    lineHeight: '1.6875rem',
  },
  title2Bold: {
    fontSize: '1rem', // 16px
    fontWeight: '700',
    lineHeight: '1.5rem', // 24px
  },
  title2Regular: {
    fontSize: '1rem',
    fontWeight: '400',
    lineHeight: '1.5rem',
  },

  // 부제목 (Subtitle)
  subtitle1Bold: {
    fontSize: '1rem',
    fontWeight: '700',
    lineHeight: '1.375rem', // 22px
  },
  subtitle1Regular: {
    fontSize: '1rem',
    fontWeight: '400',
    lineHeight: '1.5rem', // 24px
  },
  subtitle2Bold: {
    fontSize: '0.875rem', // 14px
    fontWeight: '700',
    lineHeight: '1.1875rem', // 19px
  },
  subtitle2Regular: {
    fontSize: '0.875rem',
    fontWeight: '400',
    lineHeight: '1.1875rem',
  },

  // 본문 (Body)
  body1Bold: {
    fontSize: '1rem',
    fontWeight: '700',
    lineHeight: '1.375rem', // 22px
  },
  body1Regular: {
    fontSize: '1rem',
    fontWeight: '400',
    lineHeight: '1.375rem',
  },
  body2Bold: {
    fontSize: '0.875rem',
    fontWeight: '700',
    lineHeight: '1.1875rem', // 19px
  },
  body2Regular: {
    fontSize: '0.875rem',
    fontWeight: '400',
    lineHeight: '1.1875rem',
  },

  // 라벨 (Label)
  label1Bold: {
    fontSize: '0.875rem',
    fontWeight: '700',
    lineHeight: '1.1875rem',
  },
  label1Regular: {
    fontSize: '0.875rem',
    fontWeight: '400',
    lineHeight: '1.1875rem',
  },
  label2Bold: {
    fontSize: '0.75rem', // 12px
    fontWeight: '700',
    lineHeight: '1rem', // 16px
  },
  label2Regular: {
    fontSize: '0.75rem',
    fontWeight: '400',
    lineHeight: '1rem',
  },
};

// 여백 토큰
const space = {
  spacing0: '0px',
  spacing1: '4px',
  spacing2: '8px',
  spacing3: '12px',
  spacing4: '16px',
  spacing5: '20px',
  spacing6: '24px',
  spacing7: '28px',
  spacing8: '32px',
  spacing9: '36px',
  spacing10: '40px',
  spacing11: '44px',
  spacing12: '48px',
  spacing13: '52px',
  spacing14: '56px',
  spacing15: '60px',
  spacing16: '64px',
};

// 폰트 토큰
const font = {
  heading: `'Pretendard', sans-serif`,
  body: `'Pretendard', sans-serif`,
};
export const theme = extendTheme({ config, colors, textStyles, space, font });

export type AppTheme = typeof theme;
