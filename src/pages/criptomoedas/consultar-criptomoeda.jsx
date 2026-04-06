import { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Stack,
  Typography,
  TextField,
  MenuItem,
  Button,
} from '@mui/material';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import { DataGrid } from '@mui/x-data-grid';
import { ptBR } from '@mui/x-data-grid/locales';
import { useAuth } from '@/auth/useAuth.js';
import ServiceCriptomoeda from '@/app/service/criptomoedaService.js';
import { CORRETORAS, MESES_NOME } from '@/components/criptomoedas/corretoras.js';
import { mensagemDeErro } from '@/components/utils/toastr.jsx';

const chaveFiltrosCripto = (usuarioId) => `_filtros_consulta_criptomoedas_${usuarioId}`;

function lerFiltrosSalvos(usuarioId) {
  if (!usuarioId) return null;
  try {
    const raw = sessionStorage.getItem(chaveFiltrosCripto(usuarioId));
    if (!raw) return null;
    const p = JSON.parse(raw);
    return {
      filtroAno: typeof p.filtroAno === 'string' ? p.filtroAno : '',
      filtroMes: typeof p.filtroMes === 'string' ? p.filtroMes : '',
      filtroCorretora: typeof p.filtroCorretora === 'string' ? p.filtroCorretora : '',
      filtroMoeda: typeof p.filtroMoeda === 'string' ? p.filtroMoeda : '',
    };
  } catch {
    return null;
  }
}

function salvarFiltros(usuarioId, filtros) {
  if (!usuarioId) return;
  try {
    sessionStorage.setItem(chaveFiltrosCripto(usuarioId), JSON.stringify(filtros));
  } catch {
    /* ignore quota / private mode */
  }
}

function removerFiltrosSalvos(usuarioId) {
  if (!usuarioId) return;
  try {
    sessionStorage.removeItem(chaveFiltrosCripto(usuarioId));
  } catch {
    /* ignore */
  }
}

function extrairLista(responseData) {
  if (!responseData) return [];
  if (Array.isArray(responseData)) return responseData;
  if (Array.isArray(responseData.content)) return responseData.content;
  return [];
}

function rotuloMoeda(item) {
  return (
    item.moeda ??
    item.nome ??
    item.nomeCriptomoeda ??
    item.simbolo ??
    item.symbol ??
    item.codigo ??
    '—'
  );
}

function formatarNumero(val) {
  if (val === undefined || val === null || val === '') return '—';
  const n = Number(val);
  if (Number.isNaN(n)) return String(val);
  return n.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 8 });
}

function formatarData(iso) {
  if (!iso) return '—';
  const s = String(iso);
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(s);
  if (m) return `${m[3]}/${m[2]}/${m[1]}`;
  return s;
}

function labelCorretora(valor) {
  if (!valor) return '—';
  const op = CORRETORAS.find((c) => c.value === valor);
  return op ? op.label : valor;
}

function nomeMes(n) {
  if (n === undefined || n === null || n === '') return '—';
  const op = MESES_NOME.find((m) => m.value === Number(n));
  return op ? op.label : String(n);
}

/** Ano e mês (1–12) a partir da API: prioriza dataEntrada; fallback no campo mes + ano atual só se necessário */
function extrairAnoMes(row) {
  const iso = row.dataEntrada;
  if (iso) {
    const m = String(iso).match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (m) {
      return { ano: Number(m[1]), mes: Number(m[2]) };
    }
  }
  const mesBackend = row.mes != null && row.mes !== '' ? Number(row.mes) : null;
  return { ano: null, mes: mesBackend };
}

function montarLinha(row, index) {
  const { ano, mes } = extrairAnoMes(row);
  const moeda = rotuloMoeda(row);
  return {
    id: row.id != null ? String(row.id) : `cripto-${index}`,
    dataEntrada: formatarData(row.dataEntrada),
    mes: nomeMes(row.mes ?? mes),
    corretora: labelCorretora(row.corretora),
    moeda,
    valorAtual: formatarNumero(row.valorAtualMoeda ?? row.precoUnitario ?? row.valorUnitario),
    investido: formatarNumero(row.valorInvestido),
    quantidade: formatarNumero(row.quantidade ?? row.quantidadeMoeda),
    _ano: ano,
    _mes: mes,
    _corretora: row.corretora ?? '',
    _moeda: moeda,
  };
}

/**
 * Consulta criptomoedas — o DataGrid é renderizado apenas aqui.
 */
