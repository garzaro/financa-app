import React from "react";
import {Navigate, Outlet, Route, useLocation} from 'react-router-dom';
import {LocalStorageService} from "../app/service/localStorageService.js";
// import AuthService from "../app/service/authService.js";

const storageLocal = LocalStorageService();

const isAuthenticated = () => {
  const usuarioLogado = storageLocal.obterItem('_usuario_logado');
  return !!usuarioLogado && Object.keys(usuarioLogado).length > 0;
}

function ProtectedRoute () {
  const location = useLocation ();
  const autenticado = isAuthenticated();

  if (!autenticado) {
    return <Navigate to="/login" state={{from: location}}/>
  }
  return <Outlet location={location}/>
}
export default ProtectedRoute;





/**
 * https://www.robinwieruch.de/react-router-private-routes/
 *
 * https://medium.com/@ravisharma23523/safeguard-your-react-app-implementing-secure-routing-with-react-router-2adf0299aaca
 ***/

/**
 *
 * const isAuthenticated = () => {
 *   const usuario = storageLocal.obterItem('_usuario_logado')
 *    /** !! (double bang) para converter o objeto usuario em um valor booleano puro.**
 *     return !!usuario && Object.keys(usuario).length > 0;
 * }
 * const ProtectedRoute = () => {
 *   const location = useLocation(); /**escuta mudança de url**
 *    //return AuthService ? <Outlet /> : <Navigate to='/login' replace />;
 *  return isAuthenticated () ? <Outlet/> : <Navigate to='/login' state={{from: location}} replace/>;
 *}
 * export default ProtectedRoute;
 *
 * **/