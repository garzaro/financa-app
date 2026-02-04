import * as React from "react";
import {useCallback, useEffect, useState} from "react";
import {Controller, useForm} from "react-hook-form";
import {useNavigate, useParams} from "react-router-dom";
import Card from "../../components/template/card.jsx";
import Astered from "../../components/utils/astered.jsx";
import {
  FormControl, Box, TextField, MenuItem, Select,
  OutlinedInput, IconButton, Backdrop, Grid,
  CircularProgress, Container, FormGroup,
  InputLabel, Paper, Input, FormLabel, NativeSelect,
  Stack, styled, InputAdornment, Typography,
  FormHelperText, Button, Tooltip
} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Reply from '@mui/icons-material/Reply';
import {zodResolver} from "@hookform/resolvers/zod";
import * as messages from "../../components/utils/toastr.jsx";
import LancamentoService from "../../app/service/lancamentoService.js";
import {LocalStorageService} from "../../app/service/localStorageService.js";
import PanoDeFundo from "../../components/feedback/loader.jsx";
import {LancamentoFormField} from "./LancamentoFormField.jsx";
import SaveIcon from '@mui/icons-material/Save';
import UpdateIcon from '@mui/icons-material/Update';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import {schemaLancamento} from "./SchemaLancamento.jsx";

