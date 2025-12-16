import {useEffect} from "react";
import {
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select, TextField
} from "@mui/material";
import {Controller, useForm, useFormContext} from "react-hook-form";
import Astered from "../../components/utils/astered.jsx";
import {useParams} from "react-router-dom";
import {mensagemDeErro} from "../../components/utils/toastr.jsx";


export function LancamentoFormField({control, register, reset,  errors, id}) {

  const meses = [
    { value: '1', label: 'Janeiro' },
    { value: '2', label: 'Fevereiro' },
    { value: '3', label: 'Março' },
    { value: '4', label: 'Abril' },
    { value: '5', label: 'Maio' },
    { value: '6', label: 'Junho' },
    { value: '7', label: 'Julho' },
    { value: '8', label: 'Agosto' },
    { value: '9', label: 'Setembro' },
    { value: '10', label: 'Outubro' },
    { value: '11', label: 'Novembro' },
    { value: '12', label: 'Dezembro' },
  ];

  return (
    <>
      {/*campo tipo de lançamento*/}
      <Controller
        name="tipoLancamento"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <FormControl variant="outlined" color="success"
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
              <MenuItem value="" disabled><em>Selecione</em></MenuItem>
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
              <MenuItem><em>Selecione</em></MenuItem>
              {meses.map((mes, index) => (
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
              <MenuItem value="" disabled><em>Selecione</em></MenuItem>
              {[0,1].map(i => {
                const y = new Date().getFullYear() + i;
                return <MenuItem key={y} value={y}>{y}</MenuItem>;
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
          type="number"
          // tira setinha de acrescer numero
          sx={{
            '& input[type=number]': {
              MozAppearance: 'textfield',
            },
            '& input[type=number]::-webkit-outer-spin-button': {
              WebkitAppearance: 'none',
              margin: 0,
            },
            '& input[type=number]::-webkit-inner-spin-button': {
              WebkitAppearance: 'none',
              margin: 0,
            },
          }}
          {...register("valor", { required: true })}
          error={!!errors.valor}
        />
        <FormHelperText>{errors.valor?.message || " "}</FormHelperText>
      </FormControl>

      {/*campo status*/}
      <FormControl
        sx={{ width: '25ch'}}
      >
        {/*<InputLabel htmlFor="status_lancamento">*/}
        {/*  Status: <Astered> *</Astered>*/}
        {/*</InputLabel>*/}
        <OutlinedInput
          disabled={!id}
          id="status_lancamento"
          color="success"
          startAdornment={
            <InputAdornment position="start">
              Status |
            </InputAdornment>}
          // label="Status"
          {...register("statusLancamento", { required: false })}
        />
      </FormControl>

      {/*campo descricao*/}
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
    </>
  )
}