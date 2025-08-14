import React, {useEffect, useState} from 'react';
import axios from "axios";
//import {useSaldo} from "../app/service/useSaldo";

import UsuarioService from "../app/service/usuarioService";
import {LocalStorageService} from "../app/service/localStorageService";

/*pagina inicial*/
function Home () {
    /*aqui é feito a composicao - em componente de classe seria feito um extends - heranca - destructure*/
    //const { saldo, loading, erro } = useSaldo();
    const saldoServico = UsuarioService();
    const storageRecuperado = LocalStorageService();
    const [saldo, setSaldo] = useState(0);

    useEffect(() => {
        const buscarSaldo = () => {
          const usuario = storageRecuperado.obterItem('_usuario_logado');
          axios.get(`http://localhost:8080/api/usuarios/${usuario.id}/saldo`)
          console.log('Usuario recuperado do localStorage do login', usuario);
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
                <h1 className="display-5">Bem-vindo à Página Inicial!!!</h1>
                <p className="lead">Este é o seu sistema de finanças pessoais.</p>

                {/*retorno do saldo*/}
                <p className="lead">
                    Seu saldo para o mês atual é de R$ {saldo || '0,00'}.
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