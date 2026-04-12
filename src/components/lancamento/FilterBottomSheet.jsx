import React from 'react';
import { 
  Drawer, 
  Box, 
  Typography, 
  Button, 
  Stack, 
  IconButton, 
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';

const FilterBottomSheet = ({ 
  open, 
  onClose, 
  ano, 
  mes, 
  tipoLancamento, 
  onAnoChange, 
  onMesChange, 
  onTipoLancamentoChange,
  onBuscar,
  onAdicionar,
  onLimpar,
  onCancelar
}) => {
  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { 
          borderTopLeftRadius: 16, 
          borderTopRightRadius: 16,
          maxHeight: '80vh'
        }
      }}
    >
      <Box sx={{ p: 2 }}>
        {/* Header */}
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <Typography variant="h6">Filtros</Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Stack>
        
        <Divider sx={{ mb: 3 }} />

        {/* Content */}
        <Stack spacing={3}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="filter-ano-label">Ano</InputLabel>
            <Select
              labelId="filter-ano-label"
              id="filter-ano"
              value={ano}
              onChange={onAnoChange}
              label="Ano"
            >
              <MenuItem value=""><em>Todos</em></MenuItem>
              {[...Array(2)].map((_, i) => {
                const anoValue = new Date().getFullYear() - i;
                return <MenuItem key={anoValue} value={anoValue}>{anoValue}</MenuItem>;
              })}
            </Select>
          </FormControl>

          <FormControl fullWidth variant="outlined">
            <InputLabel id="filter-mes-label">Mês</InputLabel>
            <Select
              labelId="filter-mes-label"
              id="filter-mes"
              value={mes}
              onChange={onMesChange}
              label="Mês"
            >
              <MenuItem value=""><em>Todos</em></MenuItem>
              {[...Array(12)].map((_, i) => (
                <MenuItem key={i + 1} value={i + 1}>
                  {new Date(0, i).toLocaleDateString('pt-BR', { month: 'long' })}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth variant="outlined">
            <InputLabel id="filter-tipo-label">Tipo</InputLabel>
            <Select
              labelId="filter-tipo-label"
              id="filter-tipo"
              value={tipoLancamento}
              onChange={onTipoLancamentoChange}
              label="Tipo"
            >
              <MenuItem value=""><em>Todos</em></MenuItem>
              <MenuItem value="RECEITA">Receita</MenuItem>
              <MenuItem value="DESPESA">Despesa</MenuItem>
            </Select>
          </FormControl>
        </Stack>

        {/* Actions */}
        <Stack spacing={1.5} sx={{ mt: 4, mb: 1 }}>
          <Stack direction="row" spacing={1.5}>
            <Button 
              fullWidth 
              variant="contained" 
              color="primary" 
              size="large"
              startIcon={<SearchIcon />}
              onClick={() => { onBuscar(); onClose(); }}
              sx={{ minHeight: 48 }}
            >
              BUSCAR
            </Button>
            <Button 
              fullWidth 
              variant="contained" 
              color="success" 
              size="large"
              startIcon={<AddIcon />}
              onClick={() => { onAdicionar(); onClose(); }}
              sx={{ minHeight: 48 }}
            >
              ADICIONAR
            </Button>
          </Stack>
          
          <Stack direction="row" spacing={1.5}>
            <Button 
              fullWidth 
              variant="outlined" 
              color="secondary" 
              size="large"
              startIcon={<DeleteSweepIcon />}
              onClick={() => { onLimpar(); onClose(); }}
              sx={{ minHeight: 48 }}
            >
              LIMPAR
            </Button>
            <Button 
              fullWidth 
              variant="outlined" 
              color="inherit" 
              size="large"
              startIcon={<CloseIcon />}
              onClick={() => { onCancelar(); onClose(); }}
              sx={{ minHeight: 48 }}
            >
              CANCELAR
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Drawer>
  );
};

export default FilterBottomSheet;
