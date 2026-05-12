import * as React from "react";
import {useMemo} from "react";
import {useForm} from "react-hook-form";
import {useNavigate, useParams} from "react-router-dom";
import Astered from "../../components/utils/astered.jsx";
import {
  Box, Button, CircularProgress, Container, IconButton,
  Paper,
  Stack, Tooltip, Typography
} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Reply from '@mui/icons-material/Reply';
import {zodResolver} from "@hookform/resolvers/zod";
import * as messages from "../../components/utils/toastr.jsx";
import {useCadastroLancamento} from "../../hooks/lancamentos/useCadastroLancamento";
import PanoDeFundo from "../../components/feedback/loader.jsx";
import {LancamentoFormField} from "./lancamentoFormField.jsx";
import SaveIcon from '@mui/icons-material/Save';
import UpdateIcon from '@mui/icons-material/Update';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import {schemaLancamento} from "./schemaLancamento.js";
import {useAuth} from "@/auth/useAuth.js";

function CadastrarLancamento() {
  const { loggedUser } = useAuth();
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
  const navigate = useNavigate();
  const params = useParams();
  const { 
    loading, 
    salvar, 
    atualizar 
  } = useCadastroLancamento(params.id, reset);

  const isUpdating = watch('atualizando');
  /** contexto do cadastro
   * apos o formulario montado - executa o useeffect e atualiza o formulario.
   * receber os parametros da url da rota, extrair o objeto de parâmetros
   * a rota e '/cadastrar-lancamento/:id', 'params' será { id: 'valor' }
   * **/

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
        <div className="text-white-100">
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
              color: 'rgba(248,244,244,0.89)',
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
            if (data?.atualizando || params?.id) {
              atualizar(data);
            } else {
              salvar(data);
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

            {/*<Button*/}
            {/*  type="button"*/}
            {/*  variant="outlined"*/}
            {/*  onClick={handleLimpar}*/}
            {/*  disabled={ isSubmitting }*/}
            {/*  startIcon={ <CleaningServicesIcon size={20} color="inherit" /> }*/}
            {/*>*/}
            {/*  {*/}
            {/*    isSubmitting ?*/}
            {/*      'Limpando...' : 'Limpar'*/}
            {/*  }*/}
            {/*</Button>*/}

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
