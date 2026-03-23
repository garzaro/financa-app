import React from "react";
import Rotas from "../routes/rotas.jsx";
/**sketchy , slate**/
import 'bootswatch/dist/slate/bootstrap.min.css';
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import DevErrorBoundary from "@/main/errorBoundary.tsx";
import '../style/App.css'

/**VERIFICAR SE ISTO AQUI NAO VAI FUDER OSITEMS DO NAVBAR NO COLAPSO**/
import '../style/globals.css'

import '../style/custom.css'
import 'toastr/build/toastr.css'
import 'toastr/build/toastr.min.js'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
// import 'bootstrap/dist/css/bootstrap.min.css'

import 'primereact/resources/themes/nova/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    text: {
      primary: '#fff', // texto principal
    },
  },
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#fff', // Cor do label
          '&.Mui-focused': {
            color: '#fff', // Cor do label quando está focado
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          color: '#fff', // Cor do texto digitado
        },
        notchedOutline: {
          borderColor: '#fff', // Cor da borda
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: '#fff', // Cor da borda ao passar o mouse
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: '#fff', // Cor da borda quando focado
        },
      },
    },
  },
});


function App() {
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        {/* No modo development, o React sempre mostrará o "overlay" de erro vermelho, mesmo com o Error Boundary */}
        <DevErrorBoundary>
          <Rotas/>
        </DevErrorBoundary>
      </ThemeProvider>
    </>
  );
}

export default App;


