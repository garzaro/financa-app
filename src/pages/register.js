import React, {useState, useEffect} from 'react';
import { useForm } from "react-hook-form";
import axios from "axios";
import Card from '../components/card';
import FormGroup from "../components/form-group";
import Astered from "../components/astered";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";

/*pagina de cadastro de usuarios*/
function Register () {
    const [nomeCompleto, setNomeCompleto] = useState('');
    const [cpf, setCpf] = useState('');
    const [nomeUsuario, setNomeUsuario] = useState('');
    const [email, setEmail] = useState('');
    const [emailNovamente, setEmailNovamente] = useState('');
    const [erro, setErro] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    /*ciclo de vida*/
    const SalvarUsuario = () => {
        useEffect(() => {
            const salvarUsuario = async () => {
                try {
                    const response = await axios.post(`http://localhost:8080/api/usuarios`);
                } catch (err) {
                    /*tentar trazer a mesangem de erro de rede do backend*/
                    setErro(err.response?.data.message || err.response?.data);
                } finally {
                    setLoading(false);
                }
            };
            salvarUsuario();
        },[]);
    }
    /*redirecionar para cadastro de senha*/
    const handleAvancar = () =>{
        setTimeout(() => navigate("/FormularioSenha"), 2000);
    }
    /*cancelar cadastro de usuario*/
    function handleCancelar() {
        setTimeout(() => navigate('/Login'), 1000);
    };
   /* const AsteriscoVermelho = styled.span`
        color: red;
    `;*/
    return (
        <div className="container-fluid mt-5 style={{minHeight: '0vh', display: 'flex', flexDirection: 'column', alignItens:'center'}}>}}" >
            <div className="row justify-content-center w-100" >
                <div className="col-md-6">
                    <div className="bs-docs-section">
                        <Card title="Cadastro de Usuário">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="bs-component">
                                        <form onSubmit={handleSubmit(SalvarUsuario)}>
                                            {/*campo nome completo*/}
                                            <FormGroup label={
                                                <span>
                                                    Nome Completo:<Astered>*</Astered>
                                                </span>
                                                } name={"nomeCompleto"}
                                                >
                                                <input
                                                    type="nomeCompleto"
                                                    {...register("nomeCompleto", {required: "Nome completo é obrigatório"})}
                                                    className="form-control form-control-sm inputPlaceholder"
                                                    placeholder="Digite seu nome completo"
                                                    id="nomeCompleto"
                                                />
                                                {errors.nomeCompleto && <span className="error">{errors.nomeCompleto.message}</span>}
                                            </FormGroup>
                                            {/*campo cpf*/}
                                            <FormGroup label={
                                                <span>
                                                    Cadastro Pessoa Física:<Astered>*</Astered>
                                                </span>
                                            } name={"cpf"}
                                            >
                                                <input
                                                    type="text"
                                                    {...register("cpf", {required: "O cpf é obrigatório"})}
                                                    className="form-control form-control-sm inputPlaceholder"
                                                    placeholder="Digite seu CPF"
                                                />
                                                {errors.cpf && <span className="error">{errors.cpf.message}</span>}
                                            </FormGroup>
                                            {/*campo nome usuario*/}
                                            <FormGroup label={
                                                <span>
                                                    Nome de Usuário:<Astered>*</Astered>
                                                </span>
                                            } name={"nomeUsuario"}
                                            >
                                                <input
                                                    type="text"
                                                    {...register("nomeUsuario", {required: "Nome de usuário é obrigatório"})}
                                                    className="form-control form-control-sm inputPlaceholder"
                                                    placeholder="Digite o nome de usuário"
                                                />
                                                {errors.nomeUsuario && <span className="error">{errors.nomeUsuario.message}</span>}
                                            </FormGroup>
                                            {/*campo email*/}
                                            <FormGroup label={
                                                <span>
                                                    Email:<Astered>*</Astered>
                                                </span>
                                            } name={"email"}
                                            >
                                                <input
                                                    type="email"
                                                    {...register("email", {required: "Email é obrigatório"})}
                                                    className="form-control form-control-sm inputPlaceholder"
                                                    placeholder="Digite seu email"
                                                />
                                                {errors.email && <span className="error">{errors.email.message}</span>}
                                            </FormGroup>
                                            {/*campo repetir email*/}
                                            <FormGroup label={
                                                <span>
                                                    Repetir email:<Astered>*</Astered>
                                                </span>
                                            } name={"emailNovamente"}
                                            >
                                                <input
                                                    type="email"
                                                    {...register("emailNovamente", {required: "Digite o email novamente"})}
                                                    className="form-control form-control-sm inputPlaceholder"
                                                    placeholder="Digite seu email novamente"
                                                />
                                                {errors.emailNovamente && <span className="error">{errors.emailNovamente.message}</span>}
                                            </FormGroup>
                                            {/* Botão de Login */}
                                            <button type="submit" className="btn btn-success btn-sm mt-3" onClick={handleAvancar}>Avançar</button>
                                            &nbsp;&nbsp;
                                            <button type="button" className="btn btn-danger btn-sm mt-3" onClick={handleCancelar}>Cancelar</button>
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
export default Register;











