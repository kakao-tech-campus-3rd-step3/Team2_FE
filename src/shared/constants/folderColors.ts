export const FOLDER_COLORS = [
  { bg: '#3b82f6', hover: '#2563eb' },
  { bg: '#10b981', hover: '#059669' },
  { bg: '#8b5cf6', hover: '#7c3aed' },
  { bg: '#f59e0b', hover: '#d97706' },
  { bg: '#ec4899', hover: '#db2777' },
  { bg: '#06b6d4', hover: '#0891b2' },
  { bg: '#ef4444', hover: '#dc2626' },
  { bg: '#6366f1', hover: '#4f46e5' },
  { bg: '#14b8a6', hover: '#0d9488' },
  { bg: '#f97316', hover: '#ea580c' },
];

export const getFolderColor = (folderId: number) => {
  const index = folderId % FOLDER_COLORS.length;
  return FOLDER_COLORS[index];
};
