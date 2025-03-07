import React, { useState } from "react";


function Login(){

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const entrar = () => {
        console.log('Email', email);
        console.log('Senha', senha);
    }

    return(
        <>
            <div className="container" style={{ paddingTop: '50px' }}>
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="bs-docs-section">

                            <Card title="Login">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="bs-component">
                                            <fieldset>
                                                <FormGroup label="Email: *" htmlFor="exampleInputEmail1">
                                                    <input type="email"

                                                           value={email}
                                                           onChange={(e) => setEmail(e.target.value)}

                                                           className="form-control" id="exampleInputEmail1"
                                                           aria-describedby="emailHelp"
                                                           placeholder="Digite o Email"
                                                    />
                                                </FormGroup>

                                                <FormGroup label="Senha: *" htmlFor="exampleInputPassword1">
                                                    <input type="password"

                                                           value={senha}
                                                           onChange={(e) => setSenha(e.target.value)}

                                                           className="form-control" id="exampleInputPassword1"
                                                           aria-describedby="senhaHelp"
                                                           placeholder="Digite a Senha"
                                                    />
                                                </FormGroup>
                                                <br/>
                                                <button onClick="window.location.href='home.html'" type="button"
                                                        className="btn btn-success">Entrar
                                                </button>
                                                &nbsp;
                                                <button onClick="window.location.href='usuarios.html'" type="button"
                                                        className="btn btn-danger">Cadastrar
                                                </button>

                                            </fieldset>
                                        </div>
                                    </div>
                                </div>
                            </Card>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;