import {useState} from "react";
import {AuthService} from "../../app/service/authService.js";
import {Button} from "@/components/ui/button.jsx";
import {Menubar} from "@/components/ui/menubar.jsx";
import { Menu, X } from "lucide-react";
import {Link} from "react-router-dom";


/**
 * To-do List
 * Header Component - Minimalismo Corporativo
 * - Navegação limpa e clara
 * - Botão "Entrar" no canto superior direito
 * - Menu responsivo para mobile
 * - Tipografia Poppins para logo
 * - Integração com autenticação Manus OAuth
 */



export default function Header({mano}){
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const useAuth = AuthService();
  const {user, isAuthenticated, logout} = useAuth;

  // MANO CONTINUAR COM O HEADER DA LANDING PAGE VER PROJETO MANUS - TERMINEI O HEADER - ESTE HEADER PRECISO VER
  // A IMPLEMENTAÇÃO DE PARTE DELE NA MINHA TELA HOME PORQUE NO MOMENTO ELE ESTA NA PAGINALOGA AI ESTA ESTATICO

  const navItems = [
    {label: "Serviços", href: "#services"},
    {label: "Sobre", href: "#about"},
    {label: "Contatos", href: "#contact"},
  ];

  /**
   * Classe adiconais
   * navbar navbar-expand-lg navbar-dark bg-dark
   * **/
  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-100 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center  justify-between">
        {/*logo*/}
        <div className="flex items-center gap-2">

          {/*ver a questao do gradiente depois - from-blue e linear*/}
          <div className="w-10 h-10 bg-linear-to-br from-blue-900 to-blue-700 rounded-lg flex items-center justify-center">
            {/*text-6xl text-gray-300*/}
            <span
              className="text-zinc-200 border border-zinc-500 bg-zinc-100 font-semibold text-lg
              [text-shadow:-1px_-1px_1px_rgba(0,0,0,0.4),1px_1px_1px_rgba(255,255,255,0.8)]"
            >
              Financas Pessoais
            </span>
          </div>
          <span className="font-bold text-xl text-gray-900" style={{ fontFamily: "Poppins"}}>
            Finança
          </span>
        </div>

        {/* desktop - navegacao
        classes adiconais navbar navbar-expand-lg navbar-dark bg-dark
        */}
        <nav className="hidden md:flex items-center gap-8">
          { navItems.map((item) => (
            <Link
              key={item.label} to={item.to}
                  // bootstrap = text-decoration-none
                  className="text-gray-600 hover:text-blue-900 transition-colors duration-300
                  text-md text-decoration-none font-medium"
            >
              {item.label}
            </Link>
          ))}

        </nav>

        {/*desktop - botao de login*/}
        <div className="hidden md:block">
          { isAuthenticated ? (
            <div className="flex items-center gap-4">
              {/*acho que devo ir buscar la do usuario_logado*/}
              <span className="text-sm text-gray-600">E aí Mano, aqui voce vai entrar automatico {user?.name}</span>
              <Button
                variant="outline"
                className="border-gray-300 text-gray-900 transition-colors duration-300 hover:bg-gray-100"
                onClick={() => logout()}
              >
                SAIR
              </Button>
            </div>
          ) : (
            <Button
              className="bg-blue-900 hover:bg-blue-800 text-zinc-200 transition-colors duration-300"
              onClick={() => (window.location.href = getLoginUrl())}
            >
            ENTRAR
            </Button>
          )}
      </div>

      {/*Mobile - botao menu*/}
        <Button
          className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          { mobileMenuOpen ? (
            <X className="w-6 h-6 text-gray-900 transition-colors duration-300 hover:bg-gray-100"/>
          ):(
            <Menu className="w-6 h-6 text-gray-900 transition-colors duration-300 hover:bg-gray-100"/>
            )}
        </Button>
      </div>

      {/*Mobile - navegacao*/}
      { mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white ">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
            { navItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="text-gray-600 hover:text-blue-900 transition-colors py-2 text-sm
                font-medium duration-300 hover:bg-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            { isAuthenticated ? (
              <Button
                variant="default"
                className="w-full border-gray-300 text-gray-200 transition-colors duration-300 hover:bg-gray-100
                 mt-2"
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
              >
                SAIR
              </Button>
            ):(
              <Button
                className="w-full bg-blue-900 hover:bg-blue-800 text-white mt-2"
                onClick={() => {
                  window.location.href = getLoginUrl();
                  setMobileMenuOpen(false);
                }}
              >
              ENTRAR
              </Button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}