import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Astered from "../utils/astered.jsx";
/*filtro*/
export default function FiltroLancamento(
  {
    ano,
    mes,
    tipoLancamento,
    limpar,
    onAnoChange,
    onMesChange,
    onTipoLancamentoChange,
    onLimparChange,
    onChange
  }) {

  // const monthFormatter = new Intl.DateTimeFormat('pt-BR', {month: 'long'});
  return (
    <div style={{ display: 'table', gap: '16px' }}>
      {/**
       campo ano
       **/}
      <FormControl
        variant="standard"
        sx={{ m: 1, minWidth: 120 }}
      >
        <InputLabel
          id="select-ano-label"
        >
          Ano: <Astered> *</Astered>
        </InputLabel>
        <Select
          labelId="select-ano-label"
          id="select-ano"
          value={ano}
          onChange={onAnoChange}
          label="Ano"
          required
        >
          <MenuItem value="">
            <em>Selecione...</em>
          </MenuItem>
          {[...Array(2)].map((_, i) => {
            const anoAtual = new Date().getFullYear();
            const anoValue = anoAtual - i;
            return (
              <MenuItem key={i} value={anoValue}>
                {anoValue}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      {/*campo mes*/}
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="select-mes-label">Mês: </InputLabel>
        <Select
          labelId="select-mes-label"
          id="select-mes"
          value={mes}
          onChange={onMesChange}
          label="Mês"
        >
          <MenuItem value="">
            <em>Selecione...</em>
          </MenuItem>
          {/*{[...Array(12)].map((_, i) => {*/}
          {/*    <MenuItem key={i + 1} value={i +1 }>*/}
          {/*        {monthFormatter.format(new Date(2025, i))}*/}
          {/*    </MenuItem>*/}

          {/*})}*/}
          {[...Array(12)].map((_, i) => (
            <MenuItem key={ i + 1 } value={ i + 1 }>
              {new Date( 0, i ).toLocaleDateString(
                'pt-BR', {month: 'long'})}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {/*campo tipo lancamento*/}
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="select-tipo-lancamento-label">
          Tipo:
          <Astered> *</Astered>
        </InputLabel>
        <Select
          labelId="select-tipo-label"
          id="select-tipo"
          value={tipoLancamento}
          onChange={onTipoLancamentoChange}
          label="Tipo"
          required
        >
          <MenuItem value="">
            <em>Selecione...</em>
          </MenuItem>
          <MenuItem value="DESPESA">Despesa</MenuItem>
          <MenuItem value="RECEITA">Receita</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

/*
* MenuItem - tem um value vazio (""), ou seja, representa uma opção "nenhuma selecionada".
* key={anoValue}: chave única para React.
* value={anoValue}: o valor que será enviado ao selecionar essa opção.
* {anoValue}: o texto exibido no dropdown (por exemplo: "2025", "2024").
* */