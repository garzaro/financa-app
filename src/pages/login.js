import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/card";
import FormGroup from "../components/form-group";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const {
        /*registra os inputs*/
        register,
        /*lida comenvio de formuilario*/
        handleSubmit,
        /*erro de validação paa cada campo*/
        formState: { errors }
        /*chamado par obter as funcoes acima*/
    } = useForm();
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    function fazerLogin = () {
        setIsLoading(true);
        setError("");
        axios.post("http://localhost:8080/api/usuarios/autenticar", data);{

            email,
            senha,
        }).then(response => {
            console.log("Resposta: ", response.data);
            setTimeout(() => navigate("/home"), 2000);
        }).catch(erro => {
            setError(erro.response.data);
        });
    };

    return (
        <div className="container-fluid mt-5 style={{minHeight: '0vh', display: 'flex', flexDirection: 'column', alignItens:'center'}}>}}" >
            <div className="row justify-content-center w-100" >
                <div className="col-md-6">
                    <div className="bs-docs-section">

                        {/* Erros do Backend */}
                        <div className="row">
                            <span>{error}</span>
                        </div>

                        <Card title="Login">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="bs-component">
                                        <form onSubmit={handleSubmit(fazerLogin)}>

                                            <FormGroup label={
                                                <span>
                                                    Email:<span className="asterisco-vermelho">*</span>
                                                </span>
                                            } name={"email"}
                                            >
                                                {/* Campo E-mail */}
                                                <input
                                                    type="email"
                                                    {...register("email", {required: "E-mail é obrigatório"})}
                                                    className="form-control form-control-sm inputPlaceholder"
                                                    placeholder="Digite seu email"
                                                    id="email"
                                                />
                                                {errors.email && <span className="error">{errors.email.message}</span>}
                                            </FormGroup>

                                            <FormGroup label={
                                                <span>
                                                    Senha:<span className="asterisco-vermelho">*</span>
                                                </span>
                                            } name={"senha"}
                                            >
                                                {/* Campo Senha */}
                                                <input
                                                    type="password"
                                                    {...register("senha", {required: "Senha é obrigatória"})}
                                                    className="form-control form-control-sm inputPlaceholder"
                                                    placeholder="Digite sua senha"
                                                />
                                                {errors.senha && <span className="error">{errors.senha.message}</span>}
                                            </FormGroup>

                                            {/*esqueceu a senha*/}
                                            <div className="nav-signin-tooltip-footer ">Esqueceu a senha?
                                                <a href="/register"
                                                   className="nav-a"
                                                   aria-label="Esqueceu a senha? Clique aqui para criar uma nova.">&nbsp;
                                                    Clique aqui.</a>
                                            </div>

                                            {/* Botão de Login */}
                                            <button type="submit"
                                                    className="btn btn-success btn-sm mt-3 ">Entrar
                                            </button>

                                        </form>
                                    </div>
                                </div>
                            </div>
                        </Card>
                        {/*cadastro*/}
                        <Card title="Seja bem vindo!">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="bs-component">
                                        <div className="card-body">
                                            <div className="m-sm-4">
                                                <h2 className="text-center">Primeiro acesso?</h2>
                                                <p className="text-center mb-3">
                                                    Se ainda não possui acesso forneça seus dados, clique no
                                                    botão abaixo e crie sua conta e obtenha acesso ao Financas Pessoais.</p>
                                                <div className="text-center">
                                                    <a href="/register" className="btn btn-sm btn-warning"
                                                       title="Não tem uma conta? Crie sua conta!">Criar conta</a>
                                                </div>
                                            </div>
                                        </div>
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

export default LoginForm;
