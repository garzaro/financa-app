import {useForm} from "react-hook-form";
import axios from "axios";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import Card from "../components/card";
import FormGroup from "../components/form-group";

const CadastroUsuario = () => {
    const [nomeCompleto, setNomeCompleto] = useState("");
    const [cadastroPessoaFisica, setCadastroPessoaFisica ] = useState("");
    const [nomeUsuario, setNomeUsuario] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [repetirSenha, setRepetirSenha] = useState("");
    /*lib react-hook-form*/
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    const [erros, setErros] = useState("");
    const [isServerOffline, setIsServerOffline] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const cadastrarUsuario = async (data) => {
        setIsLoading(true);
        setErros("");
        setIsServerOffline(false);

        try {
            await axios.post("http://localhost:8080/api/usuarios/salvar", {
                nomeCompleto: data.nomeCompleto,
                cadastroPessoaFisica: data.cadastroPessoaFisica,
                nomeUsuario: data.nomeUsuario,
                email: data.email,
                senha: data.senha,
            });
            setTimeout(() => navigate("/senha"), 2000);
        } catch (err) {
            if (err.response) {
                /*Erro do backend (cadastro de usuario)*/
                setErros(err.response.data.message || err.response.data);
            } else {
                /*Servidor offline*/
                setIsServerOffline(true);
                navigate("/erro-conexao");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container-fluid mt-5 style={{minHeight: '0vh', display: 'flex', flexDirection: 'column', alignItens:'center'}}>}}" >
            <div className="row justify-content-center w-100" >
                <div className="col-md-6">
                    <div className="bs-docs-section">

                        {/* Erros do Backend */}
                        {erros && <div className=" alert alert-danger">{erros}</div>}

                        <Card title="Cadastro de Usuários">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="bs-component">
                                        <form onSubmit={handleSubmit(cadastrarUsuario)}>

                                            <FormGroup label={
                                                <span>
                                                    Nome Completo:<span className="asterisco-vermelho">*</span>
                                                </span>
                                            } name={"nomeCompleto"}
                                            >
                                                {/* Campo Nome completo */}
                                                <input
                                                    type="text"
                                                    {...register("nomeCompleto", {required: "Nome completo é obrigatório"})}
                                                    className="form-control form-control-sm inputPlaceholder"
                                                    placeholder="Nome completo"
                                                    id="nomeCompleto"
                                                />
                                                {errors.nomeCompleto && <span className="error">{errors.nomeCompleto.message}</span>}
                                            </FormGroup>

                                            <FormGroup label={
                                                <span>
                                                    Cadastro Pessoa Física:<span className="asterisco-vermelho">*</span>
                                                </span>
                                            } name={"cpf"}
                                            >
                                                {/* Campo CPF */}
                                                <input
                                                    type="text"
                                                    {...register("cadastroPessoaFisica", {required: "O CPF é obrigatório."})}
                                                    className="form-control form-control-sm inputPlaceholder"
                                                    placeholder="CPF"
                                                />
                                                {errors.cadastroPessoaFisica && <span className="error">{errors.cadastroPessoaFisica.message}</span>}
                                            </FormGroup>

                                            <FormGroup label={
                                                <span>
                                                    Nome Usuário:<span className="asterisco-vermelho">*</span>
                                                </span>
                                            } name={"nome-usuario"}
                                            >
                                                {/* Campo nome de usuario */}
                                                <input
                                                    type="text"
                                                    {...register("nomeUsuario", {required: "O nome de usuário é obrigatório."})}
                                                    className="form-control form-control-sm inputPlaceholder"
                                                    placeholder="Usuário"
                                                />
                                                {errors.nomeUsuario && <span className="error">{errors.nomeUsuario.message}</span>}
                                            </FormGroup>

                                            <FormGroup label={
                                                <span>
                                                    Email:<span className="asterisco-vermelho">*</span>
                                                </span>
                                            } name={"email"}
                                            >
                                                {/* Campo email */}
                                                <input
                                                    type="email"
                                                    {...register("email", {required: "O email é obrigatório."})}
                                                    className="form-control form-control-sm inputPlaceholder"
                                                    placeholder="E-mail"
                                                />
                                                {errors.email && <span className="error">{errors.email.message}</span>}
                                            </FormGroup>

                                            <FormGroup label={
                                                <span>
                                                    Repetir email:<span className="asterisco-vermelho">*</span>
                                                </span>
                                            } name={"repetir"}
                                            >
                                                {/* Campo Repetir email */}
                                                <input
                                                    type="email"
                                                    {...register("repetir", {required: "Repetir o email."})}
                                                    className="form-control form-control-sm inputPlaceholder"
                                                    placeholder="repetir"
                                                />
                                                {errors.repetir && <span className="error">{errors.repetir.message}</span>}
                                            </FormGroup>

                                            {/* Botão para salvar cadastro*/}
                                            <button type="submit" disabled={isLoading}
                                                    className="btn btn-success btn-sm mt-3 ">
                                                {isLoading ? "Carregando..." : "Salvar "}
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
};

export default CadastroUsuario;