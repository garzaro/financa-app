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
import {zodResolver} from "@hookform/resolvers/zod";
import * as messages from "../../components/utils/toastr.jsx";
import LancamentoService from "../../app/service/lancamentoService.jsx";
import {LocalStorageService} from "../../app/service/localStorageService.jsx";
import PanoDeFundo from "../../components/feedback/loader.jsx";
import {LancamentoFormField} from "./lancamentoFormField.jsx";
import {schemaLancamento} from "./schemaLancamento.jsx";

/**
 * [x] descricao
 * [x] mes
 * [x] ano
 * [x] Colocar botão -  botoes
 * [x] usuario - pk
 * [x] Colocar a API para funcionar
 * [x] valor
 * [x] tipo_lancamento - enum
 * [x] Criar schema com zod - validar campos
 * [] ver - import Visibility from '@mui/icons-material/Visibility';
 * [] ver - import VisibilityOff from '@mui/icons-material/VisibilityOff';
 * [x] Campo observações nao esta sendo logado na tela
 * [] Campo (disable) para mostrar o status do lancamneto diretamente da aplicação = disable={true}
 * [] Ao atualizar por id esta validando os campos Mes e Valor nao atualiza, cria- verificar
 *
 * Checar usuário:
 * [] sempre validar se usuario existe antes de acessar .id, para evitar erros - sessão expirada.
 * [] Verificar lancamento duplicado - estudar a logica
 *
 * Observações
 * O htmlFor é um atributo usado no React para associar
 * um rótulo (elemento <label>) a um controle de formulário
 * (como <input>, <textarea> ou <select>). Ele desempenha
 * a mesma função que o atributo for no HTML comum.
 *
 *  nunca devemos usar o índice como key (key={i}) quando temos
 *  valores únicos disponíveis
 *
 *  Assim como no TextField, é uma boa prática adicionar um
 *  espaço (" ") {error?.message || " "} como valor padrão para
 *  a mensagem de erro. Isso garante que o espaço reservado para
 *  o texto de ajuda exista sempre, evitando que o layout do
 *  formulário "pule" quando uma mensagem de erro aparecer ou
 *  desaparecer.
 * **/
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

  /**atualizar**/
  const updateLancamento = (
    {
      descricao,
      valor,
      mes,
      ano,
      tipoLancamento,
      statusLancamento,
      usuario,
      id
    }) => {
    setLoading(true);
    /**garante usuario correto do contexto de sessão**/
    const usuarioSessao = usuarioLogado.obterItem('_usuario_logado');
    const payload = {
      descricao,
      valor,
      mes,
      ano,
      tipoLancamento,
      usuario: usuarioSessao?.id ?? usuario,
      statusLancamento
    };
    // determinar o id da rota ou do form e validar
    const routeId = params?.id;
    const mergedId = (routeId && routeId !== 'undefined' && routeId !== 'null') ? routeId : id;
    if (!mergedId || mergedId === 'undefined' || mergedId === 'null') {
      setLoading(false);
      messages.mensagemDeErro('ID do lançamento ausente ou inválido. Não foi possível atualizar.');
      return;
    }

    // RESOLVER - BANCO RECEBENDO STATUS undefined NA ATUALIZACAO - ESTE PROJETO ESTA NO lixo
    
    console.log("Payload para atualização ", { id: mergedId, ...payload })
    servicoLancamento.atualizarLancamento(mergedId, payload)
      .then(response => {
        setTimeout(() => navigate("/consultar-lancamento"), 2000);
        messages.mensagemDeSucesso("Lançamento atualizado com sucesso")
      })
      .catch(error => {
          messages.mensagemDeErro(error.response.data?.message || error.response.data)
        }
      );
    setLoading(false);
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
              <ArrowBackIcon size={40} color="primary"/>
            </IconButton>
          </Tooltip>
          <Typography
            variant="h4"
            component="h1"
            title={
            isUpdating ?
              'Atualização de lançamento' : 'Cadastro de lançamento'
          }
            sx={
            {
              textAlign: 'center',
              color: 'rgba(248,244,244,0.89)'
            }}
          >
            {/*Cadastro de lançamentos*/}
            {
              isUpdating ?
                'Atualização de lançamento' : 'Cadastro de lançamento'
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

        {/*p: 2, border: '1px dashed grey'*/}
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
            // justifyContent: "center",
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

/**
 * SUGESTAO
 * components/
 *  ├─ CadastrarLancamento/
 *  │    ├─ index.jsx
 *  │    ├─ FormFields.jsx
 *  │    ├─ useLancamentoForm.js
 *  │    ├─ useLancamentoLoader.js
 *  │    ├─ schema.js
 *  │    └─ styles.js
 * **/

/**
 *
 * // const handleSubmitLancamento = (data) => {
 *   //   console.log('Dados submetidos - valor de id:', data.id); // Verifique se o ID também está chegando
 *   //   console.log('Dados submetidos - valor de atualizando:', data.atualizando);
 *   //   if (data.atualizando) {
 *   //     updateLancamento(data);
 *   //   }else {
 *   //     createLancamento(data);
 *   //   }
 *   // }
 * **/

/**
 * {Array.from({ length: 2 }, (_, i) => {
 *                     const anoValue = new Date().getFullYear() + i;
 *                     return (
 *                       <MenuItem key={anoValue} value={anoValue}>
 *                         {anoValue}
 *                       </MenuItem>
 *                     );
 *                   })}
 * <TextField
 *             label="ValorIZACAO"
 *             type="text"
 *             {...register('valor', { required: 'Campo obrigatório' })}
 *             error={!!errors.valor}
 *             helperText={errors.valor?.message}
 *             fullWidth
 *             margin="normal"
 *           />
 *
 *           // componentDidMount(){
 *   //   const  params = this.props.match.params;
 *   //   if(params.id){
 *   //     this.lancamentoService.obterPorId(params.id)
 *   //       .then(response => {
 *   //         this.setState( {...response.data} )
 *   //       })
 *   //     .catch(error => {
 *   //       console.log(error);
 *   //     })
 *   //   }
 *   // }
 *
 * **/


/**
 *  const isEdit = Boolean(id);
 *   /**{descricao, valor, mes, ano, tipoLancamento, statusLancamento, usuario, id}/
 *
 const createUser = async (data) => {
 *
 setLoading (true);
 *
 try {
 *
 const usuario = usuarioLogado.obterItem ('_usuario_logado');
 *
 if ( ! usuario) {
 *
 throw new Error ("Você não está logado(a) no sistema")
 *
 }
 *       //descricao, valor, mes, ano, tipoLancamento, statusLancamento,
 *
 const payload = {
 *         ...data,
 *         id: id, //|| id, /* usa o id da url se o form nao tiver
 *         usuario: usuario.id,
 *
 };
 *       //DEPOIS Q  UE ATUALIZA, Select FOR FAZER NOVO UPDATE RETONRA SEM O STATUS
 *
 console.log ("Payload enviado:", payload);
 *
 if (isEdit) {
 *
 await servicoLancamento.atualizarLancamento (id, payload)
 * mensagemDeSucesso ("lançamento atualizado")
 *
 } else {
 *
 await servicoLancamento.salvarLancamento (payload)
 * mensagemDeSucesso ("Lançamento criado")
 *
 }
 *       // const response = isEdit
 *       // ? await servicoLancamento.atualizarLancamento(payload)
 *       //   :
 *       //   await servicoLancamento.salvarLancamento(payload);
 *       // mensagemDeSucesso(isEdit ? "Lançamento atualizado" : "Lançamento criado" );
 *
 reset ();
 *
 setTimeout (() => navigate ("/consultar-lancamento"), 500);
 *
 } catch (error) {
 *
 console.log ("Qual erro esta sendo retornado ", error.response);
 *
 mensagemDeErro (error?.response?.data?.message || error.message ||
 * error.response.data || "Erro inesperado");
 *
 }
 *     finally
 {
 *
 setLoading (false);
 *
 }
 *
 }
 * **/

/**
 * const onSubmit = async (data) => {
 *     setLoading(true);
 *     const usuario = usuarioLogado.obterItem( '_usuario_logado' );
 *
 *     const lancamento = {
 *       ...data,
 *       usuario,
 *     };
 *     try {
 *       if (lancamento.id) {
 *         console.log("Executando UPDATE", lancamento.id);
 *         servicoLancamento.atualizarLancamento(lancamento)
 *           .then(response => {
 *             mensagemDeSucesso("Lancamento atualizado com sucesso", response);
 *           })
 *       } else{
 *         console.log("Executando CREATE");
 *         /**remove a chave id se estive vazia, evita erro na api de criçao
*
delete lancamento.id;
*
servicoLancamento.atualizarLancamento (lancamento)
*
.
then (response => {
*
  mensagemDeSucesso ("Lancamento cadastrado com sucesso mano", response);
*
})
*
}
*
console.log ("Resposta do servidor ", response);
*
setTimeout (() => navigate ("/consultar-lancamento"), 1500);
*
}catch
(error)
{
*
  console.log (error);
*
  mensagemDeErro (error.response.data?.message || error.response.data || 'FUDEU');
*
}
*     finally
{
*
  setLoading (false);
*
}
*
}
;
 * **/