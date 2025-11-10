export const FOLDER_COLORS = [
  { bg: '#a5d8ff', hover: '#74c0fc' }, // 파스텔 블루
  { bg: '#6ee7b7', hover: '#4ade80' }, // 파스텔 그린
  { bg: '#c4b5fd', hover: '#b794f4' }, // 파스텔 퍼플
  { bg: '#fcd34d', hover: '#fbbf24' }, // 파스텔 옐로우/오렌지
  { bg: '#f9a8d4', hover: '#f472b6' }, // 파스텔 핑크
  { bg: '#67e8f9', hover: '#22d3ee' }, // 파스텔 민트/아쿠아
  { bg: '#fca5a5', hover: '#f87171' }, // 파스텔 레드
  { bg: '#a5b4fc', hover: '#818cf8' }, // 파스텔 인디고
  { bg: '#81e6d9', hover: '#4fd1c5' }, // 파스텔 민트
  { bg: '#fdba74', hover: '#fb923c' }, // 파스텔 오렌지
];

export const getFolderColor = (folderId: number) => {
  const index = folderId % FOLDER_COLORS.length;
  return FOLDER_COLORS[index];
};
