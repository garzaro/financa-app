import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Card from "../components/card/card";
import FormGroup from "../components/form/form-group";
import {mensagemDeErro} from '../components/utils/toastr'
import UsuarioService from "../app/service/usuarioService";
import {LocalStorageService} from "../app/service/localStorageService";
import Swal from "sweetalert2";
import DefinirSenha from "./senha-redefinicao";
import SenhaVisibilityToggle from "../components/utils/senhaVisibilityToggle";

function LoginForm () {
  /**
   * chamando o servico de usuario
   * */
  const usuarioService = UsuarioService();
  
  const { register, handleSubmit, formState: { errors }} = useForm();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenhaLogin, setMostrarSenhaLogin] = useState(false)
  const storageUsuario = LocalStorageService();
  const navigate = useNavigate();

/**
 * logar
 * */
const fazerLogin = (data) => {
    /**
     * limpe a chave antiga
     * */
    storageUsuario.removerItem('_usuario_logado');
    usuarioService.autenticar({
    email:data.email,
    senha:data.senha,
}).then(respondeAiManoBanco => {
      /**
       * @param setItem - salvar a chave - identificação
       * */
      storageUsuario.salvarItem('_usuario_logado', respondeAiManoBanco.data);
      setTimeout(() => navigate("/home"), 2000);

}).catch(err => {
    mensagemDeErro(err.response.data || "Erro inesperado ao fazer login. Tente novamente mais tarde.");
});
};
function handleCancelar() {
    navigate('/login');
}
function handleAvancar() {
    navigate('/Definirsenha');
}

function toggleSenhaLogin() {
    setMostrarSenhaLogin(!mostrarSenhaLogin);
}
return (
    <div className="container-fluid mt-5" style={{minHeight: '0vh', display: 'flex', flexDirection: 'column', alignItens:'center'}}>
        <div className="row justify-content-center w-100" >
            <div className="col-md-6">
                <div className="bs-docs-section">
                    <Card title="Login">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="bs-component">
                                    <form onSubmit={handleSubmit(fazerLogin)}>
                                        <FormGroup label={
                                            <span className="text-white">
                                                Email:<span className="asterisco-vermelho">*</span>
                                            </span>
                                        }>
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
                                            <span className="text-white">
                                                Senha:<span className="asterisco-vermelho">*</span>
                                            </span>
                                        }>
                                            <div className="position-relative">
                                                {/* Campo Senha */}
                                                <input
                                                    type={mostrarSenhaLogin ? "text" : "password"}
                                                    {...register("senha", {required: "Senha é obrigatória"})}
                                                    className="form-control form-control-sm inputPlaceholder"
                                                    placeholder="Digite sua senha"
                                                />
                                                <SenhaVisibilityToggle
                                                    mostrarSenha={mostrarSenhaLogin}
                                                    onClick={toggleSenhaLogin}
                                                />
                                            </div>
                                            {errors.senha &&
                                                <span className="error-backend">{errors.senha.message}</span>}
                                        </FormGroup>

                                        {/*esqueceu a senha*/}
                                        <div className="nav-signin-tooltip-footer ">Esqueceu a senha?
                                            <a href="/signupFormPassword"
                                               className="nav-a"
                                               aria-label="Esqueceu a senha? Clique aqui para criar uma nova.">&nbsp;
                                                Clique aqui.</a>
                                        </div>
                                        {/* Botão de Login */}
                                        <button
                                            type="submit" className="btn btn-success btn-sm mt-3">
                                            Entrar
                                        </button>
                                        {/*cadastre-se*/}
                                        <div className="d-flex align-items-center my-4">
                                            <div className="flex-grow-1 border-top border-secondary"></div>
                                            <span className="px-3 text-secondary text-nowrap">Ou Cadastre-se</span>
                                            <div className="flex-grow-1 border-top border-secondary"></div>
                                        </div>
                                        <div className="sm-4">
                                            <h2 className="text-center">Primeiro acesso?</h2>
                                            <p className="text-center mb-3">
                                                Se ainda não possui acesso, clique no
                                                botão abaixo, crie sua conta e obtenha acesso ao Financas Pessoais.</p>
                                            <div className="text-center">
                                                <a href="/register" className="btn btn-sm btn-warning"
                                                   title="Não tem uma conta? Clique aqui!">Criar conta</a>
                                            </div>
                                        </div>
                                    </form>
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
