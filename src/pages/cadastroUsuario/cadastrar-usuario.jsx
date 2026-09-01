import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import ReactPasswordChecklist from "react-password-checklist";
import Card from "../../components/template/card";
import FormGroup from "../../components/template/formGroup.jsx";
import Astered from "../../components/utils/astered";
import ServiceUsuario from "../../app/service/usuarioService.js";
import {mensagemDeAlerta, mensagemDeSucesso} from "../../components/utils/toastr";
import {handleCpfChange, validateSenhaTrim} from "../../components/utils/utils";
import SenhaVisibilityToggle from "../../components/utils/senhaVisibilityToggle";
import {CircularProgress} from "@mui/material";
import {PasswordStrengthMeter} from "../../lib/forcaSenha.jsx";
import LimparCamposButton from "../../components/ui/limpar-campo.jsx";

/**
 * TODO-list
 
VALIDAÇÕES

[] Validar se o email digitado está dentro do padrão aceito pelo backend.
[] Validar se o email digitado ja estiver cadastrado.
[] Validar se a senha digitada atende aos critérios definidos pelo backend.
[] Validar se o usuário digitado está dentro do padrão aceito pelo backend.
[] Validar se o CPF digitado é válido e está dentro do padrão aceito pelo backend.
[] Validar se o nome completo digitado está dentro do padrão aceito pelo backend.
[] Validar se a senha e a confirmação de senha são iguais.
[] Validar se a senha nao for a mesma da base, retornar a mensagem no toaster de forma genérica, sem expor a existência da senha.
[] Validar se o email e a confirmação de email são iguais.
[] Validar se o CPF digitado já está cadastrado no sistema.
[] Validar se o email digitado já está cadastrado no sistema.
[] Alterar a mensagem de erro exibida no toaster para não refletir a real restrição de email e cpf, ocultando a existência na mensagem.
[] Validar email fora do range de dominio
[] Colocar um X para limpar os campos do cadastro  

REGRAS DE NEGÓCIO

[ ] Verificar se o usuário já está cadastrado.
[ ] Verificar se o email já está cadastrado.
[ ] Verificar se o CPF já está cadastrado.
 * **/

