import React from "react";
import { Navigate } from "react-router-dom";
/*redireciona para home se nao estiver logado*/
function PrivateRoute({ user, children }) {
    return user ? children : <Navigate to="/home" replace/>;
}
export default PrivateRoute;




