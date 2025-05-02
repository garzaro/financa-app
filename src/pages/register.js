import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {mensagemDeAlert} from "../components/toastr";
import Card from "../components/card";
import FormGroup from "../components/form-group";
import Astered from "../components/astered";
import {useCadastroUsuario} from "../context/contextoCadastroUsuario";
import usuarioService from "../app/service/usuarioService";
import ServiceUsuario from "../app/service/usuarioService";


const Register = () => {
    const [nomeCompleto, setNomeCompleto] = useState('');
    const [cpf, setCPF] = useState('');
    const [nomeUsuario, setNomeUsuario] = useState('');
    const [email, setEmail] = useState('');
    const [emailNovamente, setEmailNovamente] = useState('');
    const navigate = useNavigate();
    const {register, handleSubmit, formState:{errors},} = useForm({});

    const onSubmit = data => console.log("Verificação do metodo onValid", data);

    /*contexto do cadastro*/
    /*const {salvarDadosUsuario} = useCadastroUsuario();
    /*preencher o form e redirecionar para senha
    const AvancarCadastrarUsuario = () => {
        salvarDadosUsuario({
            nomeCompleto,
            cpf,
            nomeUsuario,
            email,
        });
        setTimeout(()=> navigate('/FormularioSenha'), 1000);
    }*/
    /*useEffect((data) => {
        usuarioService.salvarUsuario({
            nomeCompleto: nomeCompleto,
            cpf: cpf,
            nomeUsuario: nomeUsuario,
            email: email,
        }).then(response => {
            setTimeout(()=> navigate('/login'));
        }).catch(err=>{
            mensagemDeAlert(err.message);
        })
    }, [])*/
    const usuarioService = ServiceUsuario();
    /*redirecionar para cadastro de senha*/
    const handleAvancar = () =>{
        usuarioService.salvarUsuario({
            nomeCompleto,
            cpf,
            nomeUsuario,
            email,
        }).then(response => {
            setTimeout(() => navigate("/FormularioSenha"), 2000 );
        }).catch(error =>{
            mensagemDeAlert(error.message);
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
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            {/*campo nome completo*/}
                                            <FormGroup label={
                                                <span>
                                                    Nome completo:<Astered>*</Astered>
                                                </span>
                                            } name={nomeCompleto}
                                            >
                                                <input type="nomeCompleto"
                                                       {...register("nomeCompleto", {required: "Nome completo é obrigatório"})}
                                                       className="form-control form-control-sm inputPlaceholder"
                                                       placeholder="Digite seu nome completo"
                                                       id="nomeCompleto"/>
                                                {errors.nomeCompleto && <span className="error">{errors.nomeCompleto.message}</span>}
                                            </FormGroup>
                                            {/*campo cpf*/}
                                            <FormGroup label={
                                                <span>
                                                    Cadastro Pessoa Física:<Astered>*</Astered>
                                                </span>
                                            } name={cpf}>
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
                                            } name={nomeUsuario}>
                                                <input type="text"
                                                       {...register("nomeUsuario", {required: "Nome de usuário é obrigatório"})}
                                                       className="form-control form-control-sm inputPlaceholder"
                                                       placeholder="Digite o nome de usuário"/>
                                                {errors.nomeUsuario && <span className="error">{errors.nomeUsuario.message}</span>}
                                            </FormGroup>
                                            {/*campo email*/}
                                            <FormGroup label={
                                                <span>
                                                    Email:<Astered>*</Astered>
                                                </span>
                                            } name={email}>
                                                <input type="email"
                                                       {...register("email", {required: "Email é obrigatório"})}
                                                       className="form-control form-control-sm inputPlaceholder"
                                                       placeholder="Digite seu email"/>
                                                {errors.email && <span className="error">{errors.email.message}</span>}
                                            </FormGroup>
                                            {/*campo repetir email
                                            <FormGroup label={
                                                <span>
                                                    Repetir email:<Astered>*</Astered>
                                                </span>
                                            } name={emailNovamente}>
                                                <input type="email"
                                                       {...register("emailNovamente", {required: "Digite o email novamente"})}
                                                       className="form-control form-control-sm inputPlaceholder"
                                                       placeholder="Digite seu email novamente"/>
                                                {errors.emailNovamente && <span className="error">{errors.emailNovamente.message}</span>}
                                            </FormGroup>*/}
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