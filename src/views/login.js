import React from "react";
import Card from "../components/card";
import FormGroup from "../components/form-group";

class Login extends React.Component {

    state = {

        email: '',
        senha: ''

    }

    constructor() {
        super();

    }

    logar = () => {

        console.log('Email:', this.state.email);
        console.log('Senha:', this.state.senha);

        this.service.autenticar({
            email: this.state.email,
            senha: this.state.email,
        }).then(response => {
            this.context.in({})
        })
    }

    render() {
        return (
            <div className="container">
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

                                                           value={this.state.email}
                                                           onChange={event => this.setState({ email: event.target.value })}

                                                           className="form-control inputPlaceholder"
                                                           id="exampleInputEmail1"
                                                           aria-describedby="emailHelp"
                                                           name="email"
                                                           placeholder="versao do node curso é a 10.16.3 lts"
                                                           required
                                                    />

                                                </FormGroup>

                                                <FormGroup label="Senha: *" htmlFor="exampleInputPassword1">

                                                    <input type="password"

                                                           value={this.state.senha}
                                                           onChange={event =>
                                                               this.setState({
                                                                   senha: event.target.value
                                                               })}

                                                           className="form-control inputPlaceholder"
                                                           id="exampleInputPassword1"
                                                           name="email"
                                                           placeholder="versao do npm curso é a 6.9.0 lts"
                                                           required
                                                    />

                                                </FormGroup>
                                                <br/>

                                                <button onClick={this.logar} className="btn btn-success">
                                                    Entrar
                                                </button>
                                                &nbsp;
                                                <button className="btn btn-danger">Cadastrar</button>

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
    }
}

export default Login;