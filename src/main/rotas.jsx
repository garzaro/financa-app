import React from 'react';
// context manager
// import {BrowserRouter as Router, Navigate, Route, Routes, useLocation} from 'react-router-dom';
import {Navigate, Route, Routes, Outlet} from 'react-router-dom';

import Navbar from '../components/template/navbar.jsx';
import Home from '../pages/home.jsx';
import Login from '../pages/login/login.jsx';
import CadastrarUsuario from '../pages/cadastroUsuario/cadastrar-usuario.jsx';
import FormularioSenha from "../pages/cadastroUsuario/signupFormPassword.jsx";
import CadastrarLancamento from "../pages/lancamentos/cadastrar-lancamento.jsx";
import ConsultarLancamento from "../pages/lancamentos/consultar-lancamento.jsx";
import AtualizarLancamento from "../pages/lancamentos/atualizar-lancamento.jsx";
import {PageNotFound} from "../components/feedback/NotFound.jsx";
import ProtectedRoute from "./protectedRoute.jsx";


const AuthenticatedRoute = ProtectedRoute;

const Rotas = () => {
  return (
    <>
      {/*rotas publicas*/}
      <Routes>
        <Route path="/register" element={<CadastrarUsuario />} />
        <Route path="/login" element={<Login />} />

        {/*rotas protegidas - só mostra layout se tiver autenticado (Navbar)*/}
          <Route element={<AuthenticatedRoute/>}>
            <Route element={<Navbar />}>
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
