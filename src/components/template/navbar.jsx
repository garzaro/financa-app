import React from 'react';
import {Link} from 'react-router-dom';
import NavbarItem from "./navbarItem.jsx";
import CadastrarLancamento from '../../pages/lancamentos/cadastrar-lancamentos.jsx';

const Navbar = () => {
  return (
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

          <ul className="navbar-nav mx-5 ">

            <NavbarItem
              id="home"
              href="/home"
              label="Home"
            />
            <NavbarItem
              id="lancamento"
              label="Lançamento"
              items={[
                {
                  label: "Cadastrar Lançamento",
                  href: "/cadastrar-lancamento",
                },
                {
                  label: "Consultar Lançamento",
                  href: "/consultar-lancamento"
                },
              ]}
            />
            <NavbarItem
              id="login"
              href="/login"
              label="Login"
            />

          </ul>
        </div>
      </div>
    </div>
  );
};
export default Navbar;