import React from 'react';
import Card from '../components/Card';
import FormGroup from "../components/form-group";
import {useNavigate} from "react-router-dom";

import styled from "styled-components";

/*pagina de cadastro de usuarios*/
function Register () {
    const navigate = useNavigate();

    function handleCancelar() {
        navigate('/Login');
    }

    const AsteriscoVermelho = styled.span`
        color: red;
    `;
    return (
        <div className="container-fluid mt-5 style={{minHeight: '0vh', display: 'flex', alignItems: 'center'">
            <div className="row justify-content-center w-100">
                <div className="col-md-6" style={{ marginTop: '-80px' }}> {/*style={{ marginTop: '-120px' }}*/}
                    <div className="bs-docs-section">
                        <Card title="Cadastro de Usuário">
                            <div className="row justify-content-center align-items-center">
                                <div className="col-md-12">
                                    <div className="bs-component">
                                        <fieldset>
                                            <FormGroup label={
                                                <span>
                                                Nome Completo: <AsteriscoVermelho>*</AsteriscoVermelho>
                                            </span>
                                            } name="nome-completo">
                                                <input type="text"
                                                       className="form-control inputPlaceholder"
                                                       id="nome-completo"
                                                       placeholder="Digite seu nome"
                                                />
                                            </FormGroup>
                                            <FormGroup label={
                                                <span>
                                                Cadastro Pessoa Física: <AsteriscoVermelho>*</AsteriscoVermelho>
                                            </span>
                                            } name="cpf">
                                                <input type="text"
                                                       className="form-control inputPlaceholder"
                                                       id="cpf"
                                                       placeholder="Digite seu nome cpf"
                                                />
                                            </FormGroup>
                                            <FormGroup label={
                                                <span>
                                                Nome de Usuário: <AsteriscoVermelho>*</AsteriscoVermelho>
                                            </span>
                                            } name="nome-usuario">
                                                <input type="text"
                                                       className="form-control inputPlaceholder"
                                                       id="nome-usuario"
                                                       placeholder="Nome de usuário"
                                                />
                                            </FormGroup>
                                            <FormGroup label={
                                                <span>
                                                Email: <AsteriscoVermelho>*</AsteriscoVermelho>
                                            </span>
                                            } name="email">
                                                <input type="email"
                                                       className="form-control inputPlaceholder"
                                                       id="email"
                                                       placeholder="Digite o email"
                                                />
                                            </FormGroup>
                                            {/*repetir*/}
                                            <FormGroup label={
                                                <span>
                                                Confirmar Email: <AsteriscoVermelho>*</AsteriscoVermelho>
                                            </span>
                                            } name="confirmar-email">
                                                <input type="email"
                                                       className="form-control inputPlaceholder"
                                                       id="repetir-email"
                                                       placeholder="Confirme o email"
                                                />
                                            </FormGroup>
                                            <button type="submit" className="btn btn-success mt-3">Confirmar</button>
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








