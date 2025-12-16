import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from '../components/template/navbar.jsx';
import Home from '../pages/home.jsx';
import Login from '../pages/login.jsx';
import Register from '../pages/cadastroUsuario/register.jsx';
//import ConsultarLancamentos from "../pages/lancamentos/consultarLancamentos";
import FormularioSenha from "../pages/cadastroUsuario/signupFormPassword.jsx";
import CadastrarLancamento from "../pages/lancamentos/cadastrar-lancamentos.jsx";
import ConsultarLancamento from "../pages/lancamentos/consultar-lancamentos.jsx";
import AtualizarLancamento from "../pages/lancamentos/atualizar-lancamento.jsx";
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
        <Route path="/consultar-lancamento" element={<ConsultarLancamento />} />
        {/*<Route path="/cadastrar-lancamento/" element={<CadastrarLancamento />} />*/}
        <Route path="/cadastrar-lancamento/:id?" element={<CadastrarLancamento />} />
        <Route path="/atualizar-lancamento/:id?" element={<AtualizarLancamento />} />
        {/* Adicione uma rota curinga para diagnosticar se alguma rota é carregada */}
        {/*<Route path="*" element={<PaginaNaoEncontrada />} />*/}
      </Routes>
    </Router>
  );
};
export default Rotas;