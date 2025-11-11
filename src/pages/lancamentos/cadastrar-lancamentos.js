import * as React from "react";
import {useState} from "react";
import {Controller, useForm} from "react-hook-form";
import Card from "../../components/card/card";
import Astered from "../../components/utils/astered";
import {
  FormControl, Box, TextField, MenuItem, Select,
  OutlinedInput, IconButton, Backdrop, Grid,
  CircularProgress, Container, FormGroup,
  InputLabel, Paper, Input, FormLabel, NativeSelect,
  Stack, styled, InputAdornment, Typography,
  FormHelperText, Button
} from "@mui/material";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {mensagemDeAlerta, mensagemDeErro, mensagemDeSucesso} from "../../components/utils/toastr";
import lancamentoService from "../../app/service/lancamentoService";
import LancamentoService from "../../app/service/lancamentoService";
import {LocalStorageService} from "../../app/service/localStorageService";

/**
 * [x] descricao
 * [x] mes
 * [x] ano
 * [x] Colocar o botão -  b0toes
 * [] usuario - pk
 * [] Colocar a API para funcionar
 * [x] valor
 * [x] tipo_lancamento - enum
 * [x] Criar schema com zod - validar campos
 * [] ver - import Visibility from '@mui/icons-material/Visibility';
 * [] ver - import VisibilityOff from '@mui/icons-material/VisibilityOff';
 * [] Campo observações nao esta sendo logado na tela
 * [] COLOCAR O CAPO DISABLE PARA MOSTRAR O STATUS QUE VAI VIR AUTOMATICAMENTE DA APLICAÇÃO = disable={true}
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

const meses = [
  {label: 'Janeiro', value: 1},
  {label: 'Fevereiro', value: 2},
  {label: 'Março', value: 3},
  {label: 'Abril', value: 4},
  {label: 'Maio', value: 5},
  {label: 'Junho', value: 6},
  {label: 'Julho', value: 7},
  {label: 'Agosto', value: 8},
  {label: 'Setembro', value: 9},
  {label: 'Outubro', value: 10},
  {label: 'Novembro', value: 11},
  {label: 'Dezembro', value: 12},
]

const createUserFormSchema = z.object({
  /**dados do objeto*/
  tipoLancamento: z
    .string()
    .nonempty('Selecione o tipo de lançamento'),

  mes: z
    .number('Selecione o mês'),

  ano: z
    .number('Selecione o ano'),

  valor: z
    .string()
    .nonempty('O valor é obrigatório')
    .refine((value) => !isNaN(Number(value)) && Number(value)> 0, {
      error: 'O valor deve ser maior que zero'
    }),

  descricao: z
    .string()
    .max(100, 'O campo deve conter no máximo 100 caracteres')
    .nonempty("Descreva o lançamento")
    /**permite string vazia**/
    .or(z.literal(' ')),
});

