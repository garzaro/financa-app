import React from 'react';
// context manager
// import {BrowserRouter as Router, Navigate, Route, Routes, useLocation} from 'react-router-dom';
import {Navigate, Route, Routes, Outlet} from 'react-router-dom';

import Navbar from '../components/template/navbar.jsx';
import Home from '../pages/home.jsx';
import Login from '../pages/login.jsx';
import Register from '../pages/cadastroUsuario/register.jsx';
import FormularioSenha from "../pages/cadastroUsuario/signupFormPassword.jsx";
import CadastrarLancamento from "../pages/lancamentos/cadastrar-lancamento.jsx";
import ConsultarLancamento from "../pages/lancamentos/consultar-lancamento.jsx";
import AtualizarLancamento from "../pages/lancamentos/atualizar-lancamento.jsx";
import {PageNotFound} from "../components/notfound/NotFound.jsx";
import RotaAutenticada from "./protectedRoute.jsx";
import ProtectedRoute from "./protectedRoute.jsx";

/**
 * TO-LIST
 * [x] Fazer o 404 quando nao encontrar a rota - fazer alguma coisa de tela
 * [x] Rotas aninhadas e Outlet
 * [x] Criar rotas customizadas
 * [x] Verificar se o usuario esta autenticado
 * [x] Usar Outlet para renderizar rotas filhas
 * [] https://www.youtube.com/watch?v=rvS-TdtM8Ak&t=3045s
 * [x] Segurança: informações sensíveis ficam protegidas, e ações críticas só podem ser executadas por quem tem permissão.
 * [] Controle de acesso: é possível definir diferentes níveis de acesso. Por exemplo, um administrador vê mais opções que um usuário comum.
 * [] Experiência do usuário: você guia cada pessoa de forma lógica, mostrando apenas o que faz sentido para o status dela (logada ou não), evitando confusão.
 * **/

const AuthenticatedRoute = ProtectedRoute();
const Rotas = () => {
  return (
    // <Router>
    <>
      <Navbar />
      {/*isso aqui é um if de rotas publicas*/}
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/*rotas protegidas*/}
        <Route element={<ProtectedRoute/>}>
          <Route path="/home" element={<Home />} />
          <Route path="/consultar-lancamento" element={<ConsultarLancamento />} />
          <Route path="/cadastrar-lancamento/:id?" element={<CadastrarLancamento />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<PageNotFound />} />

        {/*<RotaAutenticada path="/signupFormPassword" element={<FormularioSenha />} />*/}
        {/* Adicionar uma rota curinga para diagnosticar se alguma rota é carregada */}
      </Routes>
    </>
    // </Router>
  );
};
export default Rotas;