const CadastrarUsuario = () => {
  const {
    register,
    handleSubmit, 
    setValue, 
    watch, 
    formState:{errors},} = useForm({
    defaultValues: {
      nomeCompleto: '',
      cpf: '',
      nomeUsuario: '',
      email: '',
      senha: '',
    }
  });

  // function focus(fieldName) {
  //   const input = document.querySelector(`input[name="${fieldName}"]`);
  //   if (input) {
  //     input.focus();
  //   }
  // }
  const valorCampo = watch(); 

  const limparCampo = (fieldName) => {
    setValue(fieldName, "", {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
    focus(fieldName);
  };
  
  // const [senha, setSenha] = useState('');
  const [showSenha, setShowSenha] = useState(false);
  const [showSenhaConfirmada, setShowSenhaConfirmada] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();
  const usuarioService = ServiceUsuario();

  /**
   * contexto do cadastro
   * */
  const cadastrarUsuario = (data) => {
    const payload = {
      nomeCompleto: data.nomeCompleto,
      cpf: data.cpf.replace(/\D/g, ''),
      nomeUsuario: data.nomeUsuario,
      email: data.email,
      senha: data.senha,
    }
    console.log("Mostrando os dados do usuario: ", payload)
    usuarioService.salvar(payload)
      .then(response => {
        mensagemDeSucesso("Usuario cadastrado com sucesso! Faça o login para continuar")
        /**if (mensagemDeSucesso){
         return <CircularProgress />
         }*/
        setTimeout(navigate('/sign-in'), 2000);
      }).catch(err => {
      mensagemDeAlerta(
        err.response?.data?.erros?.[0]?.mensagem ||
        err.response?.data?.mensagem ||
        "Erro inesperado ao cadastrar. Tente novamente mais tarde.")
    });
  }
  /**
   *  mascara cpf
   *  */
  const handleCpfMask = (e) => {
    const mascaraCpf = handleCpfChange(e.target.value);
    setValue('cpf', mascaraCpf);
  }
  /**
   * verificacao de senhas
   * */
  const forcaSenha = watch('senha', '');
  const senhaDigitada = watch("senha", "");
  const confirmarSenha = watch('confirmarSenha', '');
  const mostrarChecklist = !(isValid && senhaDigitada === confirmarSenha);
  /**
   * visibilidade de senha
   * */
  const toggleSenhaVisibility = () => {
    setShowSenha(!showSenha);
  }
  const toggleSenhaConfirmadaVisibility = () => {
    setShowSenhaConfirmada(!showSenhaConfirmada);
  }
  /**
   * verificação de email
   * */
  const confirmarEmail = watch('email');
  
  /**
   * cancelar cadastro de usuario
   * */
  function handleCancelar() {
    navigate('/');
  };
  return (
    // container-fluid left-0 right-0 bg-zinc-900 border-b border-gray-500 z-50 justify-content-center align-items-center
    <div className="container-fluid mb-12 justify-content-center align-items-center">
      <div className="row justify-content-center w-full ">

        {/* Header */}
        <header className="bg-zinc-900 shadow-sm border-b border-gray-600 mb-2 py-4 px-4 flex
                            justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-emerald-600 p-2 rounded-lg animate-pulse"></div>
            <span className="text-xl font-bold text-gray-300 tracking-tight">
              <Link to="/" className="text-decoration-none">
                Finanças Pessoais
              </Link>
            </span>
          </div>

          <nav>
            <span className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-all ">
              Já possui uma conta?
           </span>
            <Link
              to="/sign-in"
              className="text-sm min-h-screen font-semibold hover:text-emerald-700 transition-all"
            >
              <span className="underline">
                Entre
              </span>
            </Link>
          </nav>
        </header>

        <div className="col-md-6 ">
          <div className="bs-docs-section">

            <div className=" ">

              <Card title="Cadastro de Usuário">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="bs-component">
                      {/*grid grid-cols-1 md:grid-cols-2*/}
                      <form onSubmit={handleSubmit(cadastrarUsuario)} className="px-4 gap-2">

                        {/**
                         campo nome completo
                         */}
                        <FormGroup label={
                          <span>
                            Nome completo: <Astered>*</Astered>
                          </span>
                        }>
                          <div className="position-relative">
                            <input
                              type="text"
                              {...register("nomeCompleto", {required: "Nome completo é obrigatório"})}
                              className="form-control h-10 form-control-sm text-white inputPlaceholder pe-5"
                              placeholder="Digite seu nome completo"
                              id="nome-completo"
                              />
                            {/*w-10 h-10 bg-gradient-to-br from-pink-900 to-pink-500 rounded-lg flex*/}
                            {/*items-center justify-center*/}

                            {valorCampo.nomeCompleto && (
                              <button type="button" onClick={() => limparCampo("nomeCompleto")}
                                      className="position-absolute top-50 end-0 translate-middle-y me-2"
                              >
                                <i className="pi pi-times small "></i>
                              </button>
                            )}
                          </div>
                          {errors.nomeCompleto &&
                            <span className="error text-zinc-300"
                                  style={{ fontSize: '10px'}}>{errors.nomeCompleto.message}</span>}
                        </FormGroup>

                        {/**
                         campo cpf
                         */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                          <FormGroup label={
                            <span>
                              CPF: <Astered>*</Astered>
                            </span>
                          }>
                          <div className="position-relative">
                            <input
                              type="text"
                              {...register("cpf", {required: "O CPF é obrigatório",
                              onChange: handleCpfMask})}
                              className="form-control h-10 form-control-sm text-white inputPlaceholder pe-5"
                              placeholder="Digite seu CPF"
                              id="cpf"
                            />
                            {valorCampo.cpf && (
                              <button type="button" onClick={() => limparCampo("cpf")}
                                      className="position-absolute top-50 end-0 translate-middle-y me-2"
                              >
                                <i className="pi pi-times small"></i>
                              </button>
                            )}
                          </div>
                            {errors.cpf && <span className="error text-zinc-300"
                                                 style={{ fontSize: '10px'}}>{errors.cpf.message}</span>}
                          </FormGroup>

                          {/**
                           campo nome usuario
                           */}
                          <FormGroup label={
                            <span>
                              Nome de Usuário: <Astered>*</Astered>
                            </span>
                          }>
                          <div className="position-relative">
                            <input
                              type="text"
                              {...register("nomeUsuario", {required: "Nome de usuário é obrigatório"})}
                              className="form-control h-10 text-white form-control-sm inputPlaceholder pe-5"
                              placeholder="Digite o nome de usuário"
                              id="nome-usuario"
                            />
                            {valorCampo.nomeUsuario && (
                              <button type="button" onClick={() => limparCampo("nomeUsuario")}
                                      className="position-absolute top-50 end-0 translate-middle-y me-2"
                              >
                                <i className="pi pi-times small"></i>
                              </button>
                            )}
                          </div>
                            {errors.nomeUsuario &&
                              <span className="error text-zinc-300" style={{ fontSize: '10px'}}>
                                {errors.nomeUsuario.message}
                              </span>}
                          </FormGroup>
                        </div>

                        {/**
                         campo email
                         */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                          <FormGroup label={
                            <span>
                              Email: <Astered>*</Astered>
                            </span>
                          }>
                          <div className="position-relative">
                            <input
                              type="email"
                              {...register("email", {required: "Email é obrigatório"})}
                              className="form-control h-10 form-control-sm text-white inputPlaceholder pe-5"
                              placeholder="Digite seu email"
                              id="email"
                            />

                            {valorCampo.email && (
                              <button type="button" onClick={() => limparCampo("email")}
                                      className="position-absolute top-50 end-0 translate-middle-y me-2"
                              >
                                <i className="pi pi-times small"></i>
                              </button>
                            )}
                          </div>
                            {errors.email && <span className="error text-zinc-300"
                                                   style={{ fontSize: '10px'}}>{errors.email.message}</span>}
                          </FormGroup>

                          {/**
                           campo repetir email
                           */}
                          <FormGroup label={
                            <span>
                              Confirmar e-mail: <Astered>*</Astered>
                            </span>
                          }>
                          <div className="position-relative">
                            <input
                              type="email"
                              {...register("confirmarEmail",{
                                required: "Confirme o email",
                                validate:(value) => value === confirmarEmail || "Os emails não são iguais"
                              })}
                              className="form-control h-10 text-white form-control-sm inputPlaceholder pe-5"
                              placeholder="Confirme o email"
                              id="confirmar-email"
                            />
                            {valorCampo.confirmarEmail && (
                              <button type="button" onClick={() => limparCampo("confirmarEmail")}
                                      className="position-absolute top-50 end-0 translate-middle-y me-2"
                              >
                                <i className="pi pi-times small"></i>
                              </button>
                            )}
                          </div>
                            {errors.confirmarEmail &&
                              <span className="error text-zinc-300" style={{ fontSize: '10px'}}>{errors.confirmarEmail.message}</span>}
                          </FormGroup>
                        </div>

                        {/**
                         campo senha
                         */}
                        <FormGroup label={
                          <span>
                            Senha: <Astered>*</Astered>
                          </span>
                        }>
                          <div className="position-relative">
                            <input
                              type={ showSenha ? "text" : "password" }
                              {...register("senha", {
                                required: "A senha é obrigatória",
                                minLength: {
                                  value: 6,
                                  message: "A senha deve ter no mínimo 6 caracteres",
                                },
                                validate: validateSenhaTrim,
                              })}
                              className="form-control h-10 form-control-sm text-white inputPlaceholder pe-5"
                              placeholder="Digite sua senha"
                              id="senha"
                              style={{ paddingRight: '4.5rem' }}
                            />
                            { valorCampo.senha && (
                              <button type="button" onClick={() => limparCampo("senha")}
                                      className="position-absolute top-50 end-0 translate-middle-y me-5"
                              >
                                <i className="pi pi-times small"></i>
                              </button>
                            )}
                            {/**
                             visibilidade de senha
                             */}
                            <SenhaVisibilityToggle
                              mostrarSenha={showSenha}
                              onClick={toggleSenhaVisibility}
                            />
                          </div>
                          {/**
                           Passa o valor atual da senha para o componente de força
                           */}
                          <span className="text-sm">
                            <PasswordStrengthMeter senha={ forcaSenha } />
                          </span>
                          {errors.senha &&
                            <span className="error text-zinc-300"
                                  style={{ fontSize: '10px'}}>{errors.senha.message}</span>}
                        </FormGroup>

                        {/**
                         campo confirmar senha
                         */}
                        <FormGroup label={
                          <span>
                            Confirmar senha: <Astered>*</Astered>
                          </span>
                        }>
                          <div className="position-relative">
                            <input
                              type={showSenhaConfirmada ? "text" : "password"}
                              {...register("confirmarSenha", {
                                required: "Confirme a senha",
                                validate: (value) =>
                                  value === watch("senha") || "As senhas não são iguais",
                              })}
                              className="form-control h-10 form-control-sm text-white inputPlaceholder pe-5"
                              placeholder="Confirme a senha"
                              id="confirmar-senha"
                              style={{ paddingRight: '4.5rem' }}
                            />
                            {valorCampo.confirmarSenha && (
                              <button type="button" onClick={() => limparCampo("confirmarSenha")}
                                      className="position-absolute top-50 end-0 translate-middle-y me-5"
                              >
                                <i className="pi pi-times small"></i>
                              </button>
                            )}
                            <SenhaVisibilityToggle
                              mostrarSenhaConfirmacao={showSenhaConfirmada}
                              onClick={toggleSenhaConfirmadaVisibility}
                              isConfirmacao={true}
                            />
                          </div>
                          {errors.confirmarSenha &&
                            <span className="error text-zinc-300"
                                  style={{ fontSize: '10px'}}>{errors.confirmarSenha.message}</span>}
                        </FormGroup>

                        {/**
                         checklist de senha
                         **/}
                        <div className="text-sm px-4 py-2 justify-center items-center ">
                          {(senhaDigitada?.length > 0 || confirmarSenha?.length > 6) && mostrarChecklist && ( 
                            <ReactPasswordChecklist
                              rules={[
                                "minLength",
                                "specialChar",
                                "number",
                                "lowercase",
                                "noSpaces",
                                "match",
                              ]}
                              minLength={8}
                              value={watch("senha")}
                              valueAgain={watch("confirmarSenha")}
                              className="password-checklist check-icon cross-icon"
                              messages={{
                                minLength: "A senha deve ter no mínimo 6 caracteres",
                                specialChar: "Deve conter caractere especial - !@#$%+",
                                number: "Deve conter número",
                                capital: "Deve conter letra maiúscula",
                                lowercase: "Deve conter letra minúscula",
                                noSpaces: "Não deve conter espaços",
                                match: "As senhas coincidem",
                              }}
                              onChange={(isValid) => setIsValid(isValid)}
                            />
                          )}
                        </div>

                        {/**
                         Botão de cadastro
                         */}
                        <div className="md:col-span-2 flex flex-row gap-2">
                          <button
                            type="submit"
                            className="w-full p-2 rounded btn btn-success btn-sm mt-2 "
                            // disabled={!isValid}
                          >
                            <i className="bi bi-floppy"></i> Cadastrar
                          </button>

                          {/**
                           Botão para Login
                           */}
                          <button
                            type="button"
                            className="w-full p-2 rounded btn btn-danger btn-sm mt-2"
                            onClick={handleCancelar}
                          >
                            <i className="bi bi-x-lg"></i> Cancelar
                          </button>
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
    </div>
  );
}
export default CadastrarUsuario;