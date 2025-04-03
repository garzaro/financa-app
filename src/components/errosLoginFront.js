import React from 'react';

const ErrosLoginFront = ({ mensagensDeAlerta }) => {
    return (
        <>
            {/* se email e senha estiver ok - Mensagem de sucesso */}
            <div className="row card-custom">
                {mensagensDeAlerta.loginBemSucedido && (
                    <div className="alert alert-warning">
                        {mensagensDeAlerta.loginBemSucedido}
                    </div>
                )}
            </div>

            {/* campos vazios, email fora do padrao - Mensagem de erro
                se nao der certo o login vai retornar mensagemErroLogin*
                Object.key - funcao do javascript que retorna um array com as propriedades do objeto - mensagemErroLogin
                No caso de mensagemErroLogin, que é um objeto, Object.keys(mensagemErroLogin) retorna um array com
                as chaves desse objeto.
                values - retorna um array com os valores de um objeto - mensagemErroLogin
                .map - itera sobre o array retornado por values. Para cada valor (mensagem de erro)
                no array, ele retorna um elemento <li> com a mensagem de erro
                .entries - para certificarse que apenas strings sera renderizada

                {/*className={`form-control form-control-sm inputPlaceholder ${mensagensDeAlerta && 'is-invalid'}`}
            */}
            {Object.keys(mensagensDeAlerta).length > 0 && !mensagensDeAlerta.loginBemSucedido && (
                <div className="alert alert-danger card-custom">
                    <ul>
                        {Object.entries(mensagensDeAlerta).map(([key, value]) => {
                            // Se o valor for um objeto, extrai a mensagem de erro do login
                            const mensagemErro = value.mensage || value;
                            return <li key={key}>{mensagemErro}</li>;
                        })}
                    </ul>
                </div>
            )}
        </>
    );
};

export default ErrosLoginFront;