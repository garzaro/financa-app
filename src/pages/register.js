import {useState} from "react";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import ServiceUsuario from "../app/service/usuarioService";
import {mensagemDeErroCadastro} from "../utils/toastr";
import Card from "../components/card";
import FormGroup from "../components/form-group";
import Astered from "../components/astered";
import Swal from "sweetalert2";
import {handleCpfChange} from "../utils/utils";

const Register = () => {
    const {register, handleSubmit, setValue, watch, formState:{errors}} = useForm();
    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState("");
    const [usuario, setUsuario] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarEmail, setConfirmarEmail] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");

    const navigate = useNavigate();
    const usuarioService = ServiceUsuario();
    /*contexto do cadastro*/
    const cadastrarUsuario = (data) => {
        const usuario = {
            nome: data.nome,
            cpf: data.cpf,
            usuario: data.usuario,
            email: data.email,
            senha: data.senha,
        }
        usuarioService.salvar(usuario)
        .then(function (response) {
            Swal.fire({
                icon: 'success',
                title: 'Cadastro efetuado com sucesso!',
                text: 'Você será redirecionado para a página de login.',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading()
                    Swal.getHtmlContainer().querySelector('.swal2-progress-bar')
                    const barraDeProgresso = Swal.getHtmlContainer().querySelector('.swal2-progress-bar')
                    barraDeProgresso.style.backgroundColor = '#3498db'
                }
            })
            navigate('/login');
        }).catch((err) => {
            //const msg = err.response.data?.message || err.response.data || "Erro inesperado ao cadastrar usuário. Tente novamente mais tarde";
            mensagemDeErroCadastro(err.response?.data)
        });
        /*limpar campos - FAZER UM TEST SEM REDIRECIONAMENTO PARA LOGIN A FIM DE VER SE OS CAMPOS SAO LIMPOS
        setValue('nome', '');
        setValue('cpf', '');
        setValue('usuario', '');
        setValue('email', '');
        setValue('emailNovamente', '');
        setValue('senha', '');
        setValue('senhaNovamente', '');*/
    }
    /*comparacao de senha*/
    const repetirSenha = watch('senha');
    /*comparacao de email*/
    const repetirEmail = watch('email')
    /*mascara cpf*/
    const handleCpfMask = (e) => {
        const mascaraCpf = handleCpfChange(e.target.value);
        setValue('cpf', mascaraCpf);
    }
    /*cancelar cadastro de usuari - retornar para logino*/
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
                                                       {...register("nome", {required: "Nome completo é obrigatório", maxLength: {
                                                           value: 100, message: "Máximo de 100 caracteres"}})}
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
                                                <input
                                                    type="text"
                                                    className={`form-control form-control-sm inputPlaceholder
                                                    ${errors.cpf ? 'is-invalid' : ''}`}
                                                    placeholder="000.000.000-00"
                                                    id="floatingInputCpf"
                                                    {...register("cpf", {required: "O CPF é obrigatório",
                                                        onChange: (e)=> {handleCpfMask(e);} /* ✅ */
                                                    })}
                                                />
                                                {errors.usuario && <span className="error">{errors.usuario.message}</span>}
                                            </FormGroup>
                                             {/*campo nome usuario*/}
                                            <FormGroup label={
                                                <span>
                                                    Nome de Usuário:<Astered>*</Astered>
                                                </span>
                                            }>
                                                <input type="text"
                                                       {...register("usuario", {required: "Nome de usuário é obrigatório", maxLength: {
                                                               value: 20, message: "Máximo de 20 caracteres"}})}
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
                                                       {...register("email", {required: "Email é obrigatório",
                                                           minLength: {
                                                               value: 6,
                                                               message: "Senha deve ter pelo menos 8 caracteres"
                                                       }})}
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
                                                       {...register("emailNovamente",
                                                       {validate: (value) => value === repetirEmail || "Digite o email novamente"})}
                                                       className="form-control form-control-sm inputPlaceholder"
                                                       placeholder="Digite seu email novamente"/>
                                                {errors.emailNovamente && <span className="error">{errors.emailNovamente.message}</span>}
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
                                            {/*campo repetir senha*/}
                                            <FormGroup label={
                                                <span>
                                                    Repetir senha:<Astered>*</Astered>
                                                </span>
                                            }>
                                                <input type="password"
                                                       {...register("senhaNovamente",
                                                           {validate: (value) => value === repetirSenha || "Digite a senha novamente"})}
                                                       className="form-control form-control-sm inputPlaceholder"
                                                       placeholder="Digite a senha novamente"/>
                                                {errors.senhaNovamente && <span className="error">{errors.senhaNovamente.message}</span>}
                                            </FormGroup>

                                            {/* Botão de cadastro*/}
                                            <button className="btn btn-success btn-sm mt-2" onClick={cadastrarUsuario}>
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