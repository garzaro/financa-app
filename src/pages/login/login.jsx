import { useState } from "react";
import { useForm } from "react-hook-form";
import {useNavigate, useLocation, Link} from "react-router-dom";
import axios from "axios";
import Card from "../../components/template/card.jsx";
import FormGroup from "../../components/template/formGroup.jsx";
import {mensagemDeErro} from '../../components/utils/toastr.jsx'
import UsuarioService from "../../app/service/usuarioService.js";
import {LocalStorageService} from "../../app/service/localStorageService.js";
import DefinirSenha from "./redefinir-senha.jsx";
import {useAuth} from "../../auth/useAuth.js";
import SenhaVisibilityToggle from "../../components/utils/senhaVisibilityToggle.jsx";
import PanoDeFundo from "../../components/feedback/loader.jsx";
import Button from "@mui/material/Button";
import LoginIcon from '@mui/icons-material/Login';
import {Backdrop, CircularProgress, IconButton} from "@mui/material";
import {Input} from "@/components/ui/input.jsx";

function LoginForm () {
  const { login } = useAuth();
  const usuarioService = UsuarioService();
  const { register, handleSubmit, formState: { errors }} = useForm();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenhaLogin, setMostrarSenhaLogin] = useState(false)
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const destinationBack = location.state?.from?.pathname || '/home'; //home
  /**
   * logar
   * */
  const fazerLogin = (data) => {
    setLoading(true);

    usuarioService.autenticar({
      email:data.email,
      senha:data.senha,
    }).then(response => {
      // O backend deve retornar o token e os dados do usuário
      // Se o backend só retorna os dados do usuário e não usa JWT ainda,
      // o "token" pode ser o próprio objeto ou algo simbólico por enquanto.
      // Assumindo que response.data tem o que precisamos.
      const user = response.data;
      const token = response.data.token ||  'Este_token_deve_vir_do_backend'; //'dummy-token'; // Ajustar conforme a API real
      
      login(token, user);
      
      setTimeout(() => navigate(destinationBack,{replace: true}), 2000);

    }).catch(err => {
      setLoading(false);
      mensagemDeErro(
        err.response?.data || "Erro ao autenticar",
        err.response?.data?.message,
        err.response?.data?.code,
        err.response?.status )
    });
  };
  function handleCancelarLogin() {
    navigate('/');
  }
  function toggleSenhaLogin() {
    setMostrarSenhaLogin(!mostrarSenhaLogin);
  }
//const togglePassword = () => setShowPassword((prev) => !prev);

return (
  <div className="container-fluid  justify-content-center align-items-center "
  > {/**min-vh-100**/}
    <div className="row justify-content-center ">
      {/* Header */}
      <header className="bg-zinc-900 shadow-sm border-b border-gray-600 py-4 px-6 flex
        justify-between items-center"
      >
        <div className="flex items-center gap-2">
          <div className="bg-emerald-600 p-2 rounded-lg animate-pulse">
            {/*<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"*/}
            {/*     stroke="currentColor">*/}
            {/*  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2*/}
            {/*   3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11*/}
            {/*   0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />*/}
            {/*</svg>*/}
          </div>

          <span className="text-xl font-bold text-gray-300 tracking-tight">
            Finanças Pessoais
          </span>
        </div>

        <nav>
          <span className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-all ">
            Ainda não tem conta?
          </span>
          <Link
            to="/register"
            className="text-sm min-h-screen font-semibold hover:text-emerald-700 transition-all"
          >
            <span className="underline"> Cadastre-se </span>
          </Link>
          </nav>
        </header>

      <div className="col-md-6 ">
        <div className="bs-docs-section">
          <Card title="Seja bem-vindo">
            <h6 className="text-center text-body-primary" style={{ color:'palegreen', fontFamily:'inherit',
              fontSize: '12px', letterSpacing: '2px' }}
            >
              Faça login para acessar sua conta
            </h6>
            <div className="row ">
              <div className="col-lg-12  ">
                <div className="bs-component  ">
                  <form onSubmit={handleSubmit(fazerLogin)} className="px-4">
                    <FormGroup label={
                      <span className="text-white">
                        Email:<span className="asterisco-vermelho">*</span>
                      </span>
                    }>
                      {/** Campo E-mail **/}
                      <input
                        type="email"
                        {...register("email", {required: "E-mail é obrigatório"})}
                        className="form-control form-control-lg text-white inputPlaceholder"
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
                          {/** Campo Senha **/}
                          <input
                            type={mostrarSenhaLogin ? "text" : "password"}
                            {...register("senha", {required: "Senha é obrigatória"})}
                            className="form-control form-control-lg text-white inputPlaceholder"
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
                     **/
                    }
                    <div className="nav-signin-tooltip-footer">Esqueceu a senha?
                      <Link
                        to="/redefinir-senha"
                        className="nav-a text-decoration-none"
                        aria-label="Esqueceu a senha? Clique aqui para criar uma nova."
                      >&nbsp;
                        Clique aqui.
                      </Link>
                    </div>
                    {/**
                     Botão de Login
                     **/
                    }
                    <div className="d-flex align-items-center gap-2">
                      <div>
                        <button
                          type="submit"
                          className="btn btn-success btn-sm mt-3"
                        >
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
                     **/
                    }
                    <div className="d-flex mb-0 mt-1 align-items-center my-3">
                      <div className="grow border-top border-secondary"></div>
                      <span className="px-2 text-secondary text-nowrap">
                        Ou Cadastre-se
                      </span>
                      <div className="grow border-top border-secondary"></div>
                    </div>

                    <div className="p-0">
                      <h4 className="text-center mt-0 mb-1">
                        Primeiro acesso?
                      </h4>
                      <p className="text-center mb-0"
                         style={{ fontSize: '10px', letterSpacing: '2px' }}
                      >
                        Se ainda não possui acesso, clique no botão abaixo,
                        crie sua conta e obtenha acesso ao Financas Pessoais.
                      </p>

                      <div className="text-center mt-2">
                        <Link
                          to="/register"
                          className="btn btn-sm btn-secondary"
                          title="Não tem uma conta? Clique aqui!"> <i className="pi pi-plus"></i>
                          Criar conta
                        </Link>
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
     **/
    }
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

/**
 * optional chaining ?
 * **/