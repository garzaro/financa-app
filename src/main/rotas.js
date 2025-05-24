import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from '../components/navbar';
import Home from '../pages/home';
import Login from '../pages/login';
import Register from '../pages/register';
import FormularioSenha from "../pages/signupFormPassword";
import ConsultaLancamentos from "../pages/consultaLancamentos";
//import {ProvedorCadastroUsuario} from "../context/contextoCadastroUsuario";

const Rotas = () => {
    return (

            <Router>
                <Navbar />
                <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/consulta-lancamentos" element={<ConsultaLancamentos />} />
                </Routes>
            </Router>
           );
};
export default Rotas;