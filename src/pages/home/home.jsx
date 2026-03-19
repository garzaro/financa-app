import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useAuth} from "@/auth/useAuth.js";

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Menu } from 'primereact/menu';
import { PrimeIcons } from 'primereact/api';

import UsuarioService from "../../app/service/usuarioService.js";
import {Link, useNavigate} from "react-router-dom";
import Hero from "@/components/landing/hero.jsx";

/**
 * to-do list
 * [] Trazer saldo
 * [] Trazer outros servicos para dashboard - buscar outras informações
 *
 * **/

/*pagina inicial*/
function Home () {

  /**
   * @param saldoServico é a composicao - em componente de classe
   * seria feito um extends do servico e depois o construtor para
   * instanciar o servico.
   * @param service = new UsuarioService();
   * */
    //const { saldo, loading, erro } = useSaldo();
  const { loggedUser } = useAuth();
  const saldoServico = UsuarioService();
  const [saldo, setSaldo] = useState(0);
  const [saldoPendente, setSaldoPendente] = useState(0);
  const navigate = useNavigate();

  /**
   * retornar o saldo do usuario logado
   * */
  useEffect(() => {
    const buscarSaldo = () => {
      if (!loggedUser || !loggedUser.id) return;

      console.log('Usuario recuperado do contexto', loggedUser);
      saldoServico.buscarSaldoPorUsuario(loggedUser.id)
        .then(respondeAiManoBanco => {
          setSaldo(respondeAiManoBanco.data);
        })
        .catch(error => {
          console.log(error);
        })
    }
    buscarSaldo();
  }, [loggedUser, saldoServico]);

  function capitalizar(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-32 relative overflow-hidden ">

      {/** linha decorativa **/}
      <div className="absolute top-20 letf-0 w-1 h-32 bg-blue-900 opacity-50 "></div>

      <div className="container justify-center items-center mx-auto px-4">
        <div className="max-w-3xl ">

          {/** main heading **/}
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 leading-tight">
            PAGINA EM DESENVOLVIMENTO
            src
            ├── auth
            │    ├── AuthContext.jsx
            │    ├── AuthProvider.jsx
            │    └── ProtectedRoute.jsx
            │
            ├── services
            │    └── authService.js
            │
            ├── pages
            │    ├── Login.jsx
            │    ├── Home.jsx
            │    └── Dashboard.jsx
            │
            ├── components
            │    └── Navbar.jsx
            │
            └── App.jsx
            <a href="https://chatgpt.com/c/69ad9629-6e38-8330-96a6-cad83bb7cab2">Autenticação</a>
          </h1>
        </div>
      </div>

      {/** elementos decorativos **/}
      <div></div>

    </section>
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

