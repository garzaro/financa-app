import {useEffect, useMemo, useState} from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Paper,
  Typography,
  TextField,
  MenuItem,
  Button,
  Stack,
  Box,
  CircularProgress, Container, Tooltip, IconButton, Grid,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { useAuth } from '@/auth/useAuth.js';
import ServiceCriptomoeda from '@/app/service/criptomoedaService.js';
import { schemaCriptomoeda } from '@/pages/criptomoedas/schemaCriptomoeda.js';
import { CORRETORAS, MESES_NOME } from '@/components/criptomoedas/corretoras.js';
import * as messages from '@/components/utils/toastr.jsx';
import Astered from "@/components/utils/astered.jsx";
import Reply from "@mui/icons-material/Reply";
import * as React from "react";
import {useNavigate, useParams} from "react-router-dom";
import UpdateIcon from "@mui/icons-material/Update";
import PanoDeFundo from "@/components/feedback/loader.jsx";
import CriptomoedaFormField from "@/pages/criptomoedas/criptomoedaFormField.jsx";


function mesAPartirDaDataISO(iso) {
  if (!iso || typeof iso !== 'string') return '';
  const mes = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  return mes ? Number(mes[2]) : '';
}

/**
 * @param {Object} props
 * @param {() => void} props.onSucesso — chamado após gravar (ex.: atualizar lista)
 */
