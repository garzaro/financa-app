import React from "react";
import Rotas from "../main/rotas";
import 'bootswatch/dist/flatly/bootstrap.min.css';
import '../styles/App.css'
import '../styles/custom.css'
import 'toastr/build/toastr.css'
import 'toastr/build/toastr.min.js'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
// import '../styles/globals.css'

import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";


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
                <Rotas/>
            </ThemeProvider>
        </>
    );
}

export default App;