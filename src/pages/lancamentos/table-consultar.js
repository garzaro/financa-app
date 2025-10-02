import {useCallback, useMemo, useState} from 'react';
import {Box, Paper, Typography, Button, CircularProgress, Container, Stack, IconButton} from "@mui/material";
import {DataGrid, GridDeleteIcon} from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ptBR } from '@mui/x-data-grid/locales';
import FiltroLancamento from "../../components/filter/selectMenu";
import ServiceLancamento from "../../app/service/lancamentoService";
import {errorConsultarLancamento, mensagemDeErro, mensagemDeSucesso} from "../../components/utils/toastr";
import {useNavigate} from "react-router-dom";
import {LocalStorageService} from "../../app/service/localStorageService";


function ConsultarLancamento() {
  /**filtro**/
  const [ano, setAno] = useState('');
  const [mes, setMes] = useState('');
  const [tipoLancamento, setTipoLancamento] = useState('');
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const usuarioLogado = LocalStorageService();

  const lancamentoService = useMemo(() =>
    ServiceLancamento(), []);

  /**
   * função para realizar a busca de lancamentos usando filtro
   * **/
  const handleBuscar = useCallback( async () => {
    const usuario = usuarioLogado.obterItem( '_usuario_logado' );
    const usuarioID = usuario ? usuario.id : null;
    if ( !usuarioID ) {
      console.log('Sua sessão expirou');
      setError('Faça login');
      return;
    }
    setLoading( true );
    setError( '' );
    try {
      const lancamentoFiltro = await lancamentoService.consultar(
        {
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
      const dadosNormalizados = data.map((lancamento) => ({
        id: lancamento.id,
        descricao: lancamento.descricao ?? '-',
        valor: lancamento.valor ?? 0,
        tipoLancamento: lancamento.tipoLancamento ?? lancamento.tipoLancamento ?? '-',
        mes: lancamento.mes ?? '-',
        ano: lancamento.ano ?? '-',
        statusLancamento: lancamento.statusLancamento ?? '-',
        // lancamento: [],
        usuario: lancamento.usuario,
      }));
      /**
       * Atualiza o estado rows (de useState) com os dados normalizados.
       * Isso re-renderiza a tabela com os novos dados.
       */
      setRows(dadosNormalizados);
      } catch (e) {
      mensagemDeErro('Falha ao buscar lançamentos.')
      /**
       * Limpa a tabela definindo rows como array vazio
       * evita dados antigos em caso de dar algum erro.
       * **/
      setRows([]);
      } finally {
      /**cleanup**/
      setLoading(false);
      }
    }, [ano, mes, tipoLancamento, lancamentoService]);

    /**
     * voltar para home
     * **/
    const handleCancelar = () => {
        setLoading(true);
        setTimeout(() => navigate('/home'), 1000);
    }

    /**
     * função para editar lançamento
     * **/
    const editar = (id) => {
        console.log('Editar o lançamento', id);
    }

    /**
     * função para deletar lançamento pelo id
     * via exclusão otimista - rollback se falhar
     * **/
    const deletar = useCallback(( id ) => {
      /**remover imediatemanente da lista (otimista)**/
      setRows((prevRows) => prevRows.filter((row) => row.id !== id));
      lancamentoService.deletar( id )
        .then((res) => {
          mensagemDeSucesso("Lançamento excluído com sucesso")
      })
        .catch((err) => {
          mensagemDeErro("Erro ao excluir o lançamento");
        });
    }, [ lancamentoService, handleBuscar ]);

    /**
     * objetos de colunas - props f h minW
     * **/
    const columns = useMemo(() => [
      { field: 'descricao', headerName: 'Descrição', flex: 1, minWidth: 180 },

      /** valueFormatter - executada a cada linha - nao memoizada aqui **/
      { field: 'valor', headerName: 'Valor', width: 120, valueFormatter: ( params ) => {
        const vmR = Number( params.valueOf() || 0 );
        return vmR.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        }
      },
      { field: 'tipoLancamento', headerName: 'Tipo', width: 120 },
      { field: 'mes', headerName: 'Mês', width: 120 },
      { field: 'ano', headerName: 'Ano', width: 100 },
      { field: 'statusLancamento', headerName: 'Situação', width: 120 },
      { field: 'actions', headerName: 'Ações', width: 120, sortable: false,
        renderCell: (params) => (
          <>
            <IconButton color="primary" size="small"
              onClick={() => editar(params.row.id) }
            >
              <EditIcon />
            </IconButton>

            <IconButton color="secondary" size="small"
              onClick={() => deletar(params.row.id) }
            >
              <DeleteIcon />
            </IconButton>
          </>
        )
      },
    ], [ editar, deletar ]);

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
            <Typography
              component="h1"
              variant="h5"
              align="center"
              sx={{
                width: '100%'
              }}
            >
              Consultar lançamentos
            </Typography>

            {/**
            filtro
            **/}
            <Box sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 2,
              alignItems: 'center',
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
              />

              {/**
               botões do filtro
               **/}
              <Button
                variant="contained"
                onClick={handleBuscar}
                disabled={loading || !ano || !tipoLancamento}
              >
                {loading ? <CircularProgress size={20} />
                  : 'Buscar'
                }
              </Button>

              <Button
                variant="outlined"
                onClick={handleCancelar}
              >
                {loading ? <CircularProgress size={20} />
                  : 'Cancelar'
                }
              </Button>

            </Box>

            {error && (
              <Typography color="error" sx={{ mt: 1 }}>
                {error}
              </Typography>
            )}
          </Stack>

          <Paper
            elevation={3}
            sx={{
              height: '400',
              width: '100%',
              p: 1,
              mt:2
            }}
          >
            {/**tabela**/}
            <Box sx={{ height: '100%', width: '100%' }}>
              <DataGrid
                rows={rows}
                columns={columns}
                sx={{
                  /**Reduz o tamanho da fonte apenas das células de dados**/
                  '& .MuiDataGrid-cell': {
                    fontSize: '0.7rem',
                  },
                  /**Reduz o tamanho da fonte apenas dos cabeçalhos das colunas**/
                  '& .MuiDataGrid-columnHeaderTitle': {
                    fontSize: '0.7rem',
                  },
                  '& .MuiDataGrid-columnHeader[data-field="valor"].MuiDataGrid-columnHeaderTitleContainer': {
                    justifyContent: 'center',
                  },
                }}
                loading={loading}
                disableRowSelectionOnClick
                pageSizeOptions={[5, 10, 20]}
                initialState={
                { pagination:
                  { paginationModel:
                    { pageSize: 10, page: 0
                    }
                  }
                }}
                localeText={{
                  ...ptBR.components.MuiDataGrid.defaultProps.localeText,
                  loadingOverlayLabel: 'Carregando ...',
                  noRowsLabel: 'Nenhum lançamento encontrado',
                  paginationRowsPerPage: 'Linhas por página:',
                }}
              />
            </Box>
          </Paper>
        </Paper>
      </Container>
    )
  }
export default ConsultarLancamento;