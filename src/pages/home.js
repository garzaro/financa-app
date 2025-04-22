import React, {useEffect, useState} from 'react';
import axios from "axios";

/*pagina inicial*/
function Home () {
    const [saldo, setSaldo] = useState(0);
    const [erros, setErros] = useState('');

    /*useEffect(() => {
        const retonarSaldo = async () => {
            try {
                /*usar crase no endpoint
                const response = await axios
                    .get(`http://localhost:3000/api/usuarios/${usuarioLogadoObjeto.id}/saldo`)
                /*
                .then((res) => {
                setSaldo(res.data);
                })
            }
            /*recurando o usuario logado
            const usuarioLogadoString = localStorage.getItem('_usuario_logado');
            /*transformando string em objeto
            const usuarioLogadoObjeto = JSON.parse(usuarioLogadoString);
            console.log(usuarioLogadoObjeto);

       }*/
        useEffect(() => {
            const fetchSaldo = async () => {
                try {
                    /*recuperando o usuario logado - transformado de obj para string no login*/
                    const stringUsuarioLogado = localStorage.getItem('_usuario_logado');
                    console.log('Recuperando o usuario string', stringUsuarioLogado);
                    /*tranformando a string em objeto*/
                    const objetoUsuarioLogado = JSON.parse(stringUsuarioLogado);
                    console.log(objetoUsuarioLogado);
                    /*usar crase no endpoint*/
                    const response = await axios.get(
                        `http://localhost:3000/api/usuarios/${objetoUsuarioLogado.id}/saldo`
                    );
                    setSaldo(response.data);
                }catch(err) {
                    console.log(err);
                    setErros(err);
                }
            };
            fetchSaldo();
        }, []); /*vai executar uma vez só - ciclo de vida*/



    return (
        <div className="container ">
            <div className="jumbotron ">
                <h1 className="display-5">Bem-vindo à Página Inicial!!!</h1>
                <p className="lead">Este é o seu sistema de finanças pessoais.</p>
                <p className="lead">Seu saldo para o mes atual é de R$ {saldo}.</p>
                <hr className="my-4"/>
                <p>Essa é a sua área administrativa.</p>
                <p className="lead">
                    <a className="btn btn-primary btn-lg "
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


