import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from '../components/navbar/navbar';
import Home from '../pages/home';
import Login from '../pages/login';
import Register from '../pages/register';
import ConsultarLancamentos from "../pages/lancamentos/consultarLancamentos";
import FormularioSenha from "../pages/signupFormPassword";
//import {ProvedorCadastroUsuario} from "../context/contextoCadastroUsuario";

const Rotas = () => {
    return (

            <Router>
                <Navbar />
                <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signupFormPassword" element={<FormularioSenha />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/consultar-lancamentos" element={<ConsultarLancamentos />} />
                </Routes>
            </Router>
           );
};
export default Rotas;