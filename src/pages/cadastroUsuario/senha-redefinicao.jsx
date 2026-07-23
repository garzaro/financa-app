import {useLocation} from "react-router-dom";

function RedefinirSenha() {
  const location = useLocation();
  const email = location.state?.email; // Recupera o email passado no redirecionamento

  return (
    <div>
      <h2>Defina sua senha</h2>
      <p>Cadastro para: {email}</p>
      <form>
        <input type="password" placeholder="Nova senha" required />
        <input type="password-confirm" placeholder="Confirme a senha" required />
        <div style={{ display: "flex", gap: "10px" }}>
          <button type="submit" className="btn btn-primary">
            Finalizar
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => window.history.back()}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default RedefinirSenha;