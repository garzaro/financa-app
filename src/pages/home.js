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
                const response = await axios.get(`http://localhost:8080/api/usuarios/1/saldo`);
                setSaldo(response.data);
            } catch (err) {
                /*tentar trazer a mesangem de erro de rede do backend*/
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
                <p className="lead">Saldo atual {saldo !== null ? `R$ ${saldo}`: `indisponivel`}.</p>
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


