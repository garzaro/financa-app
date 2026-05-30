import React, { useState, useMemo, useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  Stack,
  Typography,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  IconButton,
  Tooltip,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import ListAltIcon from '@mui/icons-material/ListAlt';
import { DataGrid } from '@mui/x-data-grid';
import { ptBR } from '@mui/x-data-grid/locales';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import FiltroLancamento from "../../components/template/selectMenu.jsx";
import { useLancamentos } from '../../hooks/lancamentos/useLancamentos';

function ConsultarLancamento() {
  const {
    lancamentos,
    loading,
    filtros,
    setFiltros,
    buscar,
    deletar,
    alterarStatus,
    limparFiltros
  } = useLancamentos();

  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [openStatusModal, setOpenStatusModal] = useState(false);
  const navigate = useNavigate();

  const handleBuscar = useCallback(() => {
    buscar();
  }, [buscar]);

  const handleAlterarStatusLancamento = useCallback((id) => {
    setSelectedId(id);
    setOpenStatusModal(true);
  }, []);

  const handleAlterarStatusAtual = useCallback(async (status) => {
    if (!selectedId) return;
    setOpenStatusModal(false);
    await alterarStatus(selectedId, status);
  }, [selectedId, alterarStatus]);

  const handleCancelar = useCallback(() => {
    navigate('/home');
  }, [navigate]);

  const handleCadastrarLancamento = useCallback(() => {
    navigate('/cadastrar-lancamento');
  }, [navigate]);

  const handleEditarLancamento = useCallback((id) => {
    navigate(`/cadastrar-lancamento/${id}`);
  }, [navigate]);

  const handleClickOpenDialog = useCallback((id) => {
    setSelectedId(id);
    setShowConfirmDialog(true);
  }, []);

  const handleClickCloseDialog = useCallback(() => {
    setShowConfirmDialog(false);
    setSelectedId(null);
  }, []);

  const handleClickConfirmDelete = useCallback(() => {
    deletar(selectedId);
    handleClickCloseDialog();
  }, [deletar, selectedId, handleClickCloseDialog]);

  const moneyFormatter = useMemo(() => new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }), []);

  const getStatusColorClass = (status) => {
    switch (status) {
      case 'EFETIVADO': return 'text-green-600 font-bold';
      case 'CANCELADO': return 'text-red-600 font-bold';
      case 'PENDENTE': return 'text-blue-600 font-bold';
      default: return '';
    }
  };

  const columns = useMemo(() => [
    { field: 'descricao', headerName: 'Descrição', flex: 1, minWidth: 180 },
    {
      field: 'valor',
      headerName: 'Valor',
      width: 120,
      valueFormatter: (params) => {
        const value = Number(params || 0);
        return moneyFormatter.format(value);
      }
    },
    { field: 'tipoLancamento', headerName: 'Tipo', width: 120 },
    { field: 'mes', headerName: 'Mês', width: 100 },
    { field: 'ano', headerName: 'Ano', width: 100 },
    {
      field: 'statusLancamento',
      headerName: 'Situação',
      width: 130,
      renderCell: (params) => (
        <span className={getStatusColorClass(params.value)}>
          {params.value}
        </span>
      )
    },
    {
      field: 'actions',
      headerName: 'Ações',
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <React.Fragment>
          <Tooltip title="Editar">
            <IconButton color="primary" size="small" onClick={() => handleEditarLancamento(params.row.id)}>
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Alterar situação">
            <IconButton color="info" size="small" onClick={() => handleAlterarStatusLancamento(params.row.id)}>
              <ListAltIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Deletar">
            <IconButton color="secondary" size="small" onClick={() => handleClickOpenDialog(params.row.id)}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </React.Fragment>
      )
    },
  ], [handleEditarLancamento, handleAlterarStatusLancamento, handleClickOpenDialog, moneyFormatter]);

  return (
    <Container maxWidth="lg" sx={{ mt: 0.5, mb: 3 }}>
      <Paper
        elevation={3}
        sx={{
          width: '100%',
          border: '1px solid',
          borderColor: 'rgba(78,77,77,0.89)',
          borderRadius: '0.3rem',
          padding: '1rem',
          boxShadow: 2,
          mb: 2,
        }}
      >
        <Stack spacing={2} alignItems="center">
          <Typography component="h1" variant="h5" align="center" sx={{ width: '100%' }}>
            Consultar lançamentos
          </Typography>

          <Box sx={{
            display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center',
            justifyContent: 'center', width: '100%'
          }}>
            <FiltroLancamento
              ano={filtros.ano}
              mes={filtros.mes}
              tipoLancamento={filtros.tipoLancamento}
              onAnoChange={(e) => setFiltros({ ...filtros, ano: e.target.value })}
              onMesChange={(e) => setFiltros({ ...filtros, mes: e.target.value })}
              onTipoLancamentoChange={(e) => setFiltros({ ...filtros, tipoLancamento: e.target.value })}
            />

            <Button variant="contained" size="small" onClick={handleBuscar}
              disabled={loading || !filtros.ano || !filtros.tipoLancamento}
              startIcon={!loading && <SearchIcon fontSize="small" />}
            >
              {loading ? <CircularProgress size={20} /> : 'Buscar'}
            </Button>

            <Button variant="outlined" size="small" onClick={handleCancelar}
              startIcon={<CloseIcon fontSize="small" />}
            >
              Cancelar
            </Button>

            <Button variant="outlined" size="small" onClick={limparFiltros}
              startIcon={<CleaningServicesIcon fontSize="small" />}
            >
              Limpar
            </Button>

            <Button variant="outlined" size="small" onClick={handleCadastrarLancamento}
              startIcon={<AddIcon fontSize="small" />}
            >
              Adicionar
            </Button>
          </Box>
        </Stack>

        <Paper elevation={3} sx={{ height: 400, width: '100%', p: 1, mt: 2 }}>
          <Box sx={{ height: '100%', width: '100%' }}>
            <DataGrid
              rows={lancamentos}
              columns={columns}
              sx={{
                '& .MuiDataGrid-cell': { fontSize: '0.75rem' },
                '& .MuiDataGrid-columnHeaderTitle': { fontSize: '1rem', fontWeight: 'bold' },
              }}
              loading={loading}
              disableRowSelectionOnClick
              pageSizeOptions={[5, 10, 25]}
              initialState={{
                pagination: { paginationModel: { pageSize: 5, page: 0 } }
              }}
              localeText={{
                ...ptBR.components.MuiDataGrid.defaultProps.localeText,
                noRowsLabel: 'Nenhum lançamento encontrado',
              }}
            />
          </Box>

          <Dialog open={openStatusModal} onClose={() => setOpenStatusModal(false)}>
            <DialogTitle>Alterar Situação</DialogTitle>
            <DialogContent dividers>
              <RadioGroup onChange={(e) => handleAlterarStatusAtual(e.target.value)}>
                <FormControlLabel value="EFETIVADO" control={<Radio color="success" />} label="Efetivado" />
                <FormControlLabel value="CANCELADO" control={<Radio color="error" />} label="Cancelado" />
                <FormControlLabel value="PENDENTE" control={<Radio />} label="Pendente" />
              </RadioGroup>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenStatusModal(false)}>Cancelar</Button>
            </DialogActions>
          </Dialog>

          <Dialog open={showConfirmDialog} onClose={handleClickCloseDialog}>
            <DialogTitle>Excluir Lançamento</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Deseja mesmo excluir este lançamento? Esta ação não poderá ser revertida.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClickCloseDialog}>Cancelar</Button>
              <Button onClick={handleClickConfirmDelete} color="error">Excluir</Button>
            </DialogActions>
          </Dialog>
        </Paper>
      </Paper>
    </Container>
  );
}

export default ConsultarLancamento;
