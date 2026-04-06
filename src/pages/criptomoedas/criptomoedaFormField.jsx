import {useEffect} from "react";
import {Controller,useWatch} from "react-hook-form";
import {DISABLED_FIELDS, FORM_FIELDS} from "@/components/criptomoedas/formField.js";
import {FormControl, Grid, InputLabel, MenuItem, Select, TextField} from "@mui/material";


export default function CriptomoedaFormField(
  {control, register, setValue, reset,  errors, id}
) {
  // monitorar os valores tempo real
  const valorCripto = useWatch({ control, name: "valorAtualAtivo" }); // nome no FORM_FIELDS
  const valorInvestido = useWatch({ control, name: "valorInvestido" });

  // fracionar
  const resultado = ( valorCripto > 0 && valorInvestido > 0 )
    ? (
      parseFloat( valorInvestido) / parseFloat( valorCripto)).toFixed(8)
      : "0,00";

  // Sincroniza o valor calculado com o estado do RHF para o campo ReadOnly
  // Isso garante que se submeter o formulário, o valor do Campo 3 vá junto
  useEffect (() => {
    setValue("fracaoAtivo", resultado); //da divisao
  }, [resultado, setValue]);

  // const handleChange = (id, value) => {
  //   setValorCripto(prev => ({ ...prev, [id]: value }));
  // };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {FORM_FIELDS.map(( field ) => {
        // ** PARA NAO TER QUE COLOCAR mode MANUALMENTE NO array **
        const isControlled = field.type === 'select';
        const isDisabled = DISABLED_FIELDS.includes(field.name) || field.isReadOnly;
        const registerField = register(field.name);
        // const isReadOnly = field.readOnly || field.isReadOnly;
        // 🔹 REGISTER
        if ( !isControlled ) {
          return(
            <TextField
              key={field.id}
              {...field}
              {...registerField}
              id={field.id}
              type={field.type}
              label={field.label}
              fullWidth
              required
              disabled={isDisabled} //field.isReadOnly
              variant={ isDisabled ? "filled" : "outlined" } //isReadOnly
              // Força o valor apenas se for ReadOnly, caso contrário deixa o RHF cuidar*/}
              value={field.name === isDisabled ? resultado : undefined && field.value }
              // value={field.value}
              InputProps={{ readOnly: isDisabled }}
              slotProps={{ inputLabel: { shrink: true } }}
              onChange={(e) => {
                registerField.onChange(e);
                field.onChange?.(e, { setValue });
              }}
              error={!!errors[field.name]}
              helperText={errors[field.name]?.message}
              sx={{
                '& .MuiOutlinedInput-root': { color: 'grey.200' },
                '& .MuiInputLabel-root': { color: 'grey.400' },
              }}
            />
          );
        }
        // 🔹 CONTROLLER -🔹 CAMPOS CONTROLADOS RHF
        return(
          <Controller
            key={field.id}
            name={field.name}
            control={control}
            render={({ field: controlledField }) => (
              <TextField
                {...controlledField}
                id={field.id}
                select={field.type === 'select'}
                label={field.label}
                disabled={isDisabled}
                variant={isDisabled ? "filled" : "outlined"}
                fullWidth
                required
                value={controlledField.value ?? ''} // operador (nullish coalescing) ?? '' - garante o uso de '' for null or undef
                error={!!errors[field.name]}
                helperText={errors[field.name]?.message}
                sx={{
                  '& .MuiOutlinedInput-root': { color: 'grey.200' },
                  '& .MuiInputLabel-root': { color: 'grey.400' },
                }}
              >
                {field.options?.map(( option ) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        );
      })}
    </div>
  );
}








//
// // 🔹 CONTROLLER -🔹 CAMPOS CONTROLADOS RHF
// if (item.mode === 'controller') {
//   return (
//     <Grid item xs={12} sm={6} md={4} key={item.name}>
//       <Controller
//         name={item.name}
//         control={control}
//         render={({ field: controlledField }) => (
//           <TextField
//             {...controlledField}
//             select={item.type === 'select'}
//             label={item.label}
//             fullWidth
//             required
//             value={controlledField.value ?? ''}
//             error={!!errors[item.name]}
//             helperText={errors[item.name]?.message}
//             sx={{
//               '& .MuiOutlinedInput-root': { color: 'grey.200' },
//               '& .MuiInputLabel-root': { color: 'grey.400' },
//             }}
//           >
//             {item.options?.map((option) => (
//               <MenuItem key={option.value} value={option.value}>
//                 {option.label}
//               </MenuItem>
//             ))}
//           </TextField>
//         )}
//       />
//     </Grid>
//   );


