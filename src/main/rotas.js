import React from 'react';

import Login from "../views/login";
import CadastroUsuario from "../views/cadastro-usuario";
import {BrowserRouter, Route, Router, Routes} from "react-router-dom";

function Rotas() {
    return (

        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro-usuario" element={<CadastroUsuario />} />
            </Routes>
        </BrowserRouter>

    )
}
export default Rotas;






