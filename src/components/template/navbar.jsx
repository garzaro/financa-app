import React from 'react';
import {Link, Outlet, useNavigate} from 'react-router-dom';
import NavbarItem from "./navbarItem.jsx";
import CadastrarLancamento from '../../pages/lancamentos/cadastrar-lancamento.jsx';
import {AuthService} from "../../app/service/authService.js";


/**NAVEGACAO SPA**/
const Navbar = () => {

  const navigate = useNavigate();

  const deslogar = () => {
    const auth = AuthService();
    auth.removeAuthenticatedUser();
    navigate('/login');
  }

  return (
  <>
    <div className="navbar navbar-expand-lg navbar-dark bg-primary">{/*fixed-top*/}
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

            <NavbarItem id="home" label="Home" to="/home" />
            <NavbarItem id="lancamento" label="Lançamento" items={
              [
                { label: "Cadastrar Lançamento", to: "/cadastrar-lancamento",},
                { label: "Consultar Lançamento", to: "/consultar-lancamento"},
              ]}
            />
            <NavbarItem id="sair" to="/login"
              onClick={(e) => {
                e.preventDefault();
                deslogar();
              }
            }
              label="Sair"
            />
          </ul>
        </div>
      </div>
    </div>
    <Outlet/>
  </>
  );
};
export default Navbar;