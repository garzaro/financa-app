import React from "react";
import Card from "../components/card";
import FormGroup from "../components/form-group";

class CadastroDeUsuario extends React.Component {

    state = {
        nomeCompleto: '',
        nomeUsuario: '',
        cpf:'',
        email:'',
        emailConfirmado:'',
        senha:'',
        senhaConfirmada:''

    }

    constructor(props) {
        super(props);
    }

    cadastrarUsuario = ()=> {

        console.log(this.state);






    }

    cancelarCadastro = () => {
        this.props.history.push('/login');
    }

    render() {
        return (

            <div className="container" style={{minHeight: '0vh', display: 'flex', alignItems: 'center'}}>
                <div className="row justify-content-center w-100">
                    <div className="col-md-6" style={{ marginTop: '-90px' }}>
                        <div className="bs-docs-section">

                            <Card title="Cadastro de Usuário">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="bs-component">

                                            <FormGroup label="Nome Completo: *" htmlFor="inputNomeCompleto">
                                                <input type="text"
                                                       id="inputNomeCompleto"
                                                       className="form-control"
                                                       name="nomeCompleto"

                                                       onChange={e => this.setState({nomeCompleto: e.target.value})}

                                                       placeholder="versao do yarn curso é a 1.19.0 lts"
                                                       required
                                                />
                                            </FormGroup>
                                            <br/>
                                            <FormGroup label="Nome Usuário: *" htmlFor="inputNomeUsuario">
                                                <input type="text"
                                                       id="inputNomeUsuario"
                                                       className="form-control"
                                                       name="nomeUsuario"

                                                       onChange={e => this.setState({nomeUsuario: e.target.value})}

                                                       placeholder="versao do create-react-app curso é a 3.1.2"
                                                       required
                                                />
                                            </FormGroup>
                                            <br/>
                                            <FormGroup label="Cadastro Pessoa Física: *" htmlFor="inputCpf">
                                                <input type="text"
                                                       id="inputCpf"
                                                       className="form-control"
                                                       name="cpf"

                                                       onChange={e => this.setState({cpf: e.target.value})}

                                                       placeholder="digite o CPF"
                                                       required
                                                />
                                            </FormGroup>
                                            <br/>
                                            <FormGroup label="Email: *" htmlFor="inputEmail">
                                                <input type="email"
                                                       id="inputEmail"
                                                       className="form-control"
                                                       name="email"

                                                       onChange={e => this.setState({email: e.target.value})}

                                                       placeholder="digite o email"
                                                       required
                                                />
                                            </FormGroup>

                                            <FormGroup label="Confirmar email: *" htmlFor="inputConfirmarEmail">
                                                <input type="text"
                                                       id="inputConfirmarEmail"
                                                       className="form-control"
                                                       name="confirmarEmail"

                                                       onChange={e => this.setState({confirmarEmail: e.target.value})}

                                                       placeholder="confirme o email"
                                                       required
                                                />
                                            </FormGroup>
                                            <br/>
                                            <FormGroup label="Senha: *" htmlFor="inputSenha">
                                                <input type="password"
                                                       id="inputSenha"
                                                       className="form-control"
                                                       name="senha"

                                                       onChange={e => this.setState({senha: e.target.value})}

                                                       placeholder="digite a senha"
                                                       required
                                                />
                                            </FormGroup>
                                            <FormGroup label="Confirme a senha: *" htmlFor="inputConfirmaSenha">
                                                <input type="password"
                                                       id="inputConfirmarSenha"
                                                       className="form-control"
                                                       name="confirmarSenha"

                                                       onChange={e => this.setState({confirmarSenha: e.target.value})}

                                                       placeholder="confirmar a senha"
                                                       required
                                                />
                                            </FormGroup>
                                            <br/>
                                            <button onClick={this.cadastrarUsuario} type="button" className="btn btn-success">
                                                <i className="pi pi-save"></i>Salvar
                                            </button>
                                            &nbsp;
                                            <button onClick={this.cancelarCadastro} type="button" className="btn btn-danger">
                                                Cancelar
                                            </button>

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
export default CadastroDeUsuario;