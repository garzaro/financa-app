import {useCallback, useMemo, useState} from 'react';
import {Box, Paper, Typography, Button, CircularProgress, Container, Stack, IconButton} from "@mui/material";
import {DataGrid, GridDeleteIcon} from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ptBR } from '@mui/x-data-grid/locales';
import FiltroLancamento from "../../components/filter/selectMenu";
import ServiceLancamento from "../../app/service/lancamentoService";
import {errorConsultarLancamento} from "../../components/utils/toastr";
import {useNavigate} from "react-router-dom";
import {LocalStorageService} from "../../app/service/localStorageService";
import {auto} from "@popperjs/core";



/**
 * Anotações
 *
 * [x] Explicação do useCalback - evita re-renderizacao e memoiza(armzena em cache)
 * somente sera renderizada de novo se as deps forem alteradas
 * [] Explicação do use memo e cmparações
 * [] Explicação do normalized
 * [] Estduo sobr eo datagrid
 * [] Alterar para API no botaõ BUSCAR
 * [] Funcao reset para limpar o filtro (RHF)
 * [] Definir Mensagem de erro do filtro para toatr
 * [] optional chaining - ? response.data?.content || []);
 * [] operador de coalescência nula ??
 * [] UseMemo - armazena em cache
 * [] Filtrar por descricao - ver backend para CONTAINING
 * [] Mostrar mes string - esta mostrando numeral
 * **/

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

    const handleBuscar = useCallback(async () => {
        const usuario = usuarioLogado.obterItem('_usuario_logado');
        const usuarioID = usuario ? usuario.id : null;
        if (!usuarioID) {
            console.log('Sua sessão expirou');
            setError('Faça login');
            return;
        }
        console.log("Verificando as proriedades inseridas no filtro ", ano, mes, tipoLancamento);
        setLoading(true);
        setError('');
        try {
            const lancamentoFiltro = await lancamentoService.consultar(
                {
                    ano,
                    mes,
                    tipoLancamento,
                    usuario: usuario.id});
            // Expectativa - response.data como um array de lançamentos
            const data = Array.isArray(lancamentoFiltro.data) ?
                lancamentoFiltro.data : (lancamentoFiltro.data?.content || [] //optional chaining ?.
                );
            // Normalizar dados para linhas do DataGrid esperado; garantir um campo de id
            const normalized = data.map((lancamento) => ({
                id: lancamento.id,
                descricao: lancamento.descricao ?? '-',
                valor: lancamento.valor ?? 0,
                tipoLancamento: lancamento.tipoLancamento ?? lancamento.tipoLancamento ?? '-',
                mes: lancamento.mes ?? '-',
                ano: lancamento.ano ?? '-',
                statusLancamento: lancamento.statusLancamento ?? '-',
                lancamento: [],
                usuario: lancamento.usuario,
            }));

            // Atualiza o estado rows (de useState) com os dados normalizados. Isso re-renderiza a tabela com os novos dados.
            setRows(normalized);
        } catch (e) {
            console.error("Verificando erro de consulta de lancamentos", e);
            errorConsultarLancamento('Falha ao buscar lançamentos.')
            // Limpa a tabela definindo rows como array vazio, evitando dados antigos em caso de erro.
            setRows([]);
        } finally {
            // Garante cleanup, como parar o loading.
            setLoading(false);
        }
    }, [ano, mes, tipoLancamento, lancamentoService]);

    const handleCancelar = () => {
        setLoading(true);
        setTimeout(() => navigate('/home'), 1000);
    }

    const editar = (id) => {
        console.log('Editar o lançamento', id);
    }

    const deletar = (id) => {
        console.log('Excluir o lançamento', id);
    }

    // const arrayEstatico = [
    //     {id:1, descricao:'salario do mes de setembro de 2025', valor:55550, tipo:'RECEITA', mes: 'janeiro', ano:2025, status:'Efetivado'},
    // ]

    /**objetos de colunas - props f h min**/
    const columns = useMemo(() => [
        { field: 'descricao', headerName: 'Descrição', flex: 1, minWidth: 180 },
        /*valueFormatter - executada a cada linha - nao memoizada aqui*/
        { field: 'valor', headerName: 'Valor', width: 120, valueFormatter: ( params ) => {
                const dinheiro = Number( params.valueOf() || 0 ); /**|| 0**/
                return dinheiro.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            }
        },
        { field: 'tipoLancamento', headerName: 'Tipo', width: 120 },
        { field: 'mes', headerName: 'Mês', width: 120 },
        { field: 'ano', headerName: 'Ano', width: 100 },
        { field: 'statusLancamento', headerName: 'Situação', width: 120 },
        { field: 'actions', headerName: 'Ações', width: 120, sortable: false,
            renderCell: (params) => (
                <>
                    <IconButton
                        color="success"
                        // aria-label={excluir}
                        onClick={() => editar(params.row.id) }
                    >
                        <EditIcon />
                    </IconButton>
                    <IconButton
                        color="error"
                        // aria-label={excluir}
                        onClick={() => deletar(params.row.id) }
                    >
                        <DeleteIcon />
                    </IconButton>
                </>
            )
        },
    ], []);

    return (
        <Container maxWidth="lg" sx={{ mt: 2, mb: 3 }}>
            <Paper
                elevation={3}
                sx={{
                    width: auto,
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
                            width: '100%' }}
                    >
                        Consultar lançamentos
                    </Typography>

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
                    height: auto,
                    width: auto,
                    p: 1,
                    mt:2
                }}
            >
                <Box sx={{ height: '100%', width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        sx={{
                            // Reduz o tamanho da fonte apenas das células de dados
                            '& .MuiDataGrid-cell': {
                                fontSize: '0.7rem',
                            },
                            // Reduz o tamanho da fonte apenas dos cabeçalhos das colunas
                            '& .MuiDataGrid-columnHeaderTitle': {
                                fontSize: '0.7rem',
                            },
                        }}
                        loading={loading}
                        disableRowSelectionOnClick
                        pageSizeOptions={[5, 10, 20]}
                        initialState={
                        { pagination:
                                { paginationModel:
                                        { pageSize: 10, page: 0
                                        } } }}
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