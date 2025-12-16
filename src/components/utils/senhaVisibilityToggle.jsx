import React from "react";
import PropTypes from "prop-types";

const SenhaVisibilityToggle = ({mostrarSenha, mostrarSenhaConfirmar, onClick}) => {
  return (
    <span
      className="position-absolute top-50 translate-middle-y end-0 pe-3"
      onClick={onClick}
      style={{ cursor: 'pointer' }}
      aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
    >
            {mostrarSenha ? (
              <i className="bi-eye-slash-fill"></i>
            ) : (
              // Ícone de olho (mostrar senha)
              <i className="bi-eye-fill"></i>
            )}

      {/* Exemplo de SVG para caso não use Bootstrap Icons: */}
      {/*{mostrarSenha ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-slash" viewBox="0 0 16 16">
                    <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.936 6.572-.002 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588M5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.936 1.428-2.072 2.614l-1.782-1.782a3.5 3.5 0 0 0-4.249-4.249zm2.452 3.636l-.707.707a1.5 1.5 0 0 0 2.121 2.121l.707-.707-.707-.707-.707-.707z"/>
                    <path d="M13.682 10.217l-3.322-3.322c.287-.324.5-.66.696-.997.319-.665.62-1.293.856-1.898l2.353-2.353a.5.5 0 0 1 .708.708l-.511.511zm-1.859 1.859a2.5 2.5 0 0 1-3.393 3.392L3.5 13.5l-1.393 1.393a.5.5 0 0 1-.707-.707L2.793 12.8 5.3 10.293 8.12 7.473a2.5 2.5 0 0 1 3.563 3.563zm-.124-.124l-3.238-3.238a3.5 3.5 0 0 1-4.73 4.73l-1.761-1.761a.5.5 0 0 1 .708-.708L7.02 12.871l-1.761 1.761a3.5 3.5 0 0 1 4.73-4.73z"/>
                </svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
                    <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
                </svg>
            )}*/}
        </span>
  );
};
/*validacao das propriedades para o componente
SenhaVisibilityToggle.propTypes = {
    mostrarSenha: PropTypes.bool,
    onClick: PropTypes.func.isRequired
}*/
export default SenhaVisibilityToggle;