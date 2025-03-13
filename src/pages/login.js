import React, {useState} from 'react';
import Card from '../components/card';
import FormGroup from "../components/form-group";
import {useNavigate} from "react-router-dom";
import axios from "axios";

/*mostra o fomulario de login dentro do Card.js
* {onLogin}*/
const Login = () => {
    /*estados para armazenamento e status de carregamento, e erro*/
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [errors, setErros] = useState({});
    const [loading, setLoading] = useState(false);

    /*fazer login -
    * metodo .then - para resposta quando der certo, sucesso
    * catch para resposta com erro*/
    const fazerLogin = ()=>{
        /*passar url e objeto*/
        axios.post('http://localhost:8080/api/usuarios/autenticar', {
            email: email,
            senha: senha
        }).then(res => {
            console.log(res);
        }).catch(err => {
            /*esse res é do exios*/
            console.log(err.response);
        })
    }

    /*faz a requisicao post
    const fazerLogin = () =>{
        try {
            const res = axios.post('http://localhost:8080/api/usuarios/autenticar', {
                email: email,
                senha: senha,
            });
            console.log("Resposta do servidor", res.data);

           // alert("Sucesso!");
        }catch(err){
            console.log("Erro na requisição ", err.response);
            setLoading("Erro ao fazer login. Verifique suas credenciais.");
        }
    }*/

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }
    const handleSenhaChange = (e) => {
        setSenha(e.target.value);
    }

    /*para navegacão, entre componentes*/
    const navigate = useNavigate();

    /*redireciona para o cadastro de usuarios*/
    function handleCadastrar() {
        navigate('/Register');
    }




    /*manda la pro cadastro
    prepareCadastro = () =>{
        history.push('/register');
    }*/

    return (
        <div className="container-fluid mt-5 style={{minHeight: '0vh', display: 'flex', alignItems: 'center'}">
            <div className="row justify-content-center w-100">
                <div className="col-md-6" >
                    <div className="bs-docs-section">
                        <Card title="Login">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="bs-component">

                                            <form onSubmit={(e)=>{e.preventDefault(); fazerLogin();}}>{/*onSubmit={fazerLogin}*/}
                                                <FormGroup label={
                                                    <span>
                                                        Email:<span className="asterisco-vermelho">*</span>
                                                    </span>
                                                } name="email"
                                                           error={errors.email}
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
                                                           error={errors.senha}
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




