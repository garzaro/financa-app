import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Astered from "./utils/astered";

export default function SelectLancamentoVariants() {
    const [ano, setAno] = React.useState('');
    const [mes, setMes] = React.useState('');

    const handleAnoChange = (e) => {
        setAno(e.target.value);
    };

    const handleMesChange = (e) => {
        setMes(e.target.value);
    };

    return (
        <div style={{ display: 'flex', gap: '16px' }}>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="select-ano-label">Ano <Astered>*</Astered></InputLabel>
                <Select
                    labelId="select-ano-label"
                    id="select-ano"
                    value={ano}
                    onChange={handleAnoChange}
                    label="Ano"
                >
                    <MenuItem value="">
                        <em>---</em>
                    </MenuItem>
                    <MenuItem value={2025}>2025</MenuItem>
                    <MenuItem value={2024}>2024</MenuItem>
                    <MenuItem value={2023}>2023</MenuItem>
                </Select>
            </FormControl>

            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="select-mes-label">Mês</InputLabel>
                <Select
                    labelId="select-mes-label"
                    id="select-mes"
                    value={mes}
                    onChange={handleMesChange}
                    label="Mês"
                >
                    <MenuItem value="">
                        <em>---</em>
                    </MenuItem>
                    <MenuItem value={1}>Janeiro</MenuItem>
                    <MenuItem value={2}>Fevereiro</MenuItem>
                    <MenuItem value={3}>Março</MenuItem>
                    <MenuItem value={4}>Abril</MenuItem>
                    <MenuItem value={5}>Maio</MenuItem>
                    <MenuItem value={6}>Junho</MenuItem>
                    <MenuItem value={7}>Julho</MenuItem>
                    <MenuItem value={8}>Agosto</MenuItem>
                    <MenuItem value={9}>Setembro</MenuItem>
                    <MenuItem value={10}>Outubro</MenuItem>
                    <MenuItem value={11}>Novembro</MenuItem>
                    <MenuItem value={12}>Dezembro</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}
