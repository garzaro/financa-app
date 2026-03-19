import React from 'react';
// context manager
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import PublicLayout from "@/layout/publicLayout.jsx";
import LandingPage from "@/pages/home/landingPage.jsx";
import Login from "@/pages/login/login.jsx";
import CadastrarUsuario from "@/pages/cadastroUsuario/cadastrar-usuario.jsx";
import ProtectedRoute from "@/routes/protectedRoute.jsx";
import Home from "@/pages/home/home.jsx";
import ConsultarLancamento from "@/pages/lancamentos/consultar-lancamento.jsx";
import CadastrarLancamento from "@/pages/lancamentos/cadastrar-lancamento.jsx";
import {PageNotFound} from "@/components/feedback/notFound.jsx";
import Dashboard from "@/pages/home/dashboard.jsx";
import PrivateLayout from "@/layout/privateLayout.jsx";
import {AuthProvider} from "@/auth/authProvider.jsx";
import Navbar from "@/components/template/navbar.jsx";


/**
 * Todo-list
 * [] Implementar a rota padrao - landingpage - PARADO AQUI
 * [] Mobile navigation deve aparece os navItems = [Servico, Sobre, Contatos]
 * [] A tela de login deve mostrar o site que esta sendo acessado
 * [] https://cloud.digitalocean.com/login - ideia para tela de login
 *
 * 🎯 Regra prática
 *
 * 🔐 Proteção de rota → Navigate
 *
 * 🖱️ Clique, submit, ação → useNavigate
 *
 *
 * **/

const Rotas = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          {/* rotas públicas */}
          <Route
            path="/"
              element={
                <PublicLayout>
                  <LandingPage />
                </PublicLayout>
              }
            />
            <Route path="/login" element={ <Login /> } />
            <Route path="/register" element={ <CadastrarUsuario /> } />

          {/* rotas privadas */}
          <Route
            path="/home"
            element={
            <ProtectedRoute >
              <PrivateLayout>
                <Home />
              </PrivateLayout>
            </ProtectedRoute>
          }>

            {/*<Route path="/dashboard" element={<Dashboard />} />*/}

          </Route>

            <Route path="/home" element={<Home />} />
            <Route path="/consultar-lancamento" element={<ConsultarLancamento />} />
            <Route path="/cadastrar-lancamento/:id?" element={<CadastrarLancamento />} />


          {/*/!* 404 *!/*/}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
        </AuthProvider>

  );
};
export default Rotas;


// CONTINUAR COM A QUESTAO DE AO FAZER O LOGIN O HERO NAO ENTRA QUEM PRECISA APARECER É O DASHBOARD

//
// <Router>
//   <Routes>
//     {/*rotas publicas*/}
//
// <Route path="/" element={<LandingPage/>}/>
// <Route path="/login" element={<Login/>}/>
// <Route path="/register" element={<CadastrarUsuario/>}/>
//  {/*rotas protegidas - só mostra layout se tiver autenticado (Navbar)*/}
//  <Route element={<ProtectedRoute/>}>
//  <Route path="/home" element={<Home/>}/>
//  <Route path="/consultar-lancamento" element={<ConsultarLancamento/>}/>
//  <Route path="/cadastrar-lancamento/:id?" element={<CadastrarLancamento/>}/>
//  </Route>
//
//  {/* 404 * */}
//  <Route path="*" element={<PageNotFound/>}/>
// </Router>