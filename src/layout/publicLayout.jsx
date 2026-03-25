import Navbar from "@/components/template/navbar.jsx";
import Footer from "@/components/landing/footer.jsx";
import {AuthService} from "@/app/service/authService.js";
import {Outlet} from "react-router-dom";



/**
 * Todo List
 * Situação	O que aparece dentro do <main>
 * [x] Usuário logado	Hero
 * [x] Navbar e Footer continuam fora da lógica.
 * [x] Usuário não logado - Hero + Service + About + Contact
 * [] Ver no navbar, quando for fazer login nao aparece Navbar e nem Footer
 * **/

export default function PublicLayout ({ children }) {

  return (
    <>
      {/** Navbar publica - pra mostrar navbar da propria loginpage**/}
      <Navbar />
      <main className="px-4 py-4 mt-12 items-center justify-center">
      { children }
      <Outlet />
      </main>
      <Footer />
    </>
  );
}

/**
 * Usado em:
 *
 * LandingPage *
 * Login
 * Register
 * **/