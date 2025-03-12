import React from 'react';
import { Link } from 'react-router-dom';

/*barra de navegação com os links*/
const Navbar = () => {
    return (
        <div className="navbar navbar-expand-lg navbar-dark bg-primary">{/*fixed-top*/}
            <div className="container-fluid">

                <Link className="navbar-brand" to="/">Financas</Link>

                {/*Em telas menores, a navbar geralmente se "contrai"
                 para um botão de menu (o "toggler", menu de hamburger)
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

                    <ul className="navbar-nav mx-5 me-auto mb-2 mb-lg-0 "> {/*me-auto mb-2 mb-lg-0*/}

                        <li className="nav-item">
                            <Link className="nav-link" to="/home">Home</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">Cadastro</Link>

                        </li>
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default Navbar;