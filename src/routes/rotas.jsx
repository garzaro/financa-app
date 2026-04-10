import React from 'react';
// context manager
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import PublicLayout from "@/layout/publicLayout.jsx";
import LandingPage from "@/pages/home/landing-page.jsx";
import Login from "@/pages/login/login.jsx";
import CadastrarUsuario from "@/pages/cadastroUsuario/cadastrar-usuario.jsx";
import ProtectedRoute from "@/routes/protectedRoute.jsx";
import Home from "@/pages/home/home.jsx";
import ConsultarLancamento from "@/pages/lancamentos/consultar-lancamento.jsx";
import CadastrarLancamento from "@/pages/lancamentos/cadastrar-lancamento.jsx";
import {PageNotFound} from "@/routes/notFound.jsx";
import Dashboard from "@/pages/home/dashboard.jsx";
import CadastrarCriptomoeda from "@/pages/criptomoedas/cadastrar-criptomoeda.jsx";
import ConsultarCriptomoeda from "@/pages/criptomoedas/consultar-criptomoeda.jsx";
import PrivateLayout from "@/layout/privateLayout.jsx";
import {AuthProvider} from "@/auth/authProvider.jsx";
import Navbar from "@/components/template/navbar.jsx";
import RedefinirSenha from "@/pages/login/redefinir-senha.jsx";


/**
 * Todo-list
 * [] https://cloud.digitalocean.com/login - ideia para tela de login
 *
 * 🎯 Regra prática
 *
 * 🔐 Proteção de rota → Navigate
 *
 * 🖱️ Clique, submit, ação → useNavigate
 *
 * **/

const Rotas = () => {
  return (
    <AuthProvider>
      <Router>
        {/*<Navbar />*/}
        <Routes>

          {/* rotas públicas */}
          <Route
            path="/"
            element={
              <PublicLayout>
                <LandingPage />
              </PublicLayout>
          } />

          <Route path="/login" element={ <Login /> } />
          <Route path="/register" element={ <CadastrarUsuario /> } />
          <Route path="/redefinir-senha" element={ <RedefinirSenha /> } />

          {/* rotas privadas */}
          <Route
            path="/home"
            element={
            <ProtectedRoute >
              <PrivateLayout>
                <Home />
              </PrivateLayout>
            </ProtectedRoute>
          } />

          <Route
            path="/consultar-lancamento"
            element={
            <ProtectedRoute>
              <PrivateLayout>
                <ConsultarLancamento />
              </PrivateLayout>
            </ProtectedRoute >
          } />

          <Route
            path="/cadastrar-lancamento/:id?"
            element={
            <ProtectedRoute>
              <PrivateLayout>
                <CadastrarLancamento />
              </PrivateLayout>
            </ProtectedRoute>
          } />

          <Route
            path="/dashboard"
            element={
            <ProtectedRoute>
              <PrivateLayout>
                <Dashboard />
              </PrivateLayout>
            </ProtectedRoute>
          } />

          {/*<Route*/}
          {/*  path="/criptomoedas"*/}
          {/*  element={<Navigate to="/consultar-criptomoedas" replace />}*/}
          {/*/>*/}

          <Route
            path="/cadastrar-criptomoedas/:id?"
            element={
            <ProtectedRoute>
              <PrivateLayout>
                <CadastrarCriptomoeda />
              </PrivateLayout>
            </ProtectedRoute>
          } />

          <Route
            path="/consultar-criptomoedas"
            element={
            <ProtectedRoute>
              <PrivateLayout>
                <ConsultarCriptomoeda />
              </PrivateLayout>
            </ProtectedRoute>
          } />

          {/** 404 **/}
          <Route path="*" element={<PageNotFound />} />

        </Routes>
      </Router>
    </AuthProvider>
  );
};
export default Rotas;
