import React, {useEffect, useState} from 'react';
import axios from "axios";
//import {useSaldo} from "../app/service/useSaldo";

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Menu } from 'primereact/menu';
import { PrimeIcons } from 'primereact/api';

import UsuarioService from "../app/service/usuarioService.jsx";
import {LocalStorageService} from "../app/service/localStorageService.jsx";
import {Link, useNavigate} from "react-router-dom";

/**
 * to-do list
 * [] Trazer saldo
 * Trazer outros servicos para dashboard -buscar outras informações
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
  const saldoServico = UsuarioService();
  const storageRecuperado = LocalStorageService();
  const apresentarUsuario = storageRecuperado.obterItem('_usuario_logado');
  const [saldo, setSaldo] = useState(0);
  const [saldoPendente, setSaldoPendente] = useState(0);
  const navigate = useNavigate();

  /**
   * retornar o saldo do usuario logado
   * */
  useEffect(() => {
    const buscarSaldo = () => {
      const usuario = storageRecuperado.obterItem('_usuario_logado');
      console.log('Usuario recuperado do localStorage', usuario);
      const retornoSaldo = saldoServico.buscarSaldoPorUsuario(usuario.id)
        .then(respondeAiManoBanco => {
          setSaldo(respondeAiManoBanco.data);
        })
        .catch(error => {
          console.log(error);
        })
    }
    // buscarSaldo();
  },[]);

  function capitalizar(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <div className="container ">
      <div className="jumbotron ">
        <h1 className="display-5 text-dark" >Olá, {apresentarUsuario.nome}! Seja bem-vindo(a) 👋</h1>

        <p className="lead">Este é o seu sistema de finanças pessoais.</p>

        {/*retorno do saldo*/}
        <p className="lead">
          Seu saldo para o mês atual é de R$ {saldo || '0,00'}.
        </p>
        {/*retorno do saldo*/}
        <p className="lead">
          Seu saldo pendente R$ {saldoPendente || '0,00'}. (implementar saldo pendente, ao salvar o padrao é
          pendente)
        </p>

        <hr className="my-4"/>
        <p>Essa é a sua área administrativa.</p>
        <p className="lead">
          <a className="btn btn-primary btn-lg"
             href="https://www.geeksforgeeks.org/reactjs-usenavigate-hook/"
             role="button"><i className="fa fa-users"></i>Cadastrar Usuário</a>

          <Link className="nav-link" to="/">Login</Link>

          <a className="btn btn-danger btn-lg " role="button"><i
            className="fa fa-users"></i> Cadastrar Lançamento</a>
        </p>
      </div>
    </div>
  );
};

export default Home;

/**
 * ideia para posteriormente quando for declarado o estado de atualizar estado
 * const [saldo, setSaldo] = useState(0);
 * const saldoServico = UsuarioService();
 * const lancamentoServico = LancamentoService();
 *
 * // Carrega saldo ao montar a tela
 * useEffect(() => {
 *     buscarSaldo();
 * }, []);
 *
 * const buscarSaldo = () => {
 *     saldoServico.buscarSaldoPorUsuario()
 *         .then(response => setSaldo(response.data))
 *         .catch(console.log);
 * };
 *
 * const criarLancamento = (lancamento) => {
 *     lancamentoServico.criar(lancamento)
 *         .then(() => {
 *             buscarSaldo(); // <-- aqui atualiza saldo com valor real do backend
 *         })
 *         .catch(console.log);
 * };
 * */

/**
 * <div>
 *       {usuario ? (
 *         <h1>Olá, {usuario.nome}! Seja bem-vindo 👋</h1>
 *       ) : (
 *         <h1>Bem-vindo ao sistema</h1>
 *       )}
 *     </div>
 * home*/;