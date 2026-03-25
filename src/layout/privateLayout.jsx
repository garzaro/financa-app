import Navbar from "@/components/template/navbar.jsx";
import Footer from "@/components/landing/footer.jsx";
import {useContext} from "react";
import {AuthContext} from "@/auth/authContext.jsx";
import {Navigate, Outlet} from "react-router-dom";

/**
 * Rota Privada
 * **/

export default function PrivateLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="px-4 py-20 mt-12 items-center justify-center">
        { children }
        <Outlet />
      </main>
      {/*<Footer />*/}
    </>
  );
}