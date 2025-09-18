import React from "react";
import Rotas from "../main/rotas";
import 'bootswatch/dist/flatly/bootstrap.min.css';
import '../estilo/App.css'
import '../estilo/custom.css'
import 'toastr/build/toastr.css'
import 'toastr/build/toastr.min.js'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
})

function App() {
    return (
        <>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                {/*<main>Este aplicativo esta usando modo escuro</main>*/}
            </ThemeProvider>
            <Rotas/>
        </>
    );
}

export default App;