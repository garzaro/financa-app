import React, {useEffect, useState} from 'react';
import axios from "axios";
//import {useSaldo} from "../app/service/useSaldo";

import UsuarioService from "../app/service/usuarioService";
import {LocalStorageService} from "../app/service/localStorageService";

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
          buscarSaldo();
    },[]);

  return (
        <div className="container ">
            <div className="jumbotron ">
                <h1 className="display-5">Olá, {apresentarUsuario.nome}! Seja bem-vindo(a) 👋</h1>

                <p className="lead">Este é o seu sistema de finanças pessoais.</p>

                {/*retorno do saldo*/}
                <p className="lead">
                    Seu saldo para o mês atual é de R$ {saldo || '0,00'}.
                </p>

                {/*retorno do saldo*/}
                <p className="lead">
                    Seu saldo pendente R$ {saldo || '0,00'}.
                </p>

                <hr className="my-4"/>
                <p>Essa é a sua área administrativa.</p>
                <p className="lead">
                    <a className="btn btn-primary btn-lg"
                       href="https://www.geeksforgeeks.org/reactjs-usenavigate-hook/"
                       role="button"><i className="fa fa-users"></i>Cadastrar Usuário</a>
                    <a className="btn btn-danger btn-lg " href="https://bootswatch.com/flatly/#" role="button"><i
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
 * */