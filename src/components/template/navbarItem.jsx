import React from "react";
// import {Link} from "react-router-dom"; to={item.href}
import Link from '@mui/material/Link';

function NavbarItem({label, href, id, items}) {

  const hasChildren = items && items.length > 0;
  if (hasChildren) {
    return (
      <div>
        <li className="dropdown">
          <a
            className="nav-link dropdown-toggle"
            href={href}
            id={id}
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            /**para evitar scroll ao top*/
            onClick={(e) => e.preventDefault()}
          >
            {label}
          </a>
          <ul className="dropdown-menu bg-primary border-primary-subtle" aria-labelledby={id}>

            {items.map((item, i) => (
              <li key={i}>
                <Link href={item.href} className="text-white link-success bg-opacity-50 dropdown-item" underline="none">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </li>

      </div>
    );
  }
  return (
    <Link
      className="nav-link aria-current text-decoration-none" href={href}>
      {label}
    </Link>
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