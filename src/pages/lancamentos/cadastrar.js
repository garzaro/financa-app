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


/**
 * [x] descricao
 * [x] mes
 * [x] ano
 * [x] Colocar o botão -  b0toes
 * [] usuario - pk
 * [] Colocar a API ára funcionar
 * [x] valor
 * [x] tipo_lancamento - enum
 * [x] Criar schema com zod - validar campos
 * [] ver - import Visibility from '@mui/icons-material/Visibility';
 * [] ver - import VisibilityOff from '@mui/icons-material/VisibilityOff';
 * [] Campo observações nao esta sendo logado na tela
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

const createUserFormSchema = z.object({
    /**dados do objeto*/
    descricao: z.string()
        .nonempty('Selecione a descrição'),

    ano: z
        .number('Selecione a opção'),

    mes: z
        .string()
        .nonempty('Selecione uma opção'),

    valor: z
        .string()
        .nonempty('O valor é obrigatório')
        .refine((value) => !isNaN(Number(value)) && Number(value)> 0, {
            error: 'O valor deve ser maior que zero'
    }),

    observacao: z
        .string()
        .length(100, 'O campo deve conter no máximo 100 caracteres')
        .optional()
        .or(z.literal(' ')), //permite string vazia
});

export default function CadastrarLancamento() {

    const {
        register,
        control,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting }, reset
    } = useForm({
        resolver: zodResolver(createUserFormSchema),
        defaultValues: {
            descricao: '',
            mes: '',
            ano: '',
            valor: '',
            observacoes: '',
        },
        mode: 'onBlur',
    });

    const [ano, setAno] = useState([]);
    const [mes, setMes] = useState([]);
    const [valor, setValor] = useState('');
    const [observacoes, setObservacoes] = useState([]);
    // log
    const [output, setOutput] = useState('');

    function createLancamento (data) {
        // log
        setOutput(JSON.stringify(data, null, 2));
    }
    const onCancel = () => {
        reset();
    }

return (
    <Container
        maxWidth="sm"
        sx={{ padding: '1rem',}}
    >
        <Paper
            elevation={3}
            sx={{
                border: '1px solid',
                borderColor: 'rgba(78,77,77,0.89)',
                borderRadius: '0.3rem',
                padding: '1rem',
                boxShadow: 2,

            }}
        >
            <div className="text-white-100 border-5 ">
                <Typography
                   variant="h4"
                    component="h1"
                    sx={{
                        textAlign: 'center',
                        color: 'rgba(248,244,244,0.89)'
                }}
                >
                    Cadastro de lançamentos
                </Typography>
                <Typography
                    variant="body2"
                    component="p"
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
                    gap:2,
                    justifyContent: "center",
                    p: 2,
                    border: '1px solid ',
                    color: 'rgba(66,64,64,0.89)',
                    flexWrap: 'wrap',
                    mt: 2,
                    textIndent:'initial',
                    minHeight: '10ch',
            }}
            >
                {/*campo descrição - uncontrolled*/}
                <Controller
                    name="descricao"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                        <FormControl
                            variant="outlined"
                            sx={{ m: 1, width: '18ch' }}
                            // Zod via zodResolver
                            error={!!errors.descricao}
                        >
                            <InputLabel id="select-ano-label">
                                Descrição: <Astered> *</Astered>
                            </InputLabel>
                            <Select
                                labelId="select-ano-label"
                                label="Descricao"
                                // Inclui 'value' e 'onChange'
                                {...field}
                            >
                                <MenuItem value="">
                                    <em>Selecione</em>
                                </MenuItem>
                                <MenuItem value="despesa">DESPESA</MenuItem>
                                <MenuItem value="receita">RECEITA</MenuItem>
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
                            sx={{ m: 1, width: '18ch' }}
                            // Zod via zodResolver
                            error={!!errors.ano}
                        >
                            <InputLabel id="select-ano-label">
                                Ano: <Astered> *</Astered>
                            </InputLabel>
                            <Select
                                labelId="select-ano-label"
                                label="Ano"
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

                {/*select mes - controlado*/}
                <Controller
                    name="mes"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                        <FormControl
                            variant="outlined"
                            sx={{ m: 1, width: '18ch' }}
                            error={!!errors.mes}
                        >
                            <InputLabel id="select-mes-label">
                                Mês: <Astered> *</Astered>
                            </InputLabel>
                            <Select
                                labelId="select-mes-label"
                                label="Mes"
                                {...field}
                            >
                                <MenuItem value="">
                                    <em>Selecione</em>
                                </MenuItem>
                                {Array.from({ length: 12 }, (_, i) => {
                                    const mesValue = new Date(0, i)
                                        .toLocaleString('pt-BR', {month: 'long'});
                                    return (
                                        <MenuItem key={mesValue} value={mesValue}>
                                            {mesValue}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                            <FormHelperText>{error?.message || " "}</FormHelperText>
                        </FormControl>
                    )}
                />

                {/*campo valor*/}
                <FormControl sx={{ m: 1, width: '18ch'}} error={!!errors.valor}>
                    <InputLabel htmlFor="outlined-adornment-amount">Valor</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-amount"
                        startAdornment={
                        <InputAdornment position="start">
                            R$
                        </InputAdornment>}
                        label="Valor"
                        {...register("valor", { required: true })}
                        error={!!errors.valor}
                    />
                    <FormHelperText>{errors.valor?.message || " "}</FormHelperText>
                </FormControl>

                {/*campo observação*/}
                <Controller
                    name= "observacoes"
                    control={control}
                    render={({ field }) => (
                    <TextField
                    sx={{m: 1, width: '39ch'}}
                        {...field}
                        label="Observações"
                        variant="outlined"
                        multiline
                        rows={4}
                        placeholder="Observação sobre o lançamento"
                        value={field.value || ''}
                        inputProps={{
                            maxLength: 100,
                        }}
                        helperText={
                        errors.observacoes?.message ||
                            `${(field.value || '').length}/100 caracteres`
                    }
                    error={!!errors.observacoes}
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
