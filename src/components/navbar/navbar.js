import React from 'react';
import {Link} from 'react-router-dom';
import NavbarItem from "./navbarItem";

/*barra de navegação com os links*/
const Navbar = () => {
    return (
        <div className="navbar navbar-expand-lg navbar-dark bg-primary">{/*fixed-top*/}
            <div className="container-fluid">

                <Link className="navbar-brand" to="/">Financas</Link>

                {/*Em telas menores, a navbar geralmente se "contrai"
                 para um botão de filter (o "toggler", filter de hamburger)
                 */}
                <button className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation">

                    <span className="navbar-toggler-icon"></span>
                </button> {/*aria-control = navbarSupportedContent*/}

                <div className="collapse navbar-collapse" id="navbarNav">

                    <ul className="navbar-nav mx-5 me-5 mb-2 mb-lg-0 "> {/*me-auto mb-2 mb-lg-0*/}

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
                                    label: "Cadastrar",
                                    href: "/cadastrar"
                                },
                                {
                                    label: "Consultar",
                                    href: "/table-consultar"
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