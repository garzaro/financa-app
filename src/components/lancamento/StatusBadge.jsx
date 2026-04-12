import React from 'react';
import { Chip } from '@mui/material';

const StatusBadge = ({ status }) => {
  let color = 'default';
  let label = status || 'PENDENTE';

  switch (status) {
    case 'EFETIVADO':
      color = 'success';
      label = 'Efetivado';
      break;
    case 'CANCELADO':
      color = 'error';
      label = 'Cancelado';
      break;
    case 'PENDENTE':
      color = 'warning';
      label = 'Pendente';
      break;
    default:
      color = 'default';
  }

  return (
    <Chip 
      label={label} 
      color={color} 
      size="small" 
      variant="filled" 
      sx={{ fontWeight: 'bold', fontSize: '0.65rem', height: '20px' }} 
    />
  );
};

export default StatusBadge;
