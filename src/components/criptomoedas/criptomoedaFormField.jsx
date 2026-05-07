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
              value={field.name === 'fracaoAtivo' ? resultado : undefined}
              // value={field.value}
              InputProps={{
                readOnly: isDisabled,
                inputProps: {
                  min: field.min,
                }
              }}
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

