import React from "react";
import {Navigate, Outlet, Route, useLocation} from 'react-router-dom';
import {LocalStorageService} from "../app/service/localStorageService.js";

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