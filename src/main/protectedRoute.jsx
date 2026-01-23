import React from "react";
import {Navigate, Outlet} from 'react-router-dom';
import {LocalStorageService} from "../app/service/localStorageService.jsx";

const storageLocal = LocalStorageService();

const isAuthenticated = () => {
    return !!storageLocal.obterItem('_usuario_logado');
}
const ProtectedRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to='/login' replace />;
}
export default ProtectedRoute;