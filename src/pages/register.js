import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
/*lembrando que o name é criado automaticamente pelo react-hook-form */
import {useForm} from "react-hook-form";
import ReactPasswordChecklist from "react-password-checklist";
import Card from "../components/card/card";
import FormGroup from "../components/form/form-group";
import Astered from "../components/utils/astered";
import ServiceUsuario from "../app/service/usuarioService";
import Swal from "sweetalert2";
import {mensagemDeAlerta, mensagemDeSucesso} from "../components/utils/toastr";
import {handleCpfChange, validateSenhaTrim} from "../components/utils/utils";

const Register = () => {
    const {register, handleSubmit, setValue, watch, formState:{errors},} = useForm({
        defaultValues: {
            nome: '', cpf: '', usuario: '', email: '',senha: '',
            confirmarEmail: '', confirmarSenha: '',
        }
    });
    const [senha, setSenha] = useState('');
    const [isValid, setIsValid] = useState(true);
    const navigate = useNavigate();
    const usuarioService = ServiceUsuario();
    /*contexto do cadastro*/
    const cadastrarUsuario = (data) => {
        const dadosDoUsuario = {
            nome: data.nome, cpf: data.cpf, usuario: data.usuario,
            email: data.email, senha: data.senha,
        }
        usuarioService.salvar(dadosDoUsuario)
        .then(response => {
            mensagemDeSucesso("Usuario cadastrado com sucesso! Faça o login para continuar")
            setTimeout(navigate('/login'), 2000);
        }).catch(err => {
            mensagemDeAlerta(
                err.response.data?.message ||
                err.response.data ||
                "Erro inesperdo ao cadastrar. Tente novamente mais tarde.")
        });
    }
    /*macara cpf*/
    const handleCpfMask = (e) => {
        const mascaraCpf = handleCpfChange(e.target.value);
        setValue('cpf', mascaraCpf);
    }
    /*verificacao de senhas*/
    const senhaDigitada = watch("senha");
    const confirmarSenha = watch('confirmarSenha');
    /*verificação de email*/
    const confirmarEmail = watch('email');

    /*cancelar cadastro de usuario*/
    function handleCancelar() {
        navigate('/Login');
    };
    return (
        <div className="container-fluid mt-5"> {/*style={{minHeight: '0vh', display: 'flex', flexDirection: 'column', alignItens:'center'}}>">*/}
            <div className="row justify-content-center w-10">
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
                                                       {...register("cpf", {required: "O cpf é obrigatório",
                                                       onChange: handleCpfMask})}
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
                                                       {...register("confirmarEmail",
                                                           {validate:(value) => value === confirmarEmail || "Os emails não são iguais"})}
                                                       className="form-control form-control-sm inputPlaceholder"
                                                       placeholder="Confirme o email"/>
                                                {errors.confirmarEmail && <span className="error">{errors.confirmarEmail.message}</span>}
                                            </FormGroup>
                                            {/*campo senha*/}
                                            <FormGroup label={
                                                <span>
                                                    Senha:<Astered>*</Astered>
                                                </span>
                                            }>
                                                <input
                                                    type="password"
                                                    {...register("senha", {
                                                        required: "A senha é obrigatória",
                                                        minLength: {
                                                            value: 6,
                                                            message: "A senha deve ter no mínimo 6 caracteres",
                                                        },
                                                        validate: validateSenhaTrim,
                                                    })}
                                                    className="form-control form-control-sm inputPlaceholder"
                                                    placeholder="Digite sua senha"
                                                />
                                                {errors.senha && <span className="error">{errors.senha.message}</span>}
                                            </FormGroup>
                                            {/* campo confirmar senha */}
                                            <FormGroup label={
                                                <span>
                                                    Confirmar senha:<Astered>*</Astered>
                                                </span>
                                            }>
                                                <input
                                                    type="password"
                                                    {...register("confirmarSenha", {
                                                        validate: (value) =>
                                                            value === watch("senha") || "As senhas não são iguais",
                                                    })}
                                                    className="form-control form-control-sm inputPlaceholder"
                                                    placeholder="Confirme a senha"
                                                />
                                                {errors.confirmarSenha && <span className="error">{errors.confirmarSenha.message}</span>}
                                            </FormGroup>
                                            {/* checklist de senha */}
                                            {(watch("senha")?.length > 0 || watch("confirmarSenha")?.length > 0) && (
                                                <ReactPasswordChecklist
                                                    rules={[
                                                        "minLength",
                                                        "specialChar",
                                                        "number",
                                                        "capital",
                                                        "lowercase",
                                                        "noSpaces",
                                                        "match",
                                                    ]}
                                                    minLength={8}
                                                    value={watch("senha")}
                                                    valueAgain={watch("confirmarSenha")}
                                                    className="password-checklist check-icon cross-icon"
                                                    messages={{
                                                        minLength: "A senha deve ter no mínimo 8 caracteres",
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

                                            {/* Botão de cadastro*/}
                                            <button className="btn btn-success btn-sm mt-2" type="submit" disabled={!isValid}>
                                                Cadastrar
                                            </button>
                                            {/* Botão para Login */}
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