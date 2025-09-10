import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

export const colors = {
  semantic: {
    primary: '#16a34a', // 메인 버튼, 주요 아이콘 등
    kakaoYellow: '#fee500',
    kakaoHover: '#FFD700',
    kakaoBlack: '#0a0a0a',
  },

  text: {
    default: '#1f2937', // 일반적인 텍스트
    title: '#171717', // 대시보드, 대제목 텍스트
    subtitle: '#4b5563', // 학습 현황 설명, 사이드바 메뉴 텍스트
  },

  background: {
    background: '#f7f8f9', // 전체 페이지 배경색 (가장 연한 회색)
    foreground: '#ffffff', // 카드, 모달 배경색
    sidebar: '#ffffff', // 사이드바 배경색
    sidebarHover: '#f3f4f6', // 사이드바 아이템 호버 시 배경색
    overlay: '#00000080', // 모달 뒷 배경의 반투명 오버레이
  },

  border: {
    border0: '#d1d5db', // 카드, 구분선
    border1: '#e5e7eb', // 리스트 아이템 구분선
  },

  gray: {
    gray0: '#ffffff', // 흰색
    gray1: '#fafafa', // 기존 가장 연한 배경색
    gray2: '#f7f8f9', // 새로운 가장 연한 배경색
    gray3: '#f3f4f6', // 연한 회색 (호버)
    gray4: '#e5e7eb', // 중간 연한 회색 (테두리)
    gray5: '#d1d5db', // 중간 회색 (테두리, 아이콘)
    gray6: '#9ca3af', // 연한 회색 텍스트
    gray7: '#4b5563', // 중간 회색 텍스트
    gray8: '#1f2937',
    gray9: '#171717', // 진한 회색 텍스트 (거의 검정)
    gray10: '#0a0a0a', // 새로운 진한 검은색 (카카오 버튼 텍스트)
  },

  red: {
    red0: '#fef2f2',
    red1: '#fecaca',
    red3: '#ef4444',
    red4: '#dc2626',
  },

  orange: {
    orange0: '#f97316',
  },

  yellow: {
    yellow0: '#fffbeb', // 중급 뱃지 배경
    yellow1: '#FFD700',
    yellow2: '#fee500',
    yellow3: '#facc15',
    yellow4: '#f59e0b',
    yellow5: '#d97706', // 중급 뱃지 텍스트
  },

  green: {
    green0: '#e2ffeaff', // 일러스트 배경의 가장 연한 초록색
    green1: '#EFFCF3', // 선택된 아이템의 배경색
    green2: '#dcfce7', // 학습 활동 차트의 연한 초록색
    green3: '#bbf7d0', // 학습 활동 차트의 중간 초록색
    green4: '#86efac', // 학습 활동 차트의 진한 초록색
    green7: '#4FC65F',
    green5: '#4ade80', // "정상" 뱃지
    green6: '#16a34a', // 기본 초록색 (primary)
  },

  blue: {
    blue0: '#dbeafe', // 태그/배경 색상
    blue1: '#60a5fa', // 폴더 옆 아이콘
    blue2: '#3b82f6', // 태그/텍스트 색상
  },

  purple: {
    purple0: '#8b5cf6',
  },
} as const;

// 타이포그라피 토큰
export const typography = {
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
} as const;

export const spacing = {
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
} as const;

export const radius = {
  radius0: '0px',
  radius1: '4px',
  radius2: '8px',
  radius3: '12px',
  radius4: '16px',
  radius5: '20px',
  radiusFull: '50%', // 완벽한 원을 만들 때 사용
} as const;

// 폰트 토큰
export const font = {
  heading: `'Pretendard', sans-serif`,
  body: `'Pretendard', sans-serif`,
};

// 차크라 UI 다크모드 설정값
export const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

export type AppTheme = {
  colors: typeof colors;
  typography: typeof typography;
  spacing: typeof spacing;
  radius: typeof radius;
  font: typeof font;
};

export const theme = extendTheme({
  config,
  colors,
  typography,
  spacing,
  radius,
  font,
}) as AppTheme;