// {FORM_FIELDS.map((field) => (
//   <Grid item xs={12} sm={6} md={4} key={field.name}>
//     <TextField
//       {...register(field.name)}
//       label={field.label}
//       type={field.type !== 'select' ? field.type || 'text' : undefined}
//       select={field.type === 'select'}
//       fullWidth
//     >
//       {field.type === 'select' &&
//         field.options?.map((option) => (
//           <MenuItem key={option} value={option}>
//             {option}
//           </MenuItem>
//         ))}
//     </TextField>
//   </Grid>
// ))}


//
// <Controller
//   name="corretora"
//   control={control}
//   render={({ field }) => (
//     <TextField
//       {...field}
//       value={field.value || ''}
//       select
//       label="Corretora"
//       fullWidth
//       required
//       error={!!errors.corretora}
//       helperText={errors.corretora?.message}
//       sx={{
//         '& .MuiOutlinedInput-root': { color: 'grey.300' },
//         '& .MuiInputLabel-root': { color: 'grey.400' },
//       }}
//     >
//       <MenuItem value="">
//         <em>Selecione a corretora</em>
//       </MenuItem>
//       {CORRETORAS.map((corretoras) => (
//         <MenuItem key={corretoras.value} value={corretoras.value}>
//           {corretoras.label}
//         </MenuItem>
//       ))}
//     </TextField>
//   )}
// />
//
// <TextField
//   {...register('valorAtualMoeda')}
//   label="Valor atual da moeda"
//   type="number"
//   fullWidth
//   required
//   inputProps={{ step: 'any', min: 0 }}
//   error={!!errors.valorAtualMoeda}
//   helperText={errors.valorAtualMoeda?.message}
//   sx={{
//     '& input[type=number]': {
//       MozAppearance: 'textfield',
//     },
//     '& input[type=number]::-webkit-outer-spin-button': {
//       WebkitAppearance: 'none',
//       margin: 0,
//     },
//     '& input[type=number]::-webkit-inner-spin-button': {
//       WebkitAppearance: 'none',
//       margin: 0,
//     },
//     '& .MuiOutlinedInput-root': { color: 'grey.200' },
//     '& .MuiInputLabel-root': { color: 'grey.400' },
//   }}
// />
//
// <TextField
//   {...register('valorInvestido')}
//   label="Valor investido (R$)"
//   type="number"
//   fullWidth
//   required
//   inputProps={{ step: '0.01', min: 0 }}
//   error={!!errors.valorInvestido}
//   helperText={errors.valorInvestido?.message}
//   sx={{
//     '& input[type=number]': {
//       MozAppearance: 'textfield',
//     },
//     '& input[type=number]::-webkit-outer-spin-button': {
//       WebkitAppearance: 'none',
//       margin: 0,
//     },
//     '& input[type=number]::-webkit-inner-spin-button': {
//       WebkitAppearance: 'none',
//       margin: 0,
//     },
//     '& .MuiOutlinedInput-root': { color: 'grey.200' },
//     '& .MuiInputLabel-root': { color: 'grey.400' },
//   }}
// />

// PROMPT
// na verdade voce trouxe um array para ser mapeado onde é decdio se é um textfield normal ú se é um select, estamos usando RHF, sabemos qua para campos controlados usamos Controller, Da forma como esta exposto os componentes abaixo quando é preenchido o campo dataEntrada o campo Mes é preenchido automaticamente, seria interessante a gemte segir a linha do objeto de array ser mapeado usando para que isto continue sendo true e nao precise declarar muitos cmapos no componente:
//
//   <TextField
//     {...register('dataEntrada')}
//     label="Dia de entrada"
//     type="date"
//     fullWidth //filed vai por toda a tela
//     required
//     slotProps={{
//       inputLabel: { shrink: true },
//     }}
//     error={!!errors.dataEntrada}
//     helperText={errors.dataEntrada?.message}
//     sx={{
//       '& .MuiOutlinedInput-root': { color: 'grey.200' },
//       '& .MuiInputLabel-root': { color: 'grey.400' },
//     }}
//   />
//
//
// <Controller
//   name="mes"
//   control={control}
//   render={({ field }) => (
//     <TextField
//       {...field}
//       value={field.value === '' || field.value === undefined || field.value === null ? '' : field.value}
//       select
//       label="Mês"
//       fullWidth
//       required
//       error={!!errors.mes}
//       helperText={errors.mes?.message} //|| 'Atualizado conforme a data de entrada'
//       sx={{
//         '& .MuiOutlinedInput-root': { color: 'grey.200' },
//         '& .MuiInputLabel-root': { color: 'grey.400' },
//       }}
//     >
//       <MenuItem value="">
//         <em>Preencha a data de entrada</em>
//       </MenuItem>
//       {MESES_NOME.map((meses) => (
//         <MenuItem key={meses.value} value={meses.value}>
//           {meses.label}
//         </MenuItem>
//       ))}
//     </TextField>
//   )}
// />
//
//

