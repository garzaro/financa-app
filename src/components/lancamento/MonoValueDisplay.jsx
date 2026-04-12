import React from 'react';
import { Typography } from '@mui/material';

const MonoValueDisplay = ({ value, color }) => {
  const moneyFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 8, // Support more decimals if needed as per spec crypto example
  });

  return (
    <Typography
      sx={{
        fontFamily: 'monospace',
        fontWeight: 'bold',
        fontSize: '0.9rem',
        color: color || 'text.primary',
      }}
    >
      {moneyFormatter.format(value || 0)}
    </Typography>
  );
};

export default MonoValueDisplay;
