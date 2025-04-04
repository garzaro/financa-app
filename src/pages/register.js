import React, {useState} from 'react';
import Card from '../components/card';
import FormGroup from "../components/form-group";
import Astered from "../components/astered";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";

/*pagina de cadastro de usuarios*/
function Register () {
    /*estados para armazenamento e status de carregamento, e erro*/
    const [nomeCompleto, setNomeCompleto] = useState('');
    const [cpf, setCpf] = useState('');
    const [nomeUsuario, setNomeUsuario] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();





    function handleCancelar() {
        navigate('/Login');
    }

   /* const AsteriscoVermelho = styled.span`
        color: red;
    `;*/
    return (
        <div className="container-fluid mt-5 style={{minHeight: '0vh', display: 'flex', alignItems: 'center'">
            <div className="row justify-content-center w-100">
                <div className="col-md-6" style={{ marginTop: '-30px' }}> {/*style={{ marginTop: '-120px' }}*/}
                    <div className="bs-docs-section">

                        <Card title="Cadastro de Usuário">
                            <div className="row justify-content-center align-items-center">
                                <div className="col-md-10">
                                    <div className="bs-component">
                                        <fieldset className="fieldset-sm">
                                            <FormGroup label={
                                                <span>
                                                Nome Completo: <Astered>*</Astered>
                                                </span>
                                            } name="nome-completo">
                                                <input type="text"
                                                       className="form-control form-control-sm inputPlaceholder"
                                                       id="nome-completo"
                                                       placeholder="Digite seu nome"
                                                />
                                            </FormGroup>

                                            <FormGroup label={
                                                <span>
                                                Cadastro Pessoa Física: <Astered>*</Astered>
                                            </span>
                                            } name="cpf">
                                                <input type="text"
                                                       className="form-control form-control-sm inputPlaceholder"
                                                       id="cpf"
                                                       placeholder="Digite seu nome cpf"
                                                />
                                            </FormGroup>

                                            <FormGroup label={
                                                <span>
                                                Nome de Usuário: <Astered>*</Astered>
                                            </span>
                                            } name="nome-usuario">
                                                <input type="text"
                                                       className="form-control form-control-sm inputPlaceholder"
                                                       id="nome-usuario"
                                                       placeholder="Nome de usuário"
                                                />
                                            </FormGroup>

                                            <FormGroup label={
                                                <span>
                                                Email: <Astered>*</Astered>
                                            </span>
                                            } name="email">
                                                <input type="email"
                                                       className="form-control form-control-sm inputPlaceholder"
                                                       id="email"
                                                       placeholder="Digite o email"
                                                />
                                            </FormGroup>

                                            {/*repetir*/}
                                            <FormGroup label={
                                                <span>
                                                Confirmar Email: <Astered>*</Astered>
                                            </span>
                                            } name="confirmar-email">
                                                <input type="email"
                                                       className="form-control form-control-sm inputPlaceholder"
                                                       id="repetir-email"
                                                       placeholder="Confirme o email"
                                                />
                                            </FormGroup>

                                            <button type="submit" className="btn btn-success mt-3">Confirmar</button>
                                            &nbsp;&nbsp;
                                            <button type="button" className="btn btn-danger mt-3" onClick={handleCancelar}>Cancelar</button>
                                        </fieldset>
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







