import { useTheme } from '@emotion/react';

const TitleSection = () => {
  const theme = useTheme();

  return (
    <h1
      style={{
        fontSize: theme.typography.title1Bold.fontSize,
        fontWeight: theme.typography.title1Bold.fontWeight,
        background: `linear-gradient(
          to right,
          ${theme.colors.gray.gray9},
          ${theme.colors.semantic.primary},
          ${theme.colors.green.green5}
        )`,
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        color: 'transparent',
        userSelect: 'none',
        margin: 0,
      }}
    >
      PULL IT
    </h1>
  );
};

export default TitleSection;