function CadastrarLancamento() {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset
  } = useForm({
    resolver: zodResolver(createUserFormSchema),
    defaultValues: {
      // id: '',
      tipoLancamento: '',
      mes: '',
      ano: '',
      valor: '',
      descricao: '',
    },
    mode: 'onBlur',
  });

  // const [tipoLancamento, setTipoLancamento] = useState([]);
  // const [mes, setMes] = useState([]);
  // const [ano, setAno] = useState([]);
  // const [valor, setValor] = useState('');
  // const [descricao, setDescricao] = useState('');
  const servicoLancamento = LancamentoService();
  const usuarioLogado = LocalStorageService();
  /**
   * log
   * **/
  const [output, setOutput] = useState('');

  /**
   * contexto do cadastro
   * */
  function createLancamento (data) {
    const usuario = usuarioLogado.obterItem( '_usuario_logado' )
    const dadosLancamento = {
      descricao: data.descricao,
      valor: data.valor,
      mes: data.mes,
      ano: data.ano,
      tipoLancamento: data.tipoLancamento,
      usuario: usuario.id
    }
        console.log("VER SE O ID ESTA SENDO CARREGADO", dadosLancamento)
    servicoLancamento.salvarLancamento(dadosLancamento)
      .then(response => {
        mensagemDeSucesso("Lançamento cadastrado com sucesso!")
        if (mensagemDeSucesso){
          return <CircularProgress color="secondary" size={20} />
        }
      }).catch(error => {
        mensagemDeErro(
          error.response.data?.message || error.response.data ||
          "Erro inesperdo ao cadastrar lançamento. Tente novamente mais tarde."
        )
      }
    );
    /**
     * log
     * **/
    setOutput(JSON.stringify(data, null, 2));
  }
  const onCancel = () => {
    reset();
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
        }}
      >
        <div className="text-white-100 border-5 ">
          <Typography variant="h4" component="h1"
            sx={{
              textAlign: 'center',
              color: 'rgba(248,244,244,0.89)'
            }}
          >
            Cadastro de lançamentos
          </Typography>

          <Typography
            variant="body2" component="p"
            sx={{
              textAlign: 'center',
              color: 'rgba(248,244,244,0.89)'
            }}
          >
            Todos os campos marcados com
            <Astered> * </Astered>
            são de preenchimento obrigatório
          </Typography>

        </div>
        {/*p: 2, border: '1px dashed grey'*/}
        <Box
          component="form"
          onSubmit={handleSubmit(createLancamento)}
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
          {/*campo tipo de lançamento*/}
          <Controller
            name="tipoLancamento"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <FormControl
                variant="outlined"
                color="success"
                sx={{ width: '28ch', }}
                // Zod via zodResolver
                error={!!errors.tipoLancamento}
              >
                <InputLabel id="select_tipo_lancamento_label">
                  Tipo lancamento: <Astered> *</Astered>
                </InputLabel>
                <Select
                  labelId="tipoLancamento"
                  label="Tipo Lançamento *"
                  // Inclui 'value' e 'onChange'
                  {...field}
                >
                  {/*value=""*/}
                  <MenuItem >
                    <em>Selecione</em>
                    </MenuItem>
                  <MenuItem value="DESPESA">DESPESA</MenuItem>
                  <MenuItem value="RECEITA">RECEITA</MenuItem>
                </Select>
                <FormHelperText>{error?.message || " "}</FormHelperText>
              </FormControl>
            )}
          />

          {/*select mes - controlado*/}
          <Controller
            name="mes"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <FormControl
                variant="outlined"
                color="success"
                sx={{ width: '28ch' }}
                error={!!errors.mes}
              >
                <InputLabel id="select-mes-label">
                  Mês: <Astered> *</Astered>
                </InputLabel>
                <Select
                  labelId="select-mes-label"
                  label="Mes *"
                  {...field}
                >
                  <MenuItem value="">
                    <em>Selecione</em>
                  </MenuItem>
                  {/*{Array.from({ length: 12 }, (_, i) => {*/}
                  {/*  const mesValue = new Date(0, i)*/}
                  {/*    .toLocaleString('pt-BR', {month: 'long'});*/}
                  {/*  return (*/}
                  {/*    <MenuItem key={mesValue} value={mesValue}>*/}
                  {/*      {mesValue}*/}
                  {/*    </MenuItem>*/}
                  {/*  );*/}
                  {/*})}*/}
                  {meses.map((mes) => (
                    <MenuItem key={mes.value} value={mes.value}>
                      {mes.label}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{error?.message || " "}</FormHelperText>
              </FormControl>
            )}
          />

          {/*select ano - controlado*/}
          <Controller
            name="ano"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <FormControl
                variant="outlined"
                color="success"
                sx={{ width: '23ch' }}
                // Zod via zodResolver
                error={!!errors.ano}
              >
                <InputLabel id="select-ano-label">
                  Ano: <Astered> *</Astered>
                </InputLabel>
                <Select
                  labelId="select-ano-label"
                  label="Ano *"
                  // Inclui 'value' e 'onChange'
                  {...field}
                >
                  <MenuItem value="">
                    <em>Selecione</em>
                  </MenuItem>
                  {Array.from({ length: 2 }, (_, i) => {
                    const anoValue = new Date().getFullYear() + i;
                    return (
                      <MenuItem key={anoValue} value={anoValue}>
                        {anoValue}
                      </MenuItem>
                    );
                  })}
                </Select>
                <FormHelperText>{error?.message || " "}</FormHelperText>
              </FormControl>
            )}
          />

          {/*campo valor*/}
          <FormControl
            sx={{ width: '55ch'}}
            error={!!errors.valor}
          >
            <InputLabel htmlFor="outlined-adornment-amount">
              Valor: <Astered> *</Astered>
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              color="success"
              startAdornment={
              <InputAdornment position="start">
                  R$
              </InputAdornment>}
              label="Valor *"
              {...register("valor", { required: true })}
              error={!!errors.valor}
            />
            <FormHelperText>{errors.valor?.message || " "}</FormHelperText>
          </FormControl>

          <FormControl
            sx={{ width: '25ch'}}
          >
            <TextField
              disabled
              id="standard-disabled"
              label="Status"
              defaultValue="Status"
              variant="outlined"
            />
          </FormControl>


          {/*campo observação*/}
          <Controller
            name= "descricao"
            control={control}
            render={({ field }) => (
            <TextField
            sx={{m: 1, ml:0, mr:0, width: '100ch'}}
            {...field}
              label="Descrição"
              variant="outlined"
              color="success"
              multiline
              rows={4}
              placeholder="Descrição sobre o lançamento"
              value={field.value || ''}
              inputProps={{
                maxLength: 100,
              }}
            helperText={
              errors.descricao?.message ||
              `${(field.value || '').length}/100 caracteres`
            }
            error={!!errors.descricao}
          />
        )}
      />
        <Box sx={{
          display: 'flex',
          gap: 2,
          justifyContent: 'flex-end',
          mt: 3
        }}
        >
          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Enviando...' : 'Enviar'}
          </Button>

          <Button
            type="button"
            variant="outlined"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Cancelando...' : 'Cancelar'}
          </Button>
          </Box>
        {output}
        </Box>
      </Paper>
    </Container>
  );
}
export default CadastrarLancamento;


