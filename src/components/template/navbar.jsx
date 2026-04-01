import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
// import { Menu, X } from 'lucide-react';
import NavbarItem from "@/components/template/navbarItem.jsx";
import {Button} from "@/components/ui/button.jsx";
import {useAuth} from "@/auth/useAuth.js";

/** NAVEGACAO SPA - HEADER **/
function Navbar () {
  const navigate = useNavigate();
  const { isAuthenticated, loggedUser, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Serviços', href: "#service" },
    { label: 'Sobre', href: "#about" },
    { label: 'Contato', href: "#contact" },
  ];

  const handleLogin = () => {
    setMobileMenuOpen(false);
    navigate("/login");
  }

  const handleLogout = () => {
    navigate("/landig-page", { replace: true });
    logout();
    setMobileMenuOpen(false);
  }

  return(
    <>
      {/*bootstrap fixed-top*/}
      <header className="fixed top-0 left-0 right-0 bg-zinc-900 border-b border-gray-500 z-50 ">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/** Logo **/}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-pink-900 to-pink-500 rounded-lg flex
            items-center justify-center "
            >
              <span className="text-zinc-200 font-bold text-lg " style={{ fontFamily: "Poppins" }}> FP </span>
            </div>
            <span className="text-zinc-400 font-bold text-xl " style={{ fontFamily: "Poppins" }}>
              Finança Pessoal
            </span>
          </div>

          {/** Desktop navigation **/}
          <nav className="hidden md:flex item-center gap-8 " style={{ fontFamily: "Poppins" }}>
            {/*mr-64*/}
            <ul className="flex items-center  px-4 mt-4 gap-12">
              {/*isLoggedIn*/}
              { isAuthenticated ? ( // está?
                <>
                <NavbarItem id="home" label="Home" to="/home" />
                <NavbarItem
                  id="lancamento"
                  label="Lancamento"
                  items={[
                    { label: "Cadastrar Lançamento", to: "/cadastrar-lancamento" },
                    { label: "Consultar Lançamento", to: "/consultar-lancamento" },
                    ]}
                  />
                <NavbarItem
                  id="criptomoedas"
                  label="Criptomoedas"
                  to="/consultar-criptomoedas"
                  items={[
                    { label: 'Cadastrar moedas', to: '/cadastrar-criptomoedas' },
                    { label: 'Consultar moedas', to: '/consultar-criptomoedas' },
                  ]}
                />
                </>
              ) : ( // senao está
                navItems.map(( item ) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="text-gray-600 hover:text-zinc-900 transition-colors duration-300
                    text-lg font-medium "
                  >
                    { item.label }
                  </a>
                ))
              )}
            </ul>
          </nav>

          {/** Desktop Login Button **/}
          <div className="hidden md:block">
            {/*isLoggedIn*/}
            { isAuthenticated ? (
              <div className="flex items-center gap-4">

                {/** USUARIO  LOGADO **/}
                <div className="flex items-center gap-2">
                  <div className="w-36 h-6 text-sm bg-linear-to-br from-zinc-900 to-pink-600 rounded-lg flex
                  items-center justify-center "
                  >
                    {/*<span className="text-zinc-200 font-bold text-sm " style={{ fontFamily: "Poppins" }}>*/}
                    {/*  { loggedUser && (*/}
                    {/*    <p className="flex items-center justify-center gap-1 text-sm mt-3">*/}
                    {/*      /!*Olá, <span className="capitalize"> { loggedUser.email }</span>*!/*/}
                    {/*      <span className="text-sm text-zinc-300"> { loggedUser.email }</span>*/}
                    {/*    </p>*/}
                    {/*  )}*/}
                    {/*</span>*/}
                    { loggedUser?.nome && (
                      <div>
                        <span>
                          { loggedUser.email }
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="border-gray-800 rounded text-gray-900 hover:bg-gray-500 "
                  style={{ fontFamily: "Poppins" }}
                  onClick={ handleLogout }
                >
                  Sair
                </Button>
              </div>
            ) : (
              <Button
                className="bg-zinc-100 hover:bg-zinc-300 rounded text-gray-900 transiton-colors duration-300 "
                style={{ fontFamily: "Poppins" }}
                onClick={ handleLogin }
              >
                Entrar
              </Button>
            )}
          </div>

          {/** Mobile Menu Button **/}
          <div className="md:hidden flex items-center">
            <button
              className="text=gray-700 focus:outline-none"
              onClick={() => setMobileMenuOpen( !mobileMenuOpen )}
            >
              { mobileMenuOpen ? (
                <span  className="text-4xl w-6 h-6 text-pink-700 ">&times;</span>
              ) : (
                <span className="text-2xl w-6 h-6 text-zinc-300 ">&#9776;</span>
                )}
            </button>
          </div>

        </div>

        {/** Mobile Navigation **/}
        { mobileMenuOpen && (
          <div className="md:hidden border-t  border-gray-500 bg-zinc-800">
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
              {/*{ !isLoggedIn && navItems.map((item) => (*/}
              {/*  <a*/}
              {/*    key={item.label}*/}
              {/*    href={item.href}*/}
              {/*    className="text-gray-600 hover:text-blue-900 transition-colors py-2 text-lg font-medium "*/}
              {/*    onClick={() => setMobileMenuOpen( false )}*/}
              {/*  >*/}
              {/*    {item.label}*/}
              {/*  </a>*/}
              {/*))}*/}

              <ul className="flex items-center  px-4 mt-4 gap-12">
                {/*isLoggedIn*/}
                { isAuthenticated ? (
                  <>
                    <NavbarItem id="home" label="Home" to="/home" />
                    <NavbarItem
                      id="lancamento"
                      label="Lancamento"
                      items={[
                        { label: "Cadastrar Lançamento", to: "/cadastrar-lancamento" },
                        { label: "Consultar Lançamento", to: "/consultar-lancamento" },
                      ]}
                    />
                    <NavbarItem
                      id="criptomoedas"
                      label="Criptomoedas"
                      to="/consultar-criptomoedas"
                      items={[
                        { label: 'Cadastrar moedas', to: '/cadastrar-criptomoedas' },
                        { label: 'Consultar moedas', to: '/consultar-criptomoedas' },
                      ]}
                    />
                  </>
                ) : (
                  navItems.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="text-gray-600 hover:text-zinc-900 transition-colors duration-300
                      text-lg font-medium "
                    >
                      {item.label}
                    </a>
                  ))
                )}
              </ul>
              {/*isLoggedIn*/}
              { isAuthenticated ? (
                <Button
                  variant="outline"
                  className="w-full border-gray-900 rounded text-gray-900 hover:bg-gray-500 mt-2 "
                  style={{ fontFamily: "Poppins" }}
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen( false );
                  }}
                >
                  Sair
                </Button>
              ) : (
                <Button
                  variant="outline"
                  className="w-full border-gray-900 rounded text-gray-900 hover:bg-gray-500 mt-2 "
                  style={{ fontFamily: "Poppins" }}
                  onClick={() => {
                    // window.location.toString.href = getLoginUrl();
                    navigate('/login');
                    setMobileMenuOpen( false );
                }}
                >
                  Entrar
                </Button>
              )}
            </nav>
          </div>
        )}
      </header>
    </>
  );
};
export default Navbar;

// {isLoggedIn && (
//   <div className="collapse navbar-collapse" id="navbarNav">
//     <ul className="navbar-nav mx-5">
//       <NavbarItem
//         id="lancamento"
//         label="Lancamento"
//         items={[
//           { label: "Cadastrar Lançamento", to: "/cadastrar-lancamento" },
//         ]}
//       />
//     </ul>
//   </div>
// )}
//
// {!isLoggedIn &&
// navItems.map((item) => (
//   <a
//     key={item.label}
//     href={item.href}
//     className="text-gray-600 hover:text-zinc-900 transition-colors duration-300 text-lg font-medium"
//   >
//     {item.label}
//   </a>
// ))}
