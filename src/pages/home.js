import React, {useEffect, useState} from 'react';
import axios from "axios";
/*pagina inicial*/
function Home () {
    const [saldo, setSaldo] = useState('0,00');
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(null);
    /*ciclo de vida*/
    useEffect(() => {
        const buscarSaldo = async () => {
            try {
                /*recuperando o usuario logado - transformado de obj para string no login*/
                const stringUsuarioLogado = localStorage.getItem('_usuario_logado');
                console.log(" Recuperando usuario string ", stringUsuarioLogado);
                /*tranformando a string em objeto*/
                const objetoUsuarioLogado = JSON.parse(stringUsuarioLogado);
                const userId = objetoUsuarioLogado;
                console.log(" Recuperando usuario objeto ",objetoUsuarioLogado);
                /*usar crase no endpoint - se torna um template string - recurso do ecma*/
                const response = await axios.get(`http://localhost:8080/api/usuarios/${userId.id}/saldo`)
                setSaldo(response.data);
            } catch (err) {
                /*tentar trazer mensagem do backend*/
                setErro(err.response?.data.message || err.response?.data);
            } finally {
                setLoading(false);
            }
        };
        buscarSaldo();
    },[]);
    if (loading) return <p>Carregando saldo...</p>
    if (erro) return <p>{erro}</p>;

    return (
        <div className="container ">
            <div className="jumbotron ">
                <h1 className="display-5">Bem-vindo à Página Inicial!!!</h1>
                <p className="lead">Este é o seu sistema de finanças pessoais.</p>

                {/*retorno do saldo*/}
                <p className="lead">
                    Seu saldo para o mês atual é de {saldo !== null ? `R$ ${saldo}`: `indisponivel`}.
                </p>

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