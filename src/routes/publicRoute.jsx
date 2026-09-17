import {Navigate} from "react-router-dom";
import {useAuth} from "@/auth/useAuth.js";

/**cara deixa pra la nem fala**/

export default function PublicRoute({ children }) {

  const { isAuthenticated } = useAuth();

  if ( isAuthenticated ) {
    return <Navigate to="/home" replace />;
  }
  return children;
}