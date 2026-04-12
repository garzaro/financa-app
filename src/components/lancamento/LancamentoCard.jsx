import React from 'react';
import { Card, CardHeader, CardContent, CardActions, Typography, Grid, Box, IconButton, Tooltip } from '@mui/material';
import SyncIcon from '@mui/icons-material/Sync';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import StatusBadge from './StatusBadge.jsx';
import MonoValueDisplay from './MonoValueDisplay.jsx';

const LancamentoCard = ({ lancamento, onEdit, onDelete, onStatusChange }) => {
  const getMesNome = (mes) => {
    if (!mes) return '-';
    const date = new Date(2000, mes - 1);
    const mesNome = date.toLocaleDateString('pt-BR', { month: 'short' });
    return mesNome.charAt(0).toUpperCase() + mesNome.slice(1);
  };

  return (
    <Card 
      variant="outlined" 
      sx={{ 
        mb: 2, 
        borderRadius: 2, 
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        '&:active': { backgroundColor: 'action.hover' }
      }}
    >
      <Box onClick={() => onEdit(lancamento.id)} sx={{ cursor: 'pointer' }}>
        <CardHeader
          title={
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                {lancamento.descricao} • {lancamento.tipoLancamento}
              </Typography>
              <StatusBadge status={lancamento.statusLancamento} />
            </Box>
          }
          sx={{ pb: 1, pt: 1.5, px: 2 }}
        />
        <CardContent sx={{ pb: 1, pt: 0, px: 2 }}>
          <Grid container spacing={1}>
            <Grid size={6}>
              <Typography variant="caption" color="text.secondary">Data</Typography>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                {getMesNome(lancamento.mes)}/{lancamento.ano}
              </Typography>
            </Grid>
            <Grid size={6}>
              <Typography variant="caption" color="text.secondary">Valor</Typography>
              <MonoValueDisplay value={lancamento.valor} />
            </Grid>
            {/* Additional fields if needed as per 2x2 grid spec */}
          </Grid>
        </CardContent>
      </Box>
      <CardActions sx={{ justifyContent: 'space-between', borderTop: '1px solid', borderColor: 'divider', px: 1, py: 0.5 }}>
        <Box sx={{ display: 'flex' }}>
          <Tooltip title="Status">
            <IconButton 
              size="large" 
              color="primary" 
              onClick={() => onStatusChange(lancamento.id)}
              aria-label="Alternar Status"
              sx={{ minWidth: 44, minHeight: 44 }}
            >
              <SyncIcon fontSize="small" />
              <Typography variant="caption" sx={{ ml: 0.5, fontSize: '0.7rem' }}>Status</Typography>
            </IconButton>
          </Tooltip>
          <Tooltip title="Editar">
            <IconButton 
              size="large" 
              color="primary" 
              onClick={() => onEdit(lancamento.id)}
              aria-label="Editar Lançamento"
              sx={{ minWidth: 44, minHeight: 44, ml: 1 }}
            >
              <EditIcon fontSize="small" />
              <Typography variant="caption" sx={{ ml: 0.5, fontSize: '0.7rem' }}>Editar</Typography>
            </IconButton>
          </Tooltip>
        </Box>
        <Tooltip title="Excluir">
          <IconButton 
            size="large" 
            color="error" 
            onClick={() => onDelete(lancamento.id)}
            aria-label="Excluir"
            sx={{ minWidth: 44, minHeight: 44 }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

export default LancamentoCard;
