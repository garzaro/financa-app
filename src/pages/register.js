import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import Card from "../components/card";
import FormGroup from "../components/form-group";
import Astered from "../components/astered";
import ServiceUsuario from "../app/service/usuarioService";

const Register = () => {
    const [dadosDoUsuario, setDadosDoUsuario] = useState({
        nome: '', cpf:'', usuario:'', email: "", emailNovamente:'',
    });
    const navigate = useNavigate();
    const {register, handleSubmit, formState:{errors},} = useForm({});
    const usuarioService = ServiceUsuario();
    /*contexto do cadastro*/
    const cadastrar = () => {
        usuarioService.salvarUsuario({
            ...dadosDoUsuario
        })
    }
    /*redirecionar para cadastro de senha*/
    const handleAvancar = () =>{
        setTimeout(() => navigate("/FormularioSenha"), 2000 );
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
                                        <form onSubmit={handleSubmit()}>
                                            {/*campo nome completo*/}
                                            <FormGroup label={
                                                <span>
                                                    Nome completo:<Astered>*</Astered>
                                                </span>
                                            } name={dadosDoUsuario.nome}
                                            >
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
                                            } name={dadosDoUsuario.cpf}>
                                                <input type="text"
                                                       {...register("cpf", {required: "O cpf é obrigatório"})}
                                                       className="form-control form-control-sm inputPlaceholder"
                                                       placeholder="Digite seu CPF"/>
                                                {errors.cpf && <span className="error">{errors.cpf.message}</span>}
                                            </FormGroup>
                                            {/*campo nome usuario*/}
                                            <FormGroup label={
                                                <span>
                                                    Nome de Usuário:<Astered>*</Astered>
                                                </span>
                                            } name={dadosDoUsuario.usuario}>
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
                                            } name={dadosDoUsuario.email}>
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
                                            } name={dadosDoUsuario.emailNovamente}>
                                                <input type="email"
                                                       {...register("emailNovamente", {required: "Digite o email novamente"})}
                                                       className="form-control form-control-sm inputPlaceholder"
                                                       placeholder="Digite seu email novamente"/>
                                                {errors.emailNovamente && <span className="error">{errors.emailNovamente.message}</span>}
                                            </FormGroup>
                                            {/* Botão de cadastro*/}
                                            <button className="btn btn-success btn-sm mt-2" onClick={handleAvancar}>
                                                Avançar
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