import React from 'react';
import Card from '../components/Card';
/*cadastro de usuarios*/
const Register = () => {
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <Card>
                        <form>
                            <div className="form-group">
                                <label htmlFor="name">Nome</label>
                                <input type="text" className="form-control" id="name" placeholder="Digite seu nome" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" className="form-control" id="email" placeholder="Digite seu email" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Senha</label>
                                <input type="password" className="form-control" id="password" placeholder="Digite sua senha" />
                            </div>
                            <button type="submit" className="btn btn-primary mt-3">Cadastrar</button>
                        </form>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Register;