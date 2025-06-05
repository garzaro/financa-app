import React from "react";
import PropTypes from "prop-types";

const SenhaVisibilityToggle = ({
    mostrarSenha,
    mostrarSenhaConfirmacao,
    onClick,
    onClickConfirmacao,
    isConfirmacao
}) => {
    return (
        <>
            <span
                className="position-absolute top-50 translate-middle-y end-0 pe-3"
                onClick={onClick}
                style={{ cursor: 'pointer' }}
                aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
            >
                {mostrarSenha ? (
                    <i className="bi-eye-slash-fill"></i>
                ) : (
                    <i className="bi-eye-fill"></i>
                )}
            </span>
            <span
                className="position-absolute top-50 translate-middle-y end-0 pe-3"
                onClick={onClick}
                style={{ cursor: 'pointer' }}
                aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
            >
                {mostrarSenhaConfirmacao ? (
                    <i className="bi-eye-slash-fill"></i>
                ) : (
                    <i className="bi-eye-fill"></i>
                )}
            </span>
        </>
    );
};
/*validacao das propriedades para o componente*/
SenhaVisibilityToggle.propTypes = {
    mostrarSenha: PropTypes.bool.isRequired,
    mostrarSenhaConfirmacao: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired
}
export default SenhaVisibilityToggle;