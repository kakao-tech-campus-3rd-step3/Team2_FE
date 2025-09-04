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
  sidebarHover: '#fafafa',
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
  spacing17: '68px',
  spacing18: '72px',
  spacing19: '76px',
  spacing20: '80px',
  spacing21: '84px',
  spacing22: '88px',
  spacing23: '92px',
  spacing24: '96px',
  spacing25: '100px',
  spacing26: '104px',
  spacing27: '108px',
  spacing28: '112px',
  spacing29: '116px',
  spacing30: '120px',
  spacing31: '124px',
  spacing32: '128px',
  spacing33: '132px',
  spacing34: '136px',
  spacing35: '140px',
  spacing36: '144px',
  spacing37: '148px',
  spacing38: '152px',
  spacing39: '156px',
  spacing40: '160px',
  spacing41: '164px',
  spacing42: '168px',
  spacing43: '172px',
  spacing44: '176px',
  spacing45: '180px',
  spacing46: '184px',
  spacing47: '188px',
  spacing48: '192px',
  spacing49: '196px',
  spacing50: '200px',
  spacing51: '204px',
  spacing52: '208px',
  spacing53: '212px',
  spacing54: '216px',
  spacing55: '220px',
  spacing56: '224px',
  spacing57: '228px',
  spacing58: '232px',
  spacing59: '236px',
  spacing60: '240px',
  spacing61: '244px',
  spacing62: '248px',
  spacing63: '252px',
  spacing64: '256px',
  spacing65: '260px',
  spacing66: '264px',
  spacing67: '268px',
  spacing68: '272px',
  spacing69: '276px',
  spacing70: '280px',
  spacing71: '284px',
  spacing72: '288px',
  spacing73: '292px',
  spacing74: '296px',
  spacing75: '300px',
  spacing76: '304px',
  spacing77: '308px',
  spacing78: '312px',
  spacing79: '316px',
  spacing80: '320px',
  spacing81: '324px',
  spacing82: '328px',
  spacing83: '332px',
  spacing84: '336px',
  spacing85: '340px',
  spacing86: '344px',
  spacing87: '348px',
  spacing88: '352px',
  spacing89: '356px',
  spacing90: '360px',
  spacing91: '364px',
  spacing92: '368px',
  spacing93: '372px',
  spacing94: '376px',
  spacing95: '380px',
  spacing96: '384px',
  spacing97: '388px',
  spacing98: '392px',
  spacing99: '396px',
  spacing100: '400px',

};

const radius = {
  radius0: '0px',
  radius1: '4px',
  radius2: '8px',
  radius3: '12px',
  radius4: '16px',
  radius5: '20px',
  radiusFull: '50%', // 완벽한 원을 만들 때 사용
};

// 폰트 토큰
const font = {
  heading: `'Pretendard', sans-serif`,
  body: `'Pretendard', sans-serif`,
};
export const theme = extendTheme({ config, colors, textStyles, space, radius, font });

export type AppTheme = typeof theme;
