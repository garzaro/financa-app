import React from 'react';

const ErroConexao = () => {
    return (
        <div style={styles.container}>
            <div style={styles.animation}></div>
            <h1 style={styles.message}>Ops! Parece que o servidor está desligado.</h1>
            <p style={styles.subMessage}>Tente novamente mais tarde. 😢</p>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f0f0f0',
        margin: 0,
    },
    animation: {
        width: '80px',
        height: '80px',
        border: '10px solid #ccc',
        borderTop: '10px solid #3498db',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
    },
    message: {
        marginTop: '20px',
        fontSize: '1.5rem',
        color: '#555',
        textAlign: 'center',
    },
    subMessage: {
        marginTop: '10px',
        fontSize: '1rem',
        color: '#777',
    },
};

// Adicionando animação no estilo global
const spinAnimation = `@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}`;

const styleTag = document.createElement('style');
styleTag.innerHTML = spinAnimation;
document.head.appendChild(styleTag);

export default ErroConexao;
