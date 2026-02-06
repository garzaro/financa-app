import React from 'react';
// context manager
import {BrowserRouter as Router, Navigate, Route, Routes, useLocation, Outlet} from 'react-router-dom';
import {} from 'react-router-dom';
import Navbar from '../components/template/navbar.jsx';
import Home from '../pages/home/Home.jsx';
import Login from '../pages/login/Login.jsx';
import CadastrarUsuario from '../pages/cadastroUsuario/Cadastrar-usuario.jsx';
import FormularioSenha from "../pages/cadastroUsuario/SignupFormPassword.jsx";
import CadastrarLancamento from "../pages/lancamentos/Cadastrar-lancamento.jsx";
import ConsultarLancamento from "../pages/lancamentos/Consultar-lancamento.jsx";
import AtualizarLancamento from "../pages/lancamentos/Atualizar-lancamento.jsx";
import {PageNotFound} from "../components/feedback/notFound.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
// // import Header from "../components/template/header.jsx";


const Rotas = () => {
  return (
    <>
      <Routes>
        {/*<Route path="/" element={<Header />} />*/}
        {/*rotas publicas*/}
        <Route element={<Navbar />}>
          {/*rotas publicas*/}
          <Route path="/register" element={<CadastrarUsuario />} />
          <Route path="/login" element={<Login />} />

          {/*rotas protegidas - só mostra layout se tiver autenticado (Navbar)*/}
          <Route element={<ProtectedRoute/>}>
            <Route path="/home" element={<Home />} />
            <Route path="/consultar-lancamento" element={<ConsultarLancamento />} />
            <Route path="/cadastrar-lancamento/:id?" element={<CadastrarLancamento />} />
          </Route>
        </Route>
        {/* 404 */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};
export default Rotas;