function CadastrarLancamento() {
  const { register, control, handleSubmit, watch,
    formState: { errors, isSubmitting }, reset} =
    useForm({
    resolver: zodResolver(schemaLancamento),
    defaultValues: {
      id: null,
      descricao: '',
      valor: '',
       mes: '',
      ano: '',
      tipoLancamento: '',
      usuario: null,
      atualizando: false,
    },
    mode: 'onBlur',
  });
  const servicoLancamento = LancamentoService();
  const usuarioLogado = LocalStorageService();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [lancamentoAtual, setLancamentoAtual] = useState(null);
  const isUpdating = watch('atualizando');
  /** contexto do cadastro
   * apos o formulario montado - executa o useeffect e atualiza o formulario.
   * receber os parametros da url da rota, extrair o objeto de parâmetros
   * a rota e '/cadastrar-lancamento/:id', 'params' será { id: 'valor' }
   * **/
  const params = useParams();

  useEffect(() => {
    console.log('Mostrar os Parâmetros:', params);
    // evitar caso de rota "/cadastrar-lancamento/undefined" ou valores inválidos
    if (params?.id === 'undefined' || params?.id === 'null') {
      navigate('/cadastrar-lancamento');
      return;
    }
    if (params.id){
      /**se houver um id (edição) carrega os dados do lancamento**/
      servicoLancamento.obterLancamentoPorId(params.id)
        .then(response => {
          console.log("ID retornado ", response);
           // guarda objeto atual para fallback e popula formulário
          setLancamentoAtual(response.data);
          reset( { ...response.data, atualizando: true } );
        })
        .catch(error => {
          messages.mensagemDeErro(
            error.response.data?.message || error.response.data )
        })
    }
    /**se nao houver id, os valores padrao dos campos permanecem vazios (criacao)**/
  }, [params.id, reset]);

  /** submit - usar (data) que da certo tambem para valores iniciais **/
  const createLancamento = ({ descricao, valor, mes, ano, tipoLancamento  }) => {
    setLoading(true);
    const usuario = usuarioLogado.obterItem( '_usuario_logado' )
    const lancamento = { descricao, valor, mes, ano, tipoLancamento, usuario: usuario.id }
    // servicoLancamento.validarLancamento(lancamento)
    servicoLancamento.salvarLancamento(lancamento)
      .then(response => {
        setTimeout(() => navigate("/consultar-lancamento"), 1500);
        messages.mensagemDeSucesso("Lancamento cadastrado com sucesso");
      }).catch(error => {
        messages.mensagemDeErro( error.response.data?.message || error.response.data )
      }
    );
    setLoading(false);
  }

  /**atualizar - LER**/
  const updateLancamento = (
    { descricao, valor, mes, ano, tipoLancamento, statusLancamento, id, usuario }) => {
    setLoading(true);
    try {
      // prioriza id da rota; fallback para id do formulário
      const routeId = params?.id;
      const mergedId = (routeId && routeId !== 'undefined' && routeId !== 'null') ? routeId : id;

      if (!mergedId) {
        messages.mensagemDeErro('ID do lançamento ausente ou inválido. Não foi possível atualizar.');
        return;
      }
      // garantir usuario correto do contexto de sessão
      const usuarioSessao = usuarioLogado.obterItem('_usuario_logado');
      // normalizar/garantir status sempre preenchido
      const statusTrimmed = typeof statusLancamento === 'string' ? statusLancamento.trim() : statusLancamento;
      const statusFinal = (statusTrimmed !== undefined && statusTrimmed !== null && statusTrimmed !== '')
        ? statusTrimmed
        : (lancamentoAtual?.statusLancamento ?? 'PENDENTE');
      const payload = {
        descricao,
        valor,
        mes,
        ano,
        tipoLancamento,
        // enviar status garantindo valor não-nulo
        statusLancamento: statusFinal,
        // se vier no form usa-o como fallback; prioridade para sessão
        usuario: usuarioSessao?.id ?? usuario,
      };
      console.log('Atualizando lançamento', { id: mergedId, payload });
      servicoLancamento.atualizarLancamento(mergedId, payload)
        .then(() => {
          setTimeout(() => navigate('/consultar-lancamento'), 2000);
          messages.mensagemDeSucesso('Lançamento atualizado com sucesso');
        })
        .catch(error => {
          messages.mensagemDeErro(
            error.response?.data?.message ||
            error.response?.data ||
            error.message ||
            'Erro ao atualizar lançamento.'
          );
        })
        .finally(() => setLoading(false));
    } catch (e) {
      messages.mensagemDeErro(e?.message || 'Falha inesperada ao atualizar.');
      setLoading(false);
    }
  }

  const handleLimpar = () => {
    reset();
  }

  const handleCancelar = () => {
    navigate("/consultar-lancamento");
  }

  return (
    <Container maxWidth="md" sx={{ padding: '1rem',}}>
      <Paper elevation={3}
             sx={{
               border: '1px solid',
               borderColor: 'rgba(78,77,77,0.89)',
               borderRadius: '0.3rem',
               padding: '1rem',
               boxShadow: 2,
               position: 'relative',
             }}
      >
        <Box
          sx={
          {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            mb: 2,
          }
        }
      >
        <div className="text-white-100 border-5 ">
          {/* Ícone no canto superior esquerdo */}
          <Tooltip title="Voltar">
            <IconButton onClick={handleCancelar} sx={
              {
                position: "absolute",
                left: 0
              }}
            >
              <Reply size={40} color="primary"/>
            </IconButton>
          </Tooltip>
          <Typography
            variant="h4"
            component="h1"
            sx={
            {
              textAlign: 'center',
              color: 'rgba(248,244,244,0.89)'
            }}
          >
            {/*Cadastro de lançamentos*!*/}
            {  isUpdating ?
              'Atualização de lançamentos' : 'Cadastro de lançamento'
            }
            </Typography>
            <Typography
              variant="body2"
              component="p"
              sx={
              {
                textAlign: 'center',
                color: 'rgba(248,244,244,0.89)'
              }}
            >
              Todos os campos marcados com
              <Astered> * </Astered>
              são de preenchimento obrigatório
            </Typography>
          </div>
        </Box>

        <Box
          component="form"
          onSubmit={handleSubmit((data) => {
            /**decide entre criar ou atualizar conforme contexto**/
            if (data?.atualizando || params?.id) {
              updateLancamento(data);
            } else {
              createLancamento(data);
            }
          })}
          sx={{
            display: 'flex',
            flexDirection: 'flexwrap',
            gap:1,
            p: 4,
            mr: 2,
            ml: 2,
            border: '1px solid ',
            color: 'rgba(66,64,64,0.89)',
            flexWrap: 'wrap',
            mt: 2,
            textIndent:'initial',
            minHeight: '10ch',
          }}
        >
          {/* campos ocultos para manter id e estado de atualização no form */}
          <input type="hidden" {...register("id")} />
          <input type="hidden" {...register("atualizando")} />

          {/**
           FORMULARIO
           **/}
          <LancamentoFormField
            control={control}
            register={register}
            errors={errors}
            id={params.id}
          />
          {/*
        BOTOES
        */}
          <Box sx={
            {
              display: 'flex',
              gap: 2,
              justifyContent: 'flex-end',
              mt: 3
            }}
          >
            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting || loading}
              startIcon={ isSubmitting || loading ? <CircularProgress size={20} color="inherit" /> // ícone de loading
                : (isUpdating ? <UpdateIcon /> : <SaveIcon />)   // ícone de atualizar ou salvar
              }
            >
              {
                isSubmitting || loading
                ? ( isUpdating ? 'Atualizando...' : 'Salvando...' )
                  :
                  ( isUpdating ? 'Atualizar' : 'Salvar' )
              }
            </Button>

            {/*<Button type="submit" variant="contained" onClick={updateLancamento}>*/}
            {/*  {isSubmitting ? 'Redirecionando...' : 'Atualizar'}*/}
            {/*</Button>*/}

            <Button
              type="button"
              variant="outlined"
              onClick={handleLimpar}
              disabled={ isSubmitting }
              startIcon={ <CleaningServicesIcon size={20} color="inherit" /> }
            >
              {
                isSubmitting ?
                  'Limpando...' : 'Limpar'
              }
            </Button>

          </Box>
          <PanoDeFundo
            open={loading}
            color="inherit"
            titulo="Salvando..."
            mensagem="Estamos salvando seu lançamento, por favor aguarde..."
          />
        </Box>
      </Paper>
    </Container>
  );
}
export default CadastrarLancamento;
