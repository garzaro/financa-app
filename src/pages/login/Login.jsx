import { useState } from "react";
import { useForm } from "react-hook-form";
import {useNavigate, useLocation, Link} from "react-router-dom";
import axios from "axios";
import Card from "../../components/template/card.jsx";
import FormGroup from "../../components/template/formGroup.jsx";
import {mensagemDeErro} from '../../components/utils/toastr.jsx'
import UsuarioService from "../../app/service/usuarioService.js";
import {LocalStorageService} from "../../app/service/localStorageService.js";
import DefinirSenha from "../cadastroUsuario/Senha-redefinicao.jsx";
import SenhaVisibilityToggle from "../../components/utils/senhaVisibilityToggle.jsx";
import PanoDeFundo from "../../components/feedback/loader.jsx";
import Button from "@mui/material/Button";
import LoginIcon from '@mui/icons-material/Login';
import {Backdrop, CircularProgress, IconButton} from "@mui/material";

/**
 * TO-LIST
 * [] Isolar a pagina de login da aplicação
 * [] Usar href no logoff para recarregar a pagina home, observar recarregamento da pagina, quando altera o componente
 * optional chaining ?
 * **/
// A PORRA PAROU DE LOGAR MANO NEM FAZ MAIS CADASATRO VER O QUE É OU DAR SEQUENCIA DEPPIS A GENTE ESTA PORRA
function LoginForm () {
  const usuarioService = UsuarioService();
  const { register, handleSubmit, formState: { errors }} = useForm();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenhaLogin, setMostrarSenhaLogin] = useState(false)
  const storageUsuario = LocalStorageService();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const destinationBack = location.state?.from?.pathname || '/desv-hp'; //home
  const USUARIO_LOGADO = '_usuario_logado';
  /**
   * logar
   * */
  const fazerLogin = (data) => {
    setLoading(false);
    /**
     * limpe a chave antiga
     * */
    storageUsuario.removerItem(USUARIO_LOGADO);

    usuarioService.autenticar({
      email:data.email,
      senha:data.senha,
    }).then(respondeAiManoBanco => {
      /**
       * @param setItem - salvar a chave - identificação
       * */
      storageUsuario.salvarItem(USUARIO_LOGADO, respondeAiManoBanco.data);
      setLoading(true);
      setTimeout(() => navigate(destinationBack,{replace: true}, 4500));

    }).catch(err => {
      mensagemDeErro(
        err.response.data,
        err.response.data.message,
        err.response.data.code,
        err.response.status )
      // "Erro inesperado ao fazer login. Tente novamente mais tarde.");
    });
  };
  function handleCancelarLogin() {
    navigate('/');
  }
  function handleAvancar() {
    navigate('/Definirsenha');
  }
  function toggleSenhaLogin() {
    setMostrarSenhaLogin(!mostrarSenhaLogin);
  }
//const togglePassword = () => setShowPassword((prev) => !prev);

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100">
      <div className="row justify-content-center" >
        <div className="col-md-6">
          <div className="bs-docs-section">
            <Card title="Seja bem-vindo">
              <h6 className="text-center text-body-primary" style={{ color:'palegreen', fontFamily:'inherit', fontSize: '12px', letterSpacing: '2px' }}>
                Faça login para acessar sua conta
              </h6>
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
                          className="form-control form-control-lg inputPlaceholder"
                          placeholder="Digite seu email"
                          id="email"
                        />
                        {errors.email &&
                          <span className="error" style={{ fontSize: '10px'}}>{errors.email.message}</span>}
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
                            className="form-control form-control-lg inputPlaceholder"
                            placeholder="Digite sua senha"
                          />
                          <SenhaVisibilityToggle
                            mostrarSenha={mostrarSenhaLogin}
                            onClick={toggleSenhaLogin}
                          />
                        </div>
                        {errors.senha &&
                          <span className="error-backend" style={{ fontSize: '10px'}}>{errors.senha.message}</span>}
                      </FormGroup>

                      {/**
                       esqueceu a senha
                       **/}
                      <div className="nav-signin-tooltip-footer">Esqueceu a senha?
                        <a href="/cadastroUsuario/signupFormPassword"
                           className="nav-a"
                           aria-label="Esqueceu a senha? Clique aqui para criar uma nova.">&nbsp;
                          Clique aqui.</a>
                      </div>
                      {/**
                       Botão de Login
                       **/}
                      <div className="d-flex align-items-center gap-2">
                        <div>
                          <button
                            type="submit" className="btn btn-success btn-sm mt-3">
                            <i className="pi pi-sign-in"></i> <span>ENTRAR</span>
                          </button>
                        </div>
                        <div>
                          <button
                            type="button" className="btn btn-danger btn-sm mt-3"
                            onClick={handleCancelarLogin}
                          >
                            <i className="pi pi-times"></i> <span>CANCELAR</span>
                          </button>
                        </div>
                      </div>
                      {/**
                       cadastre-se
                       **/}
                      <div className="d-flex mb-0 mt-1 align-items-center my-3">
                        <div className="grow border-top border-secondary"></div>
                        <span className="px-2 text-secondary text-nowrap">Ou Cadastre-se</span>
                        <div className="grow border-top border-secondary"></div>
                      </div>

                      <div className="p-0">
                        <h4 className="text-center mt-0 mb-1">Primeiro acesso?</h4>
                        <p className="text-center mb-0" style={{ fontSize: '10px', letterSpacing: '2px' }}>
                          Se ainda não possui acesso, clique no
                          botão abaixo, crie sua conta e obtenha acesso ao Financas Pessoais.
                        </p>

                        <div className="text-center mt-2">
                          <Link to="/register" className="btn btn-sm btn-secondary"
                             title="Não tem uma conta? Clique aqui!"> <i className="pi pi-plus"></i>
                            Criar conta</Link>
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
      {/**
       Backdrop MUI
       indicador de carregamento durante o processo de autenticação.
       **/}
      <PanoDeFundo
        open={loading}
        color="inherit"
        titulo="Autenticando"
        mensagem="Estamos verificando suas credenciais, por favor aguarde..."
      />
    </div>
  );
};

export default LoginForm;


