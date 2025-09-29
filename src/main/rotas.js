import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from '../components/navbar/navbar';
import Home from '../pages/home';
import Login from '../pages/login';
import Register from '../pages/cadastroUsuario/register';
//import ConsultarLancamentos from "../pages/lancamentos/consultarLancamentos";
import FormularioSenha from "../pages/cadastroUsuario/signupFormPassword";
import CadastrarLancamento from "../pages/lancamentos/cadastrar";
import ConsultarLancamento from "../pages/lancamentos/table-consultar";
//import {ProvedorCadastroUsuario} from "../context/contextoCadastroUsuario";

const Rotas = () => {
    return (

            <Router>
                <Navbar />
                {/*<SelectMenuVariants/>*/}
                <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signupFormPassword" element={<FormularioSenha />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/table-consultar" element={<ConsultarLancamento />} />
                    <Route path="/cadastrar" element={<CadastrarLancamento />} />
                </Routes>
            </Router>
           );
};
export default Rotas;