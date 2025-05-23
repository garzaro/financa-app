import {useState} from "react";
import {useNavigate} from "react-router-dom";
/*lembrando que o name é criado automaticamente pelo react-hook-form */
import {useForm} from "react-hook-form";
import Card from "../components/card";
import FormGroup from "../components/form-group";
import Astered from "../components/astered";
import ServiceUsuario from "../app/service/usuarioService";
import {mensagemDeErroCadastro, mensagemDeSucesso} from "../utils/toastr";

const Register = () => {
    const {control, register, handleSubmit, setValue, watch, formState:{errors},} = useForm({
        defaultValues: {
            nome: '', cpf: '', usuario: '', email: '', senha: '',
             confirmarEmail: '', confirmarSenha: '',
        }
    });
    const navigate = useNavigate();
    const usuarioService = ServiceUsuario();
    /*contexto do cadastro*/
    const cadastrarUsuario = (data) => {
        const usuario = {
            nome: data.nome, cpf: data.cpf, usuario: data.usuario,
            email: data.email, senha: data.senha,
        }
        usuarioService.salvar(usuario)
        .then(function (response){
            mensagemDeSucesso(response.data?.message || "Cadastro efetuado com sucesso!");
            setTimeout(() => navigate("/login"), 2000);
        }).catch(err => {
            mensagemDeErroCadastro(err.response.data?.message || err.response.data ||
                "Erro inesperdao ao cadastrar o usuario. Tente novamente mais tarde.");
        });
    }
    /*cancelar cadastro de usuario*/
    function handleCancelar() {
        navigate('/Login');
    };
    return (
        <div className="container-fluid mt-5 style={{minHeight: '0vh', display: 'flex', flexDirection: 'column', alignItens:'center'}}>}}">
            <div className="row justify-content-center w-100">
                <div className="col-md-6">
                    <div className="bs-docs-section">
                        <Card title="Cadastro de Usuário">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="bs-component">
                                        <form onSubmit={handleSubmit(cadastrarUsuario)}>
                                            {/*campo nome completo*/}
                                            <FormGroup label={
                                                <span>
                                                    Nome completo:<Astered>*</Astered>
                                                </span>
                                            }>
                                                <input type="text"
                                                       {...register("nome", {required: "Nome completo é obrigatório"})}
                                                       className="form-control form-control-sm inputPlaceholder"
                                                       placeholder="Digite seu nome completo"
                                                       id="nome"/>
                                                {errors.nome && <span className="error">{errors.nome.message}</span>}
                                            </FormGroup>
                                            {/*campo cpf*/}
                                            <FormGroup label={
                                                <span>
                                                    Cadastro Pessoa Física:<Astered>*</Astered>
                                                </span>
                                            }>
                                                <input type="text"
                                                       {...register("cpf", {required: "O CPF é obrigatório"})}
                                                       className="form-control form-control-sm inputPlaceholder"
                                                       placeholder="Digite seu CPF"/>
                                                {errors.cpf && <span className="error">{errors.cpf.message}</span>}
                                            </FormGroup>
                                            {/*campo nome usuario*/}
                                            <FormGroup label={
                                                <span>
                                                    Nome de Usuário:<Astered>*</Astered>
                                                </span>
                                            }>
                                                <input type="text"
                                                       {...register("usuario", {required: "Nome de usuário é obrigatório"})}
                                                       className="form-control form-control-sm inputPlaceholder"
                                                       placeholder="Digite o nome de usuário"/>
                                                {errors.usuario && <span className="error">{errors.usuario.message}</span>}
                                            </FormGroup>
                                            {/*campo email*/}
                                            <FormGroup label={
                                                <span>
                                                    Email:<Astered>*</Astered>
                                                </span>
                                            }>
                                                <input type="email"
                                                       {...register("email", {required: "Email é obrigatório"})}
                                                       className="form-control form-control-sm inputPlaceholder"
                                                       placeholder="Digite seu email"/>
                                                {errors.email && <span className="error">{errors.email.message}</span>}
                                            </FormGroup>
                                            {/*campo repetir email*/}
                                            <FormGroup label={
                                                <span>
                                                    Repetir email:<Astered>*</Astered>
                                                </span>
                                            }>
                                                <input type="email"
                                                       {...register("confirmarEmail", {required: "Confirme o email"})}
                                                       className="form-control form-control-sm inputPlaceholder"
                                                       placeholder="Confirmar email"/>
                                                {errors.confirmarEmail && <span className="error">{errors.confirmarEmail.message}</span>}
                                            </FormGroup>
                                            {/*campo senha*/}
                                            <FormGroup label={
                                                <span>
                                                    Senha:<Astered>*</Astered>
                                                </span>
                                            }>
                                                <input type="password"
                                                       {...register("senha", {required: "A senha é obrigatória"})}
                                                       className="form-control form-control-sm inputPlaceholder"
                                                       placeholder="Digite sua senha"/>
                                                {errors.senha && <span className="error">{errors.senha.message}</span>}
                                            </FormGroup>
                                            {/*campo confirmar senha*/}
                                            <FormGroup label={
                                                <span>
                                                    Confirmar senha:<Astered>*</Astered>
                                                </span>
                                            }>
                                                <input type="password"
                                                       {...register("confirmarSenha", {required: "Confirme a senha"})}
                                                       className="form-control form-control-sm inputPlaceholder"
                                                       placeholder="Confirmar a senha"/>
                                                {errors.confirmarSenha && <span className="error">{errors.confirmarSenha.message}</span>}
                                            </FormGroup>
                                            {/* Botão de cadastro*/}
                                            <button className="btn btn-success btn-sm mt-2" onClick={cadastrarUsuario}>
                                                Salvar
                                            </button>
                                            <button className="btn btn-danger btn-sm mt-2" onClick={handleCancelar}>
                                                Cancelar
                                            </button>
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
}
export default Register;