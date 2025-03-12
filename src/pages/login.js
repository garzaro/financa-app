import React, {useState} from 'react';
import Card from '../components/card';
import FormGroup from "../components/form-group";
import {useNavigate} from "react-router-dom";

/*mostra o fomulario de login dentro do Card.js*/
function Login({onLogin}) {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [errors, setErros] = useState({});
    const navigate = useNavigate(); /*para navegacão*/

    function handleEmailChange (e) {
        setEmail(e.target.value);
    }
    function handleSenhaChange (e) {
        setSenha(e.target.value);
    }
    /*para validar os campos do login*/
    const validarFormularioLogin = () => {
        email = email.toUpperCase();
        const newErrors = {};
        if (!email) newErrors.email = 'Email Inválido';
        if (!senha) newErrors.senha = 'Digite sua senha';

        if (Object.keys(newErrors).length > 0){
            setErros(newErrors);
            return;
        }
        //return Object.keys(newErrors).length === 0; /*verdadeiro se nao houver erros - ler sobre o metodo key*/
    };
    const handleSubmit = (e) => {
        e.preventDefault(); /*evita que a pagina seja recarregada*/
        if (validarFormularioLogin()) { /*posso pegar tambem tudo dessa função e colocar em handleSubmit - unica*/
            onLogin(email, senha); /*aqui esta chamando a função de login() passada como prop*/
        }
    };
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
                <div className="col-md-6" style={{ marginTop: ' 1px' }}>
                    <div className="bs-docs-section">
                        <Card title="Login">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="bs-component">

                                            <form onSubmit={handleSubmit}>
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
                                                    <input type="text"
                                                           value={senha}
                                                           onChange={handleSenhaChange}
                                                           className="form-control form-control-sm inputPlaceholder"
                                                           id="senha"
                                                           placeholder="Digite a senha"
                                                    />
                                                </FormGroup>
                                            </form>
                                            <button type="submit" className="btn btn-success mt-3">Entrar</button>
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




