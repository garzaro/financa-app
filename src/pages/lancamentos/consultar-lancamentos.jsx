import React, {useState, useEffect, useMemo, useCallback} from 'react';
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
  Fade, TextField, Modal, TableCell
} from "@mui/material";
import { DataGrid, GridDeleteIcon } from '@mui/x-data-grid';
import { ptBR } from '@mui/x-data-grid/locales';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FiltroLancamento from "../../components/template/selectMenu.jsx";
import ServiceLancamento from "../../app/service/lancamentoService.jsx";
import {LocalStorageService} from "../../app/service/localStorageService.jsx";
import {
  errorConsultarLancamento,
  mensagemDeErro,
  mensagemDeSucesso
} from "../../components/utils/toastr.jsx";
import Slide from "@mui/material/Slide";
import {no} from "zod/locales";

/**
 * todo list
 * [x] Passando paramentros para o formulario atraves da rota
 * [] Funcionalidade para consultar lancamento por descrição
 * [] Funcionalidade para atualizar lancamento
 * [] Funcionalidade para alterar status - PENDANTE EFETIVADO CANCELADO
 * [] Manter os dados do filtro ao retornar (botao Cancelar) do cadastro
 *
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
  const navigate = useNavigate();
  const usuarioLogado = LocalStorageService();

  const lancamentoService = useMemo(() => ServiceLancamento(), []);

  /**
   * função para realizar a busca de lancamentos usando filtro
   * **/
  const handleBuscar = useCallback( async () => {
    const usuario = usuarioLogado.obterItem( '_usuario_logado' );
    const usuarioID = usuario ? usuario.id : null;
    if ( !usuarioID ) {
      console.log('Sua sessão expirou');
      mensagemDeErro('Sua sessão expirou! Faça login');
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
        // lancamentos: [],
        usuario: lancamentos.id,
      }));
      /**
       * Atualiza o estado rows (de useState) com os dados normalizados.
       * Isso re-renderiza a tabela com os novos dados.
       */
      setLancamento(dadosNormalizados);
    } catch (e) {
      mensagemDeErro('Falha ao buscar lançamentos')
      /**
       * Limpa a tabela definindo lancamentos (rows) como array vazio
       * evita dados antigos em caso de dar algum erro.
       * **/
      setLancamento([]);
    } finally {
      /**cleanup**/
      setLoading(false);
    }
  }, [ano, mes, tipoLancamento, lancamentoService]);

  /**
   * voltar para home
   * **/
  const handleCancelar = useCallback(() => {
    setLoading(true);
    setTimeout(() => navigate('/home'), 1000);
  }, [navigate]);

  /**
   * preparar o fomulario para cadastrar lançamento
   * **/
  const handleCandastrarLancamento = useCallback(() => {
    setLoading(true);
    setTimeout(() => navigate('/cadastrar-lancamento'), 1000);
  }, [navigate]);

  /**
   * limpar o filtro - filtro pequeno por enqaunto mas é so pra existir a limpeza
   * **/
  const handleLimparFiltro = useCallback(() => {
    setAno('');
    setMes('');
    setTipoLancamento('');
  })

  /**
   * deletar lançamento pelo id
   * via exclusão otimista - rollback se falhar
   * **/
  const deletarLancamento = useCallback((id) => {
    /**
     * remover imediatemanente da lista (otimista)
     * **/
    setLancamento((prevRows) => prevRows.filter((row) => row.id !== id));
    lancamentoService.deletarLancamento( id )
      .then(() => {
        mensagemDeSucesso("Lançamento excluído com sucesso")
      })
      .catch((err) => {
        mensagemDeErro("Erro ao excluir o lançamento");
      });
  }, [ lancamentoService, lancamento ]);

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
   * editar lançamento EM ANDAMENTO
   * **/
  const handleEditarLancamento = useCallback((id) => {
    console.log('Editar o lançamento de ID', id);
    navigate(`/cadastrar-lancamento/${id}`);
  },[])

   /**
   * objetos de colunas - props fl hr minW
   * **/
  const columns = useMemo(() => [
    { field: 'descricao', headerName: 'Descrição', flex: 1, minWidth: 180 },
    /** valueFormatter - executada a cada linha - nao memoizada aqui **/
    { field: 'valor', headerName: 'Valor', width: 120, valueFormatter: ( params ) => {
        /**valor moeda - Real**/
        const vmR = Number( params.valueOf() || 0 );
        return vmR.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
      }
    },
    { field: 'tipoLancamento', headerName: 'Tipo', width: 120 },
    { field: 'mes', headerName: 'Mês', width: 120 },
    { field: 'ano', headerName: 'Ano', width: 100, },
    { field: 'statusLancamento', headerName: 'Situação', width: 120 },
    { field: 'actions', headerName: 'Ações', width: 120, sortable: false,
      renderCell: ( params ) => ( /**so pra saber que poder ser outro nome aqui**/
        <React.Fragment>
          <IconButton color="primary" size="small"
            onClick={() => handleEditarLancamento(params.row.id) }
          >
            <EditIcon />
          </IconButton>

          <IconButton color="secondary" size="small"
            onClick={() => handleClickOpenDialog(params.row.id) }
          >
            <DeleteIcon />
          </IconButton>
        </React.Fragment>
      )
    },
  ], [ handleClickOpenDialog ]);

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
            <Button variant="contained" onClick={handleBuscar}
              disabled={loading || !ano || !tipoLancamento}
            >
              {loading ? <CircularProgress size={20} /> : 'Buscar' }
            </Button>

            <Button variant="outlined" onClick={handleCancelar} >
              {loading ? <CircularProgress size={20} /> : 'Cancelar' }
            </Button>

            <Button variant="outlined" onClick={handleCandastrarLancamento} >
              {loading ? <CircularProgress size={20} /> : 'Adicionar' }
            </Button>
          </Box>
          {error &&
            <Typography color="error" sx={{ mt: 1 }}>
              { error }
            </Typography>}
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
                  fontSize: '0.7rem',
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
                  `página ${from} até ${to} de ${count !== -1 ? count : `mais de ${to} páginas`}`,
              }}
            />
          </Box>

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
              <Button onClick={handleClickCloseDialog}>Cancelar</Button>
              <Button onClick={handleClickConfirmDelete} color="error">Excluir</Button>
            </DialogActions>
          </Dialog>

        </Paper>
      </Paper>
    </Container>
  )
}
export default ConsultarLancamento;