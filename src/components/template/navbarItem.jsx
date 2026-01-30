import React from "react";
// import {Link} from "react-router-dom"; to={item.href}
import {Link, Outlet} from 'react-router-dom';

const NavbarItem = ({label, to, id, items, onClick}) => {

  const hasChildren = items && items.length > 0;

  if (hasChildren) {
    return (
      <li className="dropdown">
        <Link
          className="nav-link dropdown-toggle"
          to={to}
          id={id}
          // onClick={onClick}
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          /**para evitar scroll ao top*/
          // onClick={(e) => e.preventDefault()}
        >
          {label}
        </Link>
        <ul className="dropdown-menu bg-primary border-primary-subtle" aria-labelledby={id}>

          {items.map((item, i) => (
            <li key={i}>
              <Link
                className="text-white link-success bg-opacity-50 dropdown-item" underline="none"
                to={item.to}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </li>
    );
  }
  return (
    <li className="navbar-item">
      <Link
        className="nav-link aria-current text-decoration-none"
        to={to}
        onClick={onClick}
      >
        {label}
      </Link>
    </li>
  );
}
export default NavbarItem;







/**
 * key={item.id}>
 * Porque o risco de "chaves trocadas" só aparece quando:
 *
 * você insere no meio da lista,
 *
 * ou reordena os itens.
 *
 * // Se eu adiciono "X" no começo, o index muda:
 * setItems(["X", "A", "B", "C"]);
 *
 * usando dessa forma evita bug em listas
 * **/
// <ul className="dropdown-filter" aria-labelledby={id}>
//     {/**cada item é um objeto do array, index é a posição dele*/}
//     {items.map((item) => (
//         <li key={item.id}> ou item.href
//             <Link to={item.href}>
//                 {item.label}
//             </Link>
//         </li>
//
//     ))}
// </ul>