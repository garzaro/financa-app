import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useAuth} from "@/auth/useAuth.js";
import { InputText } from 'primereact/inputtext';
import { Menu } from 'primereact/menu';
import { PrimeIcons } from 'primereact/api';
import {Button} from "@/components/ui/button.jsx";
import UsuarioService from "../../app/service/usuarioService.js";
import {Link, useNavigate} from "react-router-dom";
import Hero from "@/components/landing/hero.jsx";

/*pagina inicial*/
function Home () {
  const navigate = useNavigate();

  const handleCreatelancamento = () => {
    navigate("/cadastrar-lancamento");
  };

  const handleDashboard = () => {
    navigate("/dashboard");
  };

  const anoAtual = new Date().getFullYear();

  return (
    <>
    <section className="relative pt-32 pb-20 md:pt-32 md:pb-44 bg-zinc-900 overflow-hidden ">

      {/** linha decorativa **/}
      <div className="absolute top-2 left-1 w-1 h-64 bg-blue-900 opacity-50 "></div>

      <div className="container mx-auto px-4">
        <div className="max-w-3xl ">

          {/** main heading **/}
          <p className="text-2xl md:text-3xl font-bold text-gray-300 mb-6 leading-tight">
            Seu controle financeiro começou!
            {/*<a href="https://chatgpt.com/c/69ad9629-6e38-8330-96a6-cad83bb7cab2">Autenticação</a>*/}
          </p>

          {/** subheading **/}
          <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl">
            Comece gerenciando seus lançamentos co inteligência. Segurança de ponta para controlar sua finança pessoal.
          </p>

          {/** CTA **/}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="bg-blue-950 border-zinc-600 border-r-2 hover:border-r-orange-400 hover:bg-blue-900
               text-zinc-100 transition-all duration-300 flex items-center gap-2 group rounded"
              onClick={ handleCreatelancamento }
            >
              Começar Agora
              <i className="bi bi-arrow-right w-4 h-4 group-hover:translate-x-6 transition-transform"></i>
            </Button>

            <Button
              size="lg"
              className="roundedbg-blue-950 border-zinc-600 border-r-2 hover:border-r-emerald-200 hover:bg-blue-900
               text-zinc-100 transition-all duration-300 flex items-center gap-2 group rounded"
              onClick={ handleDashboard }
            >
              Ver Demonstração
              <i className="bi bi-bar-chart w-4 h-4 group-hover:translate-x-6 transition-transform"></i>
            </Button>
          </div>

          {/*<div className="absolute center w-full h-1 opacity-25 right-32  bg-emerald-500"></div>*/}

          {/** indicadores confiaveis **/}
          <div className="mt-2 pt-24 ">
            <p className="text-sm text-gray-300 mb-4">
              Confiado por você e mais de [ x ] de usuários.
            </p>

            <div className="flex-row flex-wrap gap-8">

              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span className="text-sm text-gray-300"> Controle garantido. </span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span className="text-sm text-gray-300"> Cadastre lançamentos e acompanhe o progresso de seu patrimônio. </span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span className="text-sm text-gray-300"> Sem complicação. </span>
              </div>
             </div>
          </div>
        </div>
      </div>
      </section>

      {/** FOOTER **/}
      <footer className="absolute w-full py-6 bg-zinc-800 border-t border-gray-600 left-0 right-0
      text-center"
      >
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center
        text-sm text-gray-300"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-zinc-300">
                &copy; {new Date().getFullYear()} Controle Financeiro. Todos os direitos reservados.
                Desenvolvido por
                <Link to="https://github.com/garzaro" className="hover:text-zinc-800 text-decoration-none
                 transition-colors" target="_blank"
                >
                  &nbsp; Cleber Garzaro.
                </Link>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
export default Home;





/**
 * <div className="jumbotron ">
 *         <h1 className="display-5 text-zinc-500" >Olá, {apresentarUsuario.nome}! Seja bem-vindo(a) 👋</h1>
 *
 *         <p className="lead">Este é o seu sistema de finanças pessoais.</p>
 *
 *         {/*retorno do saldo*
}
*
<p className="lead">
  * Seu saldo para o mês atual é de R$ {saldo || '0,00'}.
  * </p>
* {/*retorno do saldo*
* <p className="lead">
  * Seu saldo pendente R$ {saldoPendente || '0,00'}. (implementar saldo pendente, ao salvar o padrao é
  * pendente)
  * </p>
*
* <hr className="my-4"/>
* <p>Essa é a sua área administrativa.</p>
* <div className="lead">
  * <a className="btn btn-primary btn-lg"
  *              href="https://www.geeksforgeeks.org/reactjs-usenavigate-hook/"
  * role="button"><i className="pi pi-users"></i> Cadastrar Usuário</a>
*
</div>
*
*
<div className="lead">
  * <Link className="nav-link" to="/">Login</Link>
  * </div>
*
* <div className="lead">
  * <a className="btn btn-danger btn-lg " role="button"><i
  *             className="pi pi-money-bill"> </i> Cadastrar Lançamento</a>
*
</div>
*       </div>
 * **/

