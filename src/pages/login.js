import React, {useState} from 'react';
import Card from '../components/card';
import FormGroup from "../components/form-group";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import ErrosLoginFront from "../components/errosLoginFront";

/*mostra o fomulario de login dentro do Card.js
* {onLogin}*/
const Login = () => {
    /*estados para armazenamento e status de carregamento, e erro*/
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    /*tratamento de setMensagensDeAlerta - mensagens de setMensagensDeAlerta do login*/
    const [mensagensDeAlerta, setMensagensDeAlerta] = useState('');
    //const [loading, setLoading] = useState(false); /*ver sobre*/

    /*para navegacão, entre componentes*/
    const navigate = useNavigate();

    const fazerLogin = () =>{
        axios.post('http://localhost:8080/api/usuarios/autenticar', {
            email,
            senha
        }).then(response => {
            /*vai exibir uma mensagem de login sucesso*/
            setMensagensDeAlerta({loginBemSucedido: 'Verificando suas credenciais...'});

            /*...redireciona para a rota home apos 2 segundos*/
            setTimeout(() => {
                navigate('/home');
            },2000)

        }).catch(err => {
            if(err.response){
                /* a reposta de erro tem a propriedade data que pega a mensagem de erro*/
                setMensagensDeAlerta(err.response.data);
            }else if(err.request){
                /*req foi feito mas o servidor nao vai responder*/
                setMensagensDeAlerta('Erro de conexão com o servidor.');
            }else{
                /*erro em configuração da requisição*/
                setMensagensDeAlerta('Ocorreu um erro inesperado.');
            }
        });
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }
    const handleSenhaChange = (e) => {
        setSenha(e.target.value);
    }
    /*para evitar que a pagina recarregue*/
    const handleSubmit = (e) => {
        e.preventDefault();
    }

    /*redireciona para o cadastro de usuarios*/
    function handleCadastrar() {
        navigate('/Register');
    }

    /*redireciona para tela home*/
    function handleHome() {
        navigate('/Home');
    }

    return (
        <div className="container-fluid mt-5 style={{minHeight: '0vh', display: 'flex', alignItems: 'center'}">
            <div className="row justify-content-center w-100">
                <div className="col-md-6" >
                    <div className="bs-docs-section">

                        {/*tratamento de erro
                        <ErrosLoginFront setMensagensDeAlerta={mensagensDeAlerta}></ErrosLoginFront>
                        */}

                        <span>{mensagensDeAlerta}</span>

                        <Card title="Login">

                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="bs-component">

                                            <form onSubmit={handleSubmit}>{/*onSubmit={fazerLogin}*/}
                                                <FormGroup label={
                                                    <span>
                                                        Email:<span className="asterisco-vermelho">*</span>
                                                    </span>
                                                } name="email"
                                                           mensagemDeErro={setMensagensDeAlerta.email}
                                                >
                                                    <input
                                                        type="email"
                                                        value={email}
                                                        onChange={handleEmailChange}
                                                        className="form-control form-control-sm inputPlaceholder"
                                                        id="email"
                                                        placeholder="Digite o email"
                                                    />
                                                </FormGroup>
                                                <FormGroup label={
                                                    <span>
                                                        Senha:<span className="asterisco-vermelho">*</span>
                                                    </span>
                                                } name="senha"
                                                           mensagemDeErro={setMensagensDeAlerta.senha}
                                                >
                                                    <input type="password"
                                                           value={senha}
                                                           onChange={handleSenhaChange}
                                                           className="form-control form-control-sm inputPlaceholder"
                                                           id="senha"
                                                           placeholder="Digite a senha"
                                                    />
                                                </FormGroup>
                                            </form>
                                            <button type="submit" onClick={fazerLogin} className="btn btn-success mt-3">Entrar</button>
                                            &nbsp;&nbsp;
                                            {/*type="button para evitar submissão do formulario"*/}
                                            <button type="button" className="btn btn-danger mt-3" onClick={handleCadastrar}>Cadastrar</button>


                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Login;