export default function ConsultarCriptomoeda() {
  const { isAuthenticated, loggedUser } = useAuth();
  const servico = useMemo(() => ServiceCriptomoeda(), []);
  const [dados, setDados] = useState([]);
  const [carregando, setCarregando] = useState(false);

  const [filtroAno, setFiltroAno] = useState('');
  const [filtroMes, setFiltroMes] = useState('');
  const [filtroCorretora, setFiltroCorretora] = useState('');
  const [filtroMoeda, setFiltroMoeda] = useState('');
  const [filtrosHidratados, setFiltrosHidratados] = useState(false);

  const mesHabilitado = Boolean(filtroAno);
  const moedaHabilitado = Boolean(filtroAno && filtroMes);

  /** Restaura filtros ao voltar de outra rota (ex.: cadastro) na mesma sessão do navegador */
  useEffect(() => {
    if (!loggedUser?.id) {
      setFiltrosHidratados(false);
      return;
    }
    const salvos = lerFiltrosSalvos(loggedUser.id);
    if (salvos) {
      setFiltroAno(salvos.filtroAno);
      setFiltroMes(salvos.filtroMes);
      setFiltroCorretora(salvos.filtroCorretora);
      setFiltroMoeda(salvos.filtroMoeda);
    }
    setFiltrosHidratados(true);
  }, [loggedUser?.id]);

  /** Persiste filtros a cada alteração (mantém até nova aba/fechar aba ou Limpar) */
  useEffect(() => {
    if (!filtrosHidratados || !loggedUser?.id) return;
    salvarFiltros(loggedUser.id, {
      filtroAno,
      filtroMes,
      filtroCorretora,
      filtroMoeda,
    });
  }, [filtroAno, filtroMes, filtroCorretora, filtroMoeda, filtrosHidratados, loggedUser?.id]);

  useEffect(() => {
    if (!filtroAno) {
      setFiltroMes('');
      setFiltroMoeda('');
    }
  }, [filtroAno]);

  useEffect(() => {
    if (!filtroMes) {
      setFiltroMoeda('');
    }
  }, [filtroMes]);

  useEffect(() => {
    if (!isAuthenticated || !loggedUser?.id) {
      setDados([]);
      return;
    }

    let ativo = true;
    setCarregando(true);

    servico
      .listarPorUsuario(loggedUser.id)
      .then((res) => {
        if (!ativo) return;
        const lista = extrairLista(res.data);
        setDados(lista.map((row, index) => montarLinha(row, index)));
      })
      .catch(() => {
        if (!ativo) return;
        mensagemDeErro('Não foi possível carregar suas criptomoedas.');
        setDados([]);
      })
      .finally(() => {
        if (ativo) setCarregando(false);
      });

    return () => {
      ativo = false;
    };
  }, [isAuthenticated, loggedUser?.id, servico]);

  const anosDisponiveis = useMemo(() => {
    const s = new Set();
    dados.forEach((r) => {
      if (r._ano != null) s.add(r._ano);
    });
    return [...s].sort((a, b) => b - a);
  }, [dados]);

  const mesesNoAno = useMemo(() => {
    if (!filtroAno) return [];
    const y = Number(filtroAno);
    const s = new Set();
    dados.forEach((r) => {
      if (r._ano === y && r._mes != null) s.add(r._mes);
    });
    return [...s].sort((a, b) => a - b);
  }, [dados, filtroAno]);

  /** Moedas distintas nos registros do ano+mês escolhidos (para o select de moeda) */
  const moedasNoPeriodo = useMemo(() => {
    if (!filtroAno || !filtroMes) return [];
    const y = Number(filtroAno);
    const m = Number(filtroMes);
    const s = new Set();
    dados.forEach((r) => {
      if (r._ano === y && r._mes === m) s.add(r._moeda);
    });
    return [...s].sort((a, b) => a.localeCompare(b, 'pt-BR'));
  }, [dados, filtroAno, filtroMes]);

  useEffect(() => {
    if (carregando || !filtroMoeda) return;
    if (moedasNoPeriodo.length === 0 || !moedasNoPeriodo.includes(filtroMoeda)) {
      setFiltroMoeda('');
    }
  }, [moedasNoPeriodo, filtroMoeda, carregando]);

  const corretorasPresentes = useMemo(() => {
    const s = new Set();
    dados.forEach((r) => {
      if (r._corretora) s.add(r._corretora);
    });
    return CORRETORAS.filter((c) => s.has(c.value));
  }, [dados]);

  const linhasFiltradas = useMemo(() => {
    return dados.filter((r) => {
      if (filtroCorretora && r._corretora !== filtroCorretora) return false;

      if (filtroAno) {
        if (r._ano == null || r._ano !== Number(filtroAno)) return false;
      }

      if (filtroMes) {
        if (r._mes == null || r._mes !== Number(filtroMes)) return false;
      }

      if (moedaHabilitado && filtroMoeda) {
        if (r._moeda !== filtroMoeda) return false;
      }

      return true;
    });
  }, [dados, filtroAno, filtroMes, filtroCorretora, filtroMoeda, moedaHabilitado]);

  const colunas = useMemo(
    () => [
      { field: 'dataEntrada', headerName: 'Entrada', width: 110 },
      { field: 'mes', headerName: 'Mês', flex: 1, minWidth: 100 },
      { field: 'corretora', headerName: 'Corretora', flex: 1, minWidth: 130 },
      { field: 'moeda', headerName: 'Moeda', width: 90 },
      { field: 'valorAtual', headerName: 'Valor atual', width: 130 },
      { field: 'investido', headerName: 'Investido', width: 120 },
      { field: 'quantidade', headerName: 'Qtd.', width: 100 },
    ],
    []
  );

  const limparFiltros = () => {
    setFiltroAno('');
    setFiltroMes('');
    setFiltroCorretora('');
    setFiltroMoeda('');
    if (loggedUser?.id) removerFiltrosSalvos(loggedUser.id);
  };

  if (!isAuthenticated) {
    return null;
  }

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
        }}
      >
        <Stack spacing={2}>
          <Typography component="h1" variant="h5" align="center" sx={{ width: '100%', color: 'grey.100' }}>
            Consultar criptomoedas
          </Typography>

          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 2,
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
            }}
          >
            <TextField
              select
              size="small"
              label="Ano"
              value={filtroAno}
              onChange={(e) => setFiltroAno(e.target.value)}
              sx={{ minWidth: 120, '& .MuiOutlinedInput-root': { color: 'grey.200' } }}
              slotProps={{ inputLabel: { shrink: true } }}
            >
              <MenuItem value="">
                <em>Todos</em>
              </MenuItem>
              {anosDisponiveis.map((a) => (
                <MenuItem key={a} value={String(a)}>
                  {a}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              size="small"
              label="Mês"
              value={filtroMes}
              disabled={!mesHabilitado}
              onChange={(e) => setFiltroMes(e.target.value)}
              sx={{ minWidth: 160, '& .MuiOutlinedInput-root': { color: 'grey.200' } }}
              slotProps={{ inputLabel: { shrink: true } }}
              helperText={!mesHabilitado ? 'Selecione o ano primeiro' : undefined}
            >
              <MenuItem value="">
                <em>Todos</em>
              </MenuItem>
              {mesesNoAno.map((mv) => {
                const op = MESES_NOME.find((x) => x.value === mv);
                return (
                  <MenuItem key={mv} value={String(mv)}>
                    {op ? op.label : mv}
                  </MenuItem>
                );
              })}
            </TextField>

            <TextField
              select
              size="small"
              label="Corretora"
              value={filtroCorretora}
              onChange={(e) => setFiltroCorretora(e.target.value)}
              sx={{ minWidth: 200, '& .MuiOutlinedInput-root': { color: 'grey.200' } }}
              slotProps={{ inputLabel: { shrink: true } }}
            >
              <MenuItem value="">
                <em>Todas</em>
              </MenuItem>
              {corretorasPresentes.map((c) => (
                <MenuItem key={c.value} value={c.value}>
                  {c.label}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              size="small"
              label="Moeda"
              value={moedaHabilitado ? filtroMoeda : ''}
              disabled={!moedaHabilitado}
              onChange={(e) => setFiltroMoeda(e.target.value)}
              sx={{ minWidth: 140, '& .MuiOutlinedInput-root': { color: 'grey.200' } }}
              slotProps={{ inputLabel: { shrink: true } }}
              helperText={
                !moedaHabilitado
                  ? 'Selecione ano e mês para filtrar por moeda'
                  : moedasNoPeriodo.length === 0
                    ? 'Nenhuma moeda neste período'
                    : undefined
              }
            >
              <MenuItem value="">
                <em>Todas</em>
              </MenuItem>
              {moedasNoPeriodo.map((m) => (
                <MenuItem key={m} value={m}>
                  {m}
                </MenuItem>
              ))}
            </TextField>

            <Button
              variant="outlined"
              size="small"
              onClick={limparFiltros}
              startIcon={<CleaningServicesIcon />}
              sx={{ color: 'grey.300', borderColor: 'grey.600' }}
            >
              Limpar
            </Button>
          </Box>

          <Box sx={{ height: 420, width: '100%' }}>
            <DataGrid
              rows={linhasFiltradas}
              columns={colunas}
              loading={carregando}
              disableRowSelectionOnClick
              pageSizeOptions={[5, 10, 15]}
              initialState={{
                pagination: { paginationModel: { pageSize: 10, page: 0 } },
              }}
              sx={{
                bgcolor: 'grey.900',
                color: 'grey.200',
                borderColor: 'grey.700',
                '& .MuiDataGrid-cell': { fontSize: '0.8rem' },
                '& .MuiDataGrid-columnHeaderTitle': { fontSize: '0.85rem' },
              }}
              localeText={{
                ...ptBR.components.MuiDataGrid.defaultProps.localeText,
                loadingOverlayLabel: 'Carregando ...',
                noRowsLabel: 'Nenhuma criptomoeda cadastrada ainda.',
                paginationRowsPerPage: 'Linhas por página:',
                paginationDisplayedRows: ({ from, to, count }) =>
                  `${from}–${to} de ${count !== -1 ? count : `mais de ${to}`}`,
              }}
            />
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
}
