import React from "react";
import {Navigate, Outlet, Route, useLocation} from 'react-router-dom';
import {LocalStorageService} from "../app/service/localStorageService.js";
import {AuthService} from "../app/service/authService.js";

const auth = AuthService();

function ProtectedRoute () {

  const location = useLocation ();
  const autenticado = auth.isAuthenticated();

  if (!autenticado) {
    return <Navigate to="/login" state={{from: location}}/>
  }
  return <Outlet location={location}/>
}
export default ProtectedRoute;