import React, {useEffect, useState} from 'react';
import {Link, Outlet, useLocation, useNavigate} from 'react-router-dom';
import NavbarItem from "./navbarItem.jsx";
import CadastrarLancamento from '../../pages/lancamentos/Cadastrar-lancamento.jsx';
import {AuthService} from "../../app/service/authService.js";

/**
 * TO-DO List
 * [] Landing page
 * [] Justify between no botao Entrar
 * []
 * **/

/**NAVEGACAO SPA**/
const Navbar = () => {
  // manus
  // const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const auth = AuthService();

  // manus
  // const {user, isAuthenticated, logout} = auth;

  const navigate = useNavigate();
  /**detecta estado de mudanca - Hook que detecta mudança de URL**/
  const location = useLocation();
  const [isLogged, setIsLogged] = React.useState(auth.isAuthenticated());

  /**a cada mudanca de rota o navbar checa o storage**/
  useEffect(() => {
    setIsLogged(auth.isAuthenticated());
  }, [ location ]);

  const deslogar = () => {
    auth.removeAuthenticatedUser();
    setIsLogged( false ); /**atualiza o estado na hora**/
    navigate('/login');
  }

  return (
  <>
    <div className="fixed top-0 left-0 right-0 navbar navbar-expand-lg navbar-dark bg-primary">{/*fixed-top*/}
      <div className="container-fluid ">

        <Link className="navbar-brand" to="/">Financas</Link>

        <button className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation">

          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse " id="navbarNav">

          <ul className="navbar-nav mx-5">

            { isLogged ? (
              <>
                <NavbarItem id="home" label="Home" to="/home" />
                <NavbarItem id="lancamento" label="Lançamento" items={
                  [
                    { label: "Cadastrar Lançamento", to: "/cadastrar-lancamento",},
                    { label: "Consultar Lançamento", to: "/consultar-lancamento"},
                  ]}
                />
                <NavbarItem id="sair" label="Sair" to="/login" onClick={(e) => {
                  e.preventDefault();
                  deslogar();
                 }}
                />
              </>
              ) : <NavbarItem id="login" label="Entrar" to="/login" onClick={(e) => {}} />
            }

          </ul>
        </div>
      </div>
    </div>
    <Outlet/>
  </>
  );
};
export default Navbar;


/**
 *
 * {isLogado ? (
 *                 <>
 *                   <NavbarItem id="home" label="Home" to="/home" />
 *                   <NavbarItem id="lancamento" label="Lançamento" items={[...]} />
 *                   <NavbarItem
 *                     id="sair"
 *                     label="Sair"
 *                     to="/login"
 *                     onClick={(e) => { e.preventDefault(); deslogar(); }}
 *                   />
 *                 </>
 *               ) : (
 *                 <NavbarItem id="login" label="Entrar" to="/login" />
 *               )}
 *
 * **/