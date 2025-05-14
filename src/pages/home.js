import React, {useEffect, useState} from 'react';
import {useSaldo} from "../app/service/useSaldo";
import {LocalStorageService} from "../app/service/localStorageService";
/*pagina inicial*/
function Home () {
    /*aqui é feito a composicao - em componente de classe seria feito um extends - heranca - destructure*/
    const { saldo, loading, erro } = useSaldo();

    return (
        <div className="container ">
            <div className="jumbotron ">
                <h1 className="display-5">Bem-vindo à Página Inicial!!!</h1>
                <p className="lead">Este é o seu sistema de finanças pessoais.</p>

                {/*retorno do saldo*/}
                <p className="lead">
                    Seu saldo para o mês atual é de {saldo !== null ? `R$ ${saldo}` : `indisponivel`}.
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