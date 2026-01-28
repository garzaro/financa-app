import React from "react";
import {Navigate, Outlet, useLocation} from 'react-router-dom';
import {LocalStorageService} from "../app/service/localStorageService.js";
// import AuthService from "../app/service/authService.js";

const storageLocal = LocalStorageService();

const isAuthenticated = () => {
  const usuario = storageLocal.obterItem('_usuario_logado')
  console.log("Mostrando ID do usuario logado", usuario);
    return !!usuario && Object.keys(usuario).length > 0;
}
const ProtectedRoute = () => {
  const location = useLocation(); /**escuta mudança de url**/
  // return AuthService ? <Outlet /> : <Navigate to='/login' replace />;
  return isAuthenticated() ? <Outlet /> : <Navigate to='/login' state={{from: location}} replace />;
}
export default ProtectedRoute;

/**
 * https://www.robinwieruch.de/react-router-private-routes/
 *
 * https://medium.com/@ravisharma23523/safeguard-your-react-app-implementing-secure-routing-with-react-router-2adf0299aaca
 *
 *
 * **/