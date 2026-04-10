import {useContext} from "react";
import {Navigate} from "react-router-dom";


export default function PublicRoute({ children }) {

  const { isAuthenticated } = useContext( AuthContext );

  if ( isAuthenticated ) {
    return <Navigate to="/home" replace />;
  }
  return children;
}