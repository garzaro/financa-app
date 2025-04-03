import React from "react";
import {Link} from "react-router-dom";

function NavbarItens({label, href}) {
    return (
        <li className="nav-item">
            <Link className="nav-link aria-current" to={href}>{label}</Link>
        </li>
    );
}
export default NavbarItens;