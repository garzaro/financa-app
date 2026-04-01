import {Controller} from "react-hook-form";
import {Button, CircularProgress, Grid, MenuItem, Select, TextField} from "@mui/material";
import {CORRETORAS, MESES_NOME} from "@/components/criptomoedas/corretoras.js";
import UpdateIcon from "@mui/icons-material/Update";
import SaveIcon from "@mui/icons-material/Save";
import * as React from "react";
import {FORM_FIELDS} from "@/components/criptomoedas/formField.js";


export default function CriptomoedaFormField(
  {control, register, setValue, reset,  errors, id}
) {

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {FORM_FIELDS.map((item) => {
        // ** PARA NAO TER QUE COLOCAR mode MANUALMENTE NO array **
        const isControlled = item.type === 'select';

        // 🔹 REGISTER
        if ( !isControlled ) {
          const registerField = register(item.name);

          return(
            // item xs={12} sm={6} md={4}
            <Grid   key={item.name}>
              <TextField
                {...registerField}
                label={item.label}
                type={item.type || 'text'}
                fullWidth
                required
                slotProps={{ inputLabel: { shrink: true }}}
                onChange={(e) => {
                  registerField.onChange(e);
                  item.onChange?.(e, { setValue });
                }}
                error={!!errors[item.name]}
                helperText={errors[item.name]?.message}
                sx={{
                  '& .MuiOutlinedInput-root': { color: 'grey.200' },
                  '& .MuiInputLabel-root': { color: 'grey.400' },
                }}
              />
            </Grid>
          );
        }

        // 🔹 CONTROLLER -🔹 CAMPOS CONTROLADOS RHF
        return(
          // item xs={12} sm={6} md={4}
          <Grid   key={item.name}>
            <Controller
              name={item.name}
              control={control}
              render={({ field: controlledField }) => (
                <TextField
                  {...controlledField}
                  select={item.type === 'select'}
                  label={item.label}
                  fullWidth
                  required
                  value={controlledField.value ?? ''}
                  error={!!errors[item.name]}
                  helperText={errors[item.name]?.message}
                  sx={{
                    '& .MuiOutlinedInput-root': { color: 'grey.200' },
                    '& .MuiInputLabel-root': { color: 'grey.400' },
                  }}
                >
                  {item.options?.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
        </Grid>
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

