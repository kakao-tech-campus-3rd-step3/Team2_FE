import React from 'react';
import { useTheme } from '@emotion/react';

interface BrainIconWithBadgeProps {
  size?: string; // 예: '4rem', '64px', '100%'
  borderRadius?: string; // 예: '8px', '1rem', '50%'
}

const BrainIconWithBadge: React.FC<BrainIconWithBadgeProps> = ({
  size = '4rem',
  borderRadius = '1rem',
}) => {
  const theme = useTheme();

  const gradientColor = `linear-gradient(
    to bottom right,
    ${theme.colors.semantic.primary},
    ${theme.colors.green.green5}
  )`;

  return (
    <div
      style={{
        position: 'relative',
        width: size,
        height: size,
      }}
    >
      <div
        style={{
          width: '75%',
          height: '75%',
          background: gradientColor,
          borderRadius,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: '55%', height: '55%', color: 'white' }}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M12 18V5" />
          <path d="M15 13a4.17 4.17 0 0 1-3-4 4.17 4.17 0 0 1-3 4" />
          <path d="M17.598 6.5A3 3 0 1 0 12 5a3 3 0 1 0-5.598 1.5" />
          <path d="M17.997 5.125a4 4 0 0 1 2.526 5.77" />
          <path d="M18 18a4 4 0 0 0 2-7.464" />
          <path d="M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517" />
          <path d="M6 18a4 4 0 0 1-2-7.464" />
          <path d="M6.003 5.125a4 4 0 0 0-2.526 5.77" />
        </svg>
      </div>
    </div>
  );
};

export default BrainIconWithBadge;
