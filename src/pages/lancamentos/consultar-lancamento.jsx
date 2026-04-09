import React, {useState, useEffect, useMemo, useCallback, useRef} from 'react';
import {useLocation, useNavigate, useParams} from "react-router-dom";
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
  Fade, TextField, Modal, TableCell, Tooltip, RadioGroup, FormControlLabel, Radio, Chip,
} from "@mui/material";
import ListAltIcon from '@mui/icons-material/ListAlt';
import { DataGrid, GridDeleteIcon, } from '@mui/x-data-grid';
import { ptBR } from '@mui/x-data-grid/locales';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import SellSharp from '@mui/icons-material/SellSharp';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import FiltroLancamento from "../../components/template/selectMenu.jsx";
import ServiceLancamento from "../../app/service/lancamentoService.js";
import {LocalStorageService} from "../../app/service/localStorageService.js";
import * as messages from "../../components/utils/toastr.jsx";
import Slide from "@mui/material/Slide";
import {useForm} from "react-hook-form";

/**
 * TODO-LIST
 * [] Melhoria no filtro de lancamento evitar rolar para o lado direito pra buscar os icones - ver card
 * **/

function ConsultarLancamento(props) {
  /**filtro**/
  const [ano, setAno] = useState('');
  const [mes, setMes] = useState('');
  const [tipoLancamento, setTipoLancamento] = useState('');
  const [limparFiltro, setLimparFiltro] = useState('');
  const [lancamento, setLancamento] = useState([]); //rows
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [openStatusModal, setOpenStatusModal] = useState(false);
  const usuarioLogado = LocalStorageService();
  const { reset } = useForm();

  const navigate = useNavigate();
  /** para distinguir a saída **/
  const location = useLocation();
  /**Ref para rastrear se saiu para editar (única exceção permitida)**/
  const saiuParaEdicaoRef = useRef(false);

  const lancamentoService = useMemo(() => ServiceLancamento(), []);

  // SPEC-02 — useEffect de montagem: restaurar estado
  useEffect(() => {
    const filtroSalvo = usuarioLogado.obterItem('_filtros_consulta');
    const resultadosSalvos = usuarioLogado.obterItem('_resultados_consulta');

    if ( filtroSalvo ) {
      setAno(filtroSalvo.ano || '');
      setMes(filtroSalvo.mes || '');
      setTipoLancamento(filtroSalvo.tipoLancamento || '');
    }
    if ( resultadosSalvos ) {
      setLancamento(resultadosSalvos);
    }
  }, []); // executa só na montagem

  /**
   * realizar a busca de lancamentos usando filtro
   * **/
  const handleBuscar = useCallback( async () => {
    const usuario = usuarioLogado.obterItem( '_usuario_logado' );
    const usuarioID = usuario ? usuario.id : null;
    if ( !usuarioID ) {
      console.log('Sua sessão expirou');
      /**ver depois sessao expirada**/
      messages.mensagemDeErro('Sua sessão expirou! Faça login');
      return;
    }
    setLoading( true );
    setError( '' );
    try {
      const lancamentoFiltro = await lancamentoService.consultarLancamento({
        ano,
        mes,
        tipoLancamento,
        usuario: usuario.id
      });
      /**Expectativa - response.data como um array de lançamentos**/
      const data = Array.isArray( lancamentoFiltro.data ) ?
        /**optional chaining ?.**/
        lancamentoFiltro.data : ( lancamentoFiltro.data?.content || [] );
      /**Normalizar dados para linhas do DataGrid esperado; garantir um campo de id**/
      const dadosNormalizados = data.map((lancamentos) => ({
        id: lancamentos.id,
        descricao: lancamentos.descricao ?? '-',
        valor: lancamentos.valor ?? 0,
        tipoLancamento: lancamentos.tipoLancamento ?? '-', //lancamentos.tipoLancamento ??
        mes: lancamentos.mes ?? '-',
        ano: lancamentos.ano ?? '-',
        statusLancamento: lancamentos.statusLancamento ?? '-',
        lancamentos: [],
        usuario: lancamentos.id,
      }));
      /**
       * Atualiza o estado rows (de useState) com os dados normalizados.
       * Isso re-renderiza a tabela com os novos dados.
       */
      setLancamento(dadosNormalizados);

      // SPEC-04 — handleBuscar: persistir após busca bem-sucedida
      usuarioLogado.salvarItem('_filtros_consulta', { ano, mes, tipoLancamento });
      usuarioLogado.salvarItem('_resultados_consulta', dadosNormalizados);

    } catch (e) {
      messages.mensagemDeErro('Falha ao buscar lançamentos')
      /**
       * Limpa a tabela definindo lancamentos (rows) como array vazio
       * evita dados antigos em caso de dar algum erro.
       * **/
      setLancamento([]);
      usuarioLogado.removerItem('_resultados_consulta');
    } finally {
      /**cleanup**/
      setLoading(false);
    }
  }, [ano, mes, tipoLancamento, lancamentoService, usuarioLogado]);

  /**disparar no botao**/
  const handleAlterarStatusLancamento = useCallback((id) => {
    setSelectedId(id);
    setOpenStatusModal(true);
  }, []);

  const handleAlterarStatusAtual = useCallback(async (statusLancamento) => {
    if ( !selectedId ) return ;
    const copyBefore = [...lancamento];
    /** atualização otimista - muda a interface antes de ir ao banco**/
    setLancamento((currentRows) =>
      currentRows.map((row) => row.id === selectedId ? { ...row, statusLancamento } : row));
    setOpenStatusModal(false);
    /**envia ao banco em silencio**/
    await lancamentoService.alterarStatus(selectedId, statusLancamento)
      .then(() => {
        messages.mensagemDeSucesso("Status atualizado com sucesso");
      })
      .catch(error => {
        setLancamento(copyBefore);
        console.error('Erro ao alterar status:', error);
        const errorMessage = error.response?.data?.message ||
          'Erro ao atualizar status. Tente novamente.';
        messages.mensagemDeErro(errorMessage);
      }
    );
  }, [selectedId, lancamento]);

  const handleCancelar = useCallback(() => {
    // SPEC-07 — handleCancelar e handleCandastrarLancamento: caminhos de limpeza
    saiuParaEdicaoRef.current = false;
    setLoading(true);
    setTimeout(() => navigate('/home'), 1000);
  }, [navigate]);

  /**
   * preparar o fomulario para cadastrar lançamento
   * **/
  const handleCandastrarLancamento = useCallback(() => {
    // SPEC-07 — handleCancelar e handleCandastrarLancamento: caminhos de limpeza
    saiuParaEdicaoRef.current = false; // não é edicao, limpa o filtro ao sair da tela
    setLoading(true);
    reset();
    setTimeout(() => navigate('/cadastrar-lancamento'), 1000);
  }, [navigate, reset]);

  /**
   * limpar o filtro - filtro pequeno por enqaunto mas é so pra existir a limpeza
   * **/
  const handleLimparFiltro = useCallback(() => {
    setAno('');
    setMes('');
    setTipoLancamento('');
    usuarioLogado.removerItem('_filtros_consulta');
    usuarioLogado.removerItem('_resultados_consulta');
    setLancamento([]);
  }, [usuarioLogado]);

  /**
   * SPEC-05 — useEffect de sincronização pós-alteração de lista
   */
  useEffect(() => {
    if (lancamento.length > 0) {
      usuarioLogado.salvarItem('_resultados_consulta', lancamento);
    }
  }, [lancamento]);

  /**
   * SPEC-03 — useEffect de desmontagem: cleanup (fonte de verdade)
   * **/
  useEffect(() => {
    return () => {
      if (!saiuParaEdicaoRef.current){
        usuarioLogado.removerItem('_filtros_consulta');
        usuarioLogado.removerItem('_resultados_consulta');
      }
      saiuParaEdicaoRef.current = false; // reset para o próximo ciclo
    }
  }, []) // [] garante que o cleanup só roda na desmontagem real

  /**
   * SPEC-08 — Correção de dependências: deletarLancamento
   * **/
  const deletarLancamento = useCallback((id) => {
    setLancamento((prevRows) => prevRows.filter((row) => row.id !== id));
    lancamentoService.deletarLancamento( id )
      .then(() => {
        messages.mensagemDeSucesso("Lançamento excluído com sucesso")
      })
      .catch((err) => {
        messages.mensagemDeErro("Erro ao excluir o lançamento");
      });
  }, [ lancamentoService ]);

  /**
   * abrir confirmação (Dialog) com id selecionado
   * **/
  const handleClickOpenDialog = useCallback(( id ) => {
    setSelectedId( id )
    setShowConfirmDialog(true);
  }, []);

  /**
   * cancelar confirmação (Dialog) e limpar id selecionado - null
   * **/
  const handleClickCloseDialog = useCallback(() => {
    setShowConfirmDialog(false);
    setSelectedId(null);
  }, []);

  /**
   * confirmar a deleção e limpar o id selecionado
   * **/
  const handleClickConfirmDelete = useCallback(() => {
    deletarLancamento(selectedId);
    handleClickCloseDialog();
  }, [deletarLancamento, selectedId, handleClickCloseDialog]);

  /**
   * SPEC-06 — handleEditarLancamento: única exceção
   * **/
  const handleEditarLancamento = useCallback((id) => {
    /**marca como exceção**/
    saiuParaEdicaoRef.current = true;
    navigate(`/cadastrar-lancamento/${id}`);
  },[navigate])

  const moneyFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });

   /**
   * objetos de colunas - props fl hr minW
   * **/
  const columns = useMemo(() => [
    { field: 'descricao', headerName: 'Descrição', flex: 1, minWidth: 180 },
    /** valueFormatter - executada a cada linha - nao memoizada aqui **/
    { field: 'valor', headerName: 'Valor', width: 120, valueFormatter: ( params ) => {
        /**valor moeda - Real**/
        const vmR = Number( params.valueOf() || 0 ); {/*valueOf()*/}
        return moneyFormatter.format(vmR);
      }
    },
    { field: 'tipoLancamento', headerName: 'Tipo', width: 120 },
    { field: 'mes', headerName: 'Mês', width: 120,
      valueFormatter: (value) => {
        if (!value) return '-';
        const date = new Date(2000, value - 1);
        const mesNome = date.toLocaleDateString('pt-BR', { month: 'long' });
        return mesNome.charAt(0).toUpperCase() + mesNome.slice(1);
      }
    },
    { field: 'ano', headerName: 'Ano', width: 100, },
    { field: 'statusLancamento', headerName: 'Situação', width: 120,
      renderCell: (params) => {
        let color = 'default';
        if (params.value === 'EFETIVADO') color = 'success';
        else if (params.value === 'CANCELADO') color = 'error';
        else if (params.value === 'PENDENTE') color = 'warning';
        return <Chip label={params.value} color={color} size="small" variant="outlined" />;
      }
    },
    { field: 'actions', headerName: 'Ações', width: 130, disableColumnResize: true, minWidth: 130,
      maxWidth: 150, sortable: false,
      renderCell: ( params ) => ( /**so pra saber que poder ser outro nome aqui**/
        <React.Fragment>
          <Tooltip title="Editar">
            <IconButton color="primary" size="small"
              onClick={() => handleEditarLancamento(params.row.id) }
            >
              <EditIcon />
            </IconButton>

          </Tooltip>

          {/*ReceiptIcon ListAltIcon SellSharp*/}
          <Tooltip title="Alterar situação">
            <IconButton color="info" size="small"
              onClick={() => handleAlterarStatusLancamento(params.row.id) }
            >
              <ListAltIcon fontSize="small"/>
            </IconButton>

          </Tooltip>


          <Tooltip title="Deletar">
            <IconButton color="secondary" size="small"
              onClick={() => handleClickOpenDialog(params.row.id) }
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </React.Fragment>
      )
    },
  ], [ handleEditarLancamento, handleAlterarStatusLancamento, handleClickOpenDialog ]);

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
          {/**
           filtro
           **/}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center',
            justifyContent: 'center',
            width: '100%' }}
          >
            <FiltroLancamento
              ano={ano}
              mes={mes}
              tipoLancamento={tipoLancamento}
              onAnoChange={(e) => setAno(e.target.value)}
              onMesChange={(e) => setMes(e.target.value)}
              onTipoLancamentoChange={(e) => setTipoLancamento(e.target.value)}
              onLimparChange={(e) => setLimparFiltro(e.target.value)}
            />
            {/**
             botões do filtro
             **/}
            <Button variant="contained" size={"small"} onClick={handleBuscar}
              disabled={loading || !ano || !tipoLancamento}
              startIcon={!loading && <SearchIcon size="small" />}
            >
              {loading ? <CircularProgress size={20} /> : 'Buscar' }
            </Button>

            <Button variant="outlined" size={"small"} onClick={handleCancelar}
              startIcon={!loading && <CloseIcon size="small" />}
            >
              {loading ? <CircularProgress size={20} /> : 'Cancelar' }
            </Button>

            <Button variant="outlined" size={"small"} onClick={handleLimparFiltro}
              startIcon={!loading && <CleaningServicesIcon size="small" />}
            >
              Limpar
            </Button>

            <Button variant="outlined" size={"small"} onClick={handleCandastrarLancamento}
            startIcon={!loading && <AddIcon size="small" />}
            >
              {loading ? <CircularProgress size={20} /> : 'Adicionar' }
            </Button>

          </Box>
          {error &&
            <Typography color="error" sx={{ mt: 1 }}>
              { error }
            </Typography>
          }
        </Stack>

        <Paper
          elevation={3} sx={{ height: '400', width: '100%', p: 1, mt:2 }} >
          {/**tabela**/}
          <Box sx={{ height: '100%', width: '100%'}}>
            <DataGrid
              rows={lancamento} //rows={rows}
              columns={columns}
              sx={{
                /**Reduz o tamanho da fonte apenas das células de dados**/
                '& .MuiDataGrid-cell': {
                  fontSize: '0.9rem',
                },
                /**Reduz o tamanho da fonte apenas dos cabeçalhos das colunas**/
                '& .MuiDataGrid-columnHeaderTitle': {
                  fontSize: '1.2rem',
                },
                '& .MuiDataGrid-columnHeader[data-field="valor"].MuiDataGrid-columnHeaderTitleContainer': {
                  justifyContent: 'center',
                },
              }}
              loading={loading}
              disableRowSelectionOnClick
              pageSizeOptions={[5, 10, 15, 20, 25]}
              initialState={
                { pagination:
                    { paginationModel: { pageSize: 5, page: 0 } }
                }}
              localeText={{
                ...ptBR.components.MuiDataGrid.defaultProps.localeText,
                loadingOverlayLabel: 'Carregando ...',
                noRowsLabel: 'Nenhum lançamento encontrado',
                paginationRowsPerPage: 'Linhas por página:',
                paginationDisplayedRows: ({ from, to, count }) =>
                  `página ${from} - ${to} de ${count !== -1 ? count : `mais de ${to} páginas`}`,
              }}
            />
          </Box>

          {/** alteração de status **/}
          <Dialog open={openStatusModal} onClose={() => !loading && setOpenStatusModal(false)}>
            <DialogTitle>Alterar Situação</DialogTitle>

            <DialogContent dividers>
              {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                  <CircularProgress size={24} />
                  <Typography sx={{ ml: 2 }}>Atualizando...</Typography>
                </Box>
              ) : (
                <RadioGroup
                  onChange={(e) => handleAlterarStatusAtual(e.target.value)}
                >
                  <FormControlLabel value="EFETIVADO" control={<Radio color="success" />} label="Efetivado" />
                  <FormControlLabel value="CANCELADO" control={<Radio color="error" />} label="Cancelado" />
                  <FormControlLabel value="PENDENTE" control={<Radio color="warning" />} label="Pendente" />
                </RadioGroup>
              )}
            </DialogContent>

            <DialogActions>
              <Button
                onClick={() => setOpenStatusModal(false)}
                disabled={loading}
              >
                Cancelar
              </Button>
            </DialogActions>
          </Dialog>

          {/** confirmacao de exclusão **/}
          <Dialog
            open={showConfirmDialog}
            aria-labelledby="dialog-title"
            aria-describedby="dialog-description"
          >
            <DialogTitle id="dialog-title">Excluir Lançamento</DialogTitle>
            <DialogContent>
              <DialogContentText id="dialog-description">
                Deseja mesmo excluir este lançamento? Esta ação não poderá ser revertidas
              </DialogContentText>
            </DialogContent>
            <DialogActions>

              <Button
                onClick={handleClickCloseDialog}
              >
                Cancelar
              </Button>

              <Button
                onClick={handleClickConfirmDelete}
                color="error"
              >
                Excluir
              </Button>
            </DialogActions>
          </Dialog>

        </Paper>
      </Paper>
    </Container>
  )
}
export default ConsultarLancamento;