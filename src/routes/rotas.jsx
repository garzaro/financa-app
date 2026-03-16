import React from 'react';
// context manager
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import PublicLayout from "@/layout/publicLayout.jsx";
import LandingPage from "@/pages/home/landingPage.jsx";
import Login from "@/pages/login/login.jsx";
import CadastrarUsuario from "@/pages/cadastroUsuario/cadastrar-usuario.jsx";
import ProtectedRoute from "@/routes/protectedRoute.jsx";
import {AuthProvider} from "@/auth/authContext.jsx";
import Home from "@/pages/home/home.jsx";
import ConsultarLancamento from "@/pages/lancamentos/consultar-lancamento.jsx";
import CadastrarLancamento from "@/pages/lancamentos/cadastrar-lancamento.jsx";
import {PageNotFound} from "@/components/feedback/notFound.jsx";
import Dashboard from "@/pages/home/dashboard.jsx";
import PrivateLayout from "@/layout/privateLayout.jsx";


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
    <>
      <Router>
        <AuthProvider>
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
          <Route element={<PrivateLayout />}>

            <Route path="/dashboard" element={<Dashboard />} />

          </Route>
          {/*/!** ROTA PUBLICA **!/*/}
          {/*<Route path="/" element={*/}
          {/*  <PublicLayout>*/}
          {/*    <LandingPage />*/}
          {/*  </PublicLayout>*/}
          {/*  }*/}
          {/*/>*/}
          {/*<Route path="/login" element={ <Login /> } />*/}

          {/*/!** ROTA PROTEGIDA **!/*/}
          {/*<Route path="/dashboard" element={*/}
          {/*  <ProtectedRoute>*/}
          {/*    <Dashboard />*/}
          {/*  </ProtectedRoute>*/}
          {/*}*/}
          {/*/>*/}

          {/*  <Route path="/home" element={<Home />} />*/}
          {/*  <Route path="/consultar-lancamento" element={<ConsultarLancamento />} />*/}
          {/*  <Route path="/cadastrar-lancamento/:id?" element={<CadastrarLancamento />} />*/}


          {/*/!* 404 *!/*/}
          {/*<Route path="*" element={<PageNotFound />} />*/}


         {/******************************************************/}
         {/* /!* rotas públicas *!/*/}
         {/* <Route element={<PublicLayout />}>*/}

         {/*   <Route path="/" element={<LandingPage />} />*/}
         {/*   <Route path="/login" element={<Login />} />*/}

         {/* </Route>*/}

         {/* /!* rotas privadas *!/*/}
         {/* <Route element={<PrivateLayout />}>*/}

         {/*   <Route path="/dashboard" element={<Dashboard />} />*/}

         {/* </Route>*/}



        </Routes>
        </AuthProvider>
      </Router>
    </>
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