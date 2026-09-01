import {Navigate} from "react-router-dom";
import {useAuth} from "@/auth/useAuth.js";
import PanoDeFundo from "@/components/feedback/loader.jsx";

/**
 * Guard de rotas privadas.
 *
 * Regras (contracts/route-guard-contract.md):
 *  1. Se isLoading === true: exibe loading e não redireciona.
 *  2. Se isLoading === false e isAuthenticated === true: renderiza filhos.
 *  3. Se isLoading === false e isAuthenticated === false: redireciona para /sign-in.
 **/
export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <PanoDeFundo
        open={true}
        color="inherit"
        titulo="Carregando"
        mensagem="Verificando sua sessão, aguarde..."
      />
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }

  return children;
}

