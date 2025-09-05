import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const colors = {
  semantic: {
    primary: '#16a34a', // 메인 버튼, 주요 아이콘 등
  },
  
  background: {
    background: '#f7f8f9', // 전체 페이지 배경색 (가장 연한 회색)
    foreground: '#ffffff', // 카드, 모달 배경색
    sidebar: '#ffffff', // 사이드바 배경색
    sidebarHover: '#f3f4f6', // 사이드바 아이템 호버 시 배경색
    overlay: '#00000080', // 모달 뒷 배경의 반투명 오버레이
  },

  text: {
    title: '#171717', // 대시보드, 대제목 텍스트
    default: '#1f2937', // 일반적인 텍스트
    subtitle: '#4b5563', // 학습 현황 설명, 사이드바 메뉴 텍스트
    lightGray: '#9ca3af', // 연출 학습량, 오늘 학습량, "없음" 텍스트
  },

  border: {
    default: '#d1d5db', // 카드, 구분선
    listItem: '#e5e7eb', // 리스트 아이템 구분선
  },

  state: {
    success: '#16a34a', // 학습 진행, 성공 지표 (연속 학습일 아이콘, 학습 활동 차트)
    info: '#8b5cf6', // 총 문제 수 아이콘
    warning: '#f97316', // 이전 주 문제 아이콘
  },

  gray: {
    gray0: '#ffffff', // 흰색
    gray1: '#f7f8f9', // 새로운 가장 연한 배경색
    gray2: '#fafafa', // 기존 가장 연한 배경색
    gray3: '#f3f4f6', // 연한 회색 (호버)
    gray4: '#e5e7eb', // 중간 연한 회색 (테두리)
    gray5: '#d1d5db', // 중간 회색 (테두리, 아이콘)
    gray6: '#9ca3af', // 연한 회색 텍스트
    gray7: '#4b5563', // 중간 회색 텍스트
    gray8: '#171717', // 진한 회색 텍스트 (거의 검정)
    gray9: '#0a0a0a', // 새로운 진한 검은색 (카카오 버튼 텍스트)
  },

  red: {
    red0: '#ef4444',
    red1: '#dc2626', // 어려움 뱃지 텍스트
    red2: '#fecaca', // 어려움 뱃지 배경
    red3: '#fef2f2', // 고급 뱃지 배경
  },
  
  yellow: {
    kakaoYellow: '#fee500',
    kakaoHover: '#FFD700',
    starFill: '#facc15', // 별 아이콘 채우기
    starStroke: '#f59e0b', // 별 아이콘 테두리
    yellow0: '#fffbeb', // 중급 뱃지 배경
    yellow1: '#d97706', // 중급 뱃지 텍스트
  },

  green: {
    green0: '#e2ffeaff', // 일러스트 배경의 가장 연한 초록색
    green1: '#dcfce7', // 학습 활동 차트의 연한 초록색
    green2: '#EFFCF3', // 선택된 아이템의 배경색
    green3: '#bbf7d0', // 학습 활동 차트의 중간 초록색
    green4: '#86efac', // 학습 활동 차트의 진한 초록색
    green5: '#4ade80', // "정상" 뱃지
    green6: '#16a34a', // 기본 초록색 (primary)
  },

  blue: {
    blue0: '#3b82f6', // 태그/텍스트 색상
    blue1: '#dbeafe', // 태그/배경 색상
    blue2: '#60a5fa', // 폴더 옆 아이콘
  },

  // 밑에부터 위에걸로 바꾸면 지워도됨
  card: '#ffffff',
  cardForeground: '#171717',

  popover: '#ffffff',
  popoverForeground: '#171717',

  
  primaryForeground: '#ffffff',

  secondary: '#f5f5f5',
  secondaryForeground: '#737373',

  muted: '#f5f5f5',
  mutedForeground: '#737373',

  accent: '#f5f5f5',
  accentForeground: '#404040',

  destructive: '#ef4444',
  destructiveForeground: '#ffffff',

  

  input: '#ffffff',
  inputBackground: '#ffffff',

  switchBackground: '#e5e5e5',

  

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

  // 로그인 페이지
  leftsideBackground: '#e2ffeaff',
  rightsideBackground: '#ffffffc0',
  termsTextColor: '#919191ff',
  kakaoYellow: '#fee500',
  cardTitle: '#111827',
  cardDescription: '#4b5563',
  checkCircle: '#10b981',
  borderTop: '#f3f4f6',
};
// 색상 토큰
// const colors = {
//   semantic: {
//     primary: '#16a34a',
//   },
  
//   background: {
//     background: '#fafafa',
//     foreground: '#171717',
//   },

//   text: {

//   },

//   border: {
//     border: '#d1d5db',
//   },

//   state: {

//   },

  
//   gray: {
//     gray0: '#ffffff',
//     gray1: '#ffffffc0',
//     gray2: '#f5f5f5',
//     gray3: '#f3f4f6',
//     gray4: '#fafafa',
//     gray5: '#e5e5e5',
//     gray6: '#d4d4d4',
//     gray7: '#d1d5db',
//     gray8: '#a3a3a3',
//     gray9: '#9ca3af',
//     gray10: '#919191ff',
//     gray11: '#4b5563',
//     gray12: '#404040',
//     gray13: '#525252',
//     gray14: '#737373',
//     gray15: '#0a0a0a',
//     gray16: '#262626',
//     gray17: '#171717',
//     gray18: '#111827',
//   },

//   red: {
//     red0: '#ef4444',
//   },
  
//   yellow: {
//     kakaoYellow: '#fee500',
//     kakaoHover: '#FFD700',
//   },

//   green: {
//     green0: '#e2ffeaff',
//     green1: '#EFFCF3',
//     green2: '#16a34a',
//     green3: '#34d399',
//     green4: '#22c55e',
//     green5: '#10b981',
//   },

//   blue: {

//   },



//   // 밑에는 레거시
//   card: '#ffffff',
//   cardForeground: '#171717',

//   popover: '#ffffff',
//   popoverForeground: '#171717',

  
//   primaryForeground: '#ffffff',

//   secondary: '#f5f5f5',
//   secondaryForeground: '#737373',

//   muted: '#f5f5f5',
//   mutedForeground: '#737373',

//   accent: '#f5f5f5',
//   accentForeground: '#404040',

//   destructive: '#ef4444',
//   destructiveForeground: '#ffffff',

  

//   input: '#ffffff',
//   inputBackground: '#ffffff',

//   switchBackground: '#e5e5e5',

  

//   // 차트 색상들
//   chart: {
//     1: '#16a34a',
//     2: '#404040',
//     3: '#737373',
//     4: '#a3a3a3',
//     5: '#d4d4d4',
//   },

//   // 사이드바
//   sidebar: '#ffffff',
//   sidebarForeground: '#171717',
//   sidebarPrimary: '#16a34a',
//   sidebarPrimaryForeground: '#ffffff',
//   sidebarAccent: '#f5f5f5',
//   sidebarHover: '#fafafa',
//   sidebarAccentForeground: '#404040',
//   sidebarBorder: '#e5e5e5',
//   sidebarRing: '#16a34a',

//   // 로그인 페이지
//   leftsideBackground: '#e2ffeaff',
//   rightsideBackground: '#ffffffc0',
//   termsTextColor: '#919191ff',
//   kakaoYellow: '#fee500',
//   cardTitle: '#111827',
//   cardDescription: '#4b5563',
//   checkCircle: '#10b981',
//   borderTop: '#f3f4f6',
// };

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