export default function FormularioCriptomoeda({ onSucesso }) {

  const {loggedUser} = useAuth ();
  const {
    register, control, handleSubmit, watch, setValue, reset,
    formState: {errors, isSubmitting},
  } = useForm ({
    resolver: zodResolver (schemaCriptomoeda),
    defaultValues: {
      id: null,
      dataEntrada: '',
      mes: '',
      corretora: '',
      ativo: '',
      alavancagem: '',
      valorAtualAtivo: '',
      valorInvestido: '', //fiat
      fracaoAtivo: '',
      dataSaida: '',
      statusTransacao: '',
      tipoTransacao: '',
      usuario: null,
      atualizando: false,
    },
    mode: 'onBlur',
  });
  const servicoCriptoMoeda = useMemo (() => ServiceCriptomoeda(), []);
  const navigate = useNavigate ();
  const [loading, setLoading] = useState (false);
  const [criptoMoedaAtual, setCriptoMoedaAtual] = useState (null);
  const isUpdating = watch ('atualizando');
  /**recebendo os parametros da url da rota**/
  const params = useParams ();

  const dataEntrada = watch ('dataEntrada');

  useEffect (() => {
    const mes = mesAPartirDaDataISO (dataEntrada);
    if (mes !== '') {
      setValue ('mes', mes, {shouldValidate: true});
    }
  }, [dataEntrada, setValue]);
  // values - quando tem controlled

  /** redirecionamento de rota, carregar os dados da cripto salva**/
  useEffect (() => {
    console.log ('Mostre os Params', params);
    // evitar casos da rota com valors nullos ou undefined
    if (params?.id === 'undefined' || params?.id === 'null') {
      navigate ("/cadastrar-criptomoeda");
      return;
    }
    /** se houver um id (edição) carrega os dados da cripto **/
    if (params?.id) {
      servicoCriptoMoeda.obterCriptoMoedaPorId (params.id)
        .then (response => {
          console.log ('Id retornado como resposta', response);
          setCriptoMoedaAtual (response.data);
          reset ({...response.data, atualizando: true});
        })
        .catch (err => {
            messages.mensagemDeErro (
              err.response?.data?.message || err.response.data
            )
          }
        )
    }
  }, [params.id, reset, servicoCriptoMoeda, navigate]);

  // ** values **
  const createCriptoMoeda = async (values) => {
    setLoading (true);
    console.log ('mostre os values', values);
    if ( ! loggedUser?.id) {
      messages.mensagemDeErro ('Sessão inválida. Faça login novamente.');
      return;
    }
    /**payload**/
    const criptoMoeda = {
      dataEntrada: values.dataEntrada,
      dataSaida: values.dataSaida,
      mes: values.mes,
      corretora: values.corretora,
      moeda: values.moeda,
      valorAtualMoeda: values.valorAtualMoeda,
      valorInvestido: values.valorInvestido,
      usuario: loggedUser.id,
    }
    await servicoCriptoMoeda.salvarCriptoMoeda (criptoMoeda)
      .then (response => {
        console.log ('resposta', response);
        setTimeout (() => navigate ("consultar-moeda"), 1500);
        setLoading (false);
        messages.mensagemDeSucesso ('Criptomoeda registrada com sucesso.');
        reset ({
          dataEntrada: '', //nao precisa disso tudo, masssss...
          dataSaida: '',
          mes: '',
          corretora: '',
          moeda: '',
          valorAtualMoeda: '',
          valorInvestido: '',
          tipoTransacao: '',
        })
        onSucesso?. ();
      })
      .catch (error => {
        console.log ('erro', error);
        const msg = error.response?.data?.message ||
          (typeof error.response?.data === 'string' ? error.response.data : null) ||
          'Não foi possível salvar.';
        messages.mensagemDeErro (msg);
      })
      .finally (() => setLoading (false));
  }

  const updateCriptoMoeda = async (
    { dataSaida, mes, valorAtualMoeda, valorInvestido, tipoTransacao, statusCriptoMoeda, id, usuario}) => {
    setLoading (true);
    // prioriza id da rota; fallback para id do formulário
    const routeId = params?.id;
    const mergedId = (routeId && routeId !== 'undefined' && routeId !== 'null') ? routeId : id;

    if ( !mergedId) {
      messages.mensagemDeErro ('ID da criptomoeda ausente ou inválido. Não foi posivel atualizar.');
      setLoading (false)
      return;
    }
  // normalizar/garantir status sempre preenchido
  const statuTrimmed = typeof statusCriptoMoeda === 'string' ? statusCriptoMoeda.trim () : statusCriptoMoeda;
  const statusFinal = (statuTrimmed !== undefined && statuTrimmed !== null && statuTrimmed !== '')
    ? statusTrimmed : (criptoMoedaAtual?.statusCriptoMoeda ?? 'PENDENTE');
  const payload = {
    dataSaida,
    mes,
    valorAtualMoeda,
    valorInvestido,
    tipoTransacao,
    // enviar status garantindo valor não-nulo
    statusCriptoMoeda: statusFinal,
    // se vier no form usa-o como fallback; prioridade para sessão
    usuario: loggedUser?.id ?? usuario,
  };
  console.log ('atulaizando Lancamento, payload', {id: mergedId, payload});
  servicoCriptoMoeda.atualizarCriptoMoeda (mergedId, payload)
    .then (() => {
      setTimeout(() => navigate ('/consultar-moeda'), 1500);
      messages.mensagemDeSucesso ('Criptomoeda atualizada com sucesso.');
      setLoading (false);
      onSucesso?. ();
    })
    .catch (error => {
      messages.mensagemDeErro (
        error.response?.data?.message ||
        error.response.data ||
        error.message ||
        'Erro ao atualizar criptomoeda.' //esta mensagem pode ser dixada para o servico retornar
      );
    })
    .finally (() => setLoading (false));
  }

  const handleCancelar = () => {
    navigate ("/consultar-criptomoeda");
  }

  return (
    <Container maxWidth="md" sx={{ padding: '1rem', justifyContent: 'center'}}>
      {/*border: '1px solid', borderColor: 'rgba(78,77,77,0.89)', borderRadius: '0.3rem',*/}
      {/*padding: '1rem', boxShadow: 2, position: 'relative', p: 3, mb: 3, bgcolor: 'grey.900', color: 'grey.200'*/}
      <Paper
        elevation={3}
        sx={{ border: '1px solid', borderColor: 'rgba(78,77,77,0.89)', borderRadius: '0.3rem', padding: '1rem',
        boxShadow: 2, position: 'relative',
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", position: "relative", mb: 2,}}
        >
          <div className="text-white-100">
            {/* Ícone no canto superior esquerdo */}
            <Tooltip title="Voltar">
              <IconButton onClick={ handleCancelar } sx={{ position: "absolute", left: 0}}
              >
                <Reply size={40} color="primary"/>
                </IconButton>
            </Tooltip>
            <Typography variant="h4" component="h1" sx={
              { textAlign: 'center',  color: 'rgba(248,244,244,0.89)',
              }}
            >
              {/** Cadastro de criptomoeda **/}
              {  isUpdating ?
                'Atualização de Criptomoeda' : 'Cadastro de Criptomoeda'
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

        <Box component="form" onSubmit={handleSubmit(( data ) => {
          /** decide entre criar ou atualizar conforme contexto **/
          if (data?.atualizando || params?.id) {
            updateCriptoMoeda( data );
          } else {
            createCriptoMoeda( data );
          }
        })} noValidate
        sx={
          { display: 'flex', flexDirection: 'flexwrap', gap:1, p: 4, mr: 2, ml: 2,  border: '1px solid ',
               color: 'rgba(66,64,64,0.89)', flexWrap: 'wrap', mt: 2, textIndent:'initial', minHeight: '10ch', }}
        >
          {/* campos ocultos para manter id e estado de atualização no form */}
          <input type="hidden" {...register("id")} />
          <input type="hidden" {...register("atualizando")} />

          <Stack spacing={2.5} display={'grid, grid-cols-2'} >

            <CriptomoedaFormField
              control={control}
              register={register}
              setValue={setValue}
              errors={errors}
              id={params?.id}
            />

            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting || loading }
              startIcon={isSubmitting ? <CircularProgress size={18} color="inherit" />
                : (isUpdating ? <UpdateIcon /> : <SaveIcon />)
              }
            >
              {
                isSubmitting || loading
                  ? ( isUpdating ? 'Atualizando...' : 'Salvando...')
                  :
                  (isUpdating ? 'Atualizar' : 'Salvar'
                  )
              }
            </Button>

          </Stack>
        </Box>
        {/**loader**/}
        <PanoDeFundo
          open={loading}
          color="inherit"
          titulo="Salvando..."
          mensagem="Estamos salvando sua criptomoeda. Por favor, aguarde..."
        />
      </Paper>
    </Container>
  );
}


{/*<TextField*/}
{/*  {...register('moeda')}*/}
{/*  label="Moeda"*/}
{/*  placeholder="Ex.: BTC, ETH, SOL"*/}
{/*  fullWidth*/}
{/*  required*/}
{/*  error={!!errors.moeda}*/}
{/*  helperText={errors.moeda?.message}*/}
{/*  sx={{*/}
{/*    '& .MuiOutlinedInput-root': { color: 'grey.200' },*/}
{/*    '& .MuiInputLabel-root': { color: 'grey.400' },*/}
{/*  }}*/}
{/*/>*/}