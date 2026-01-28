import React from 'react';
// import bookMedieval from '../../assets/bookMedieval.png';
import livrovelho from '../../assets/livrovelho.png';
// // Se você colocou na pasta 'public', mantenha a variável abaixo como string do caminho:
// const medievalImageSrc = "/medieval-404.png"; // Ou use a variável importada acima

export const PageNotFound = () => {
  // Estilos inline para centralizar e dar o tema
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh', // Ocupa a altura total da tela
      backgroundColor: '#121212', // Fundo bem escuro
      color: '#e0e0e0', // Texto claro
      fontFamily: '"Times New Roman", serif', // Fonte que combina mais com medieval
      padding: '20px',
      textAlign: 'center',
    },
    heading: {
      fontSize: '3rem',
      marginBottom: '2rem',
      textShadow: '2px 2px 4px black',
    },
    image: {
      maxWidth: '50%',
      maxHeight: '600px',
      width: 'auto',
      height: 'auto',
      // boxShadow: '0 10px 25px rgba(0,0,0,0.8)', // Sombra forte para destacar o livro
      borderRadius: '4px',
      // border: '1px solid #333',
    },
    subText: {
      marginTop: '0.1rem',
      fontSize: '1.2rem',
      opacity: 0.5,
      fontFamily: '"MedievalSharp", "Times New Roman", serif',
    }
  };

  return (
    <div style={styles.container}>
      {/*<h1 style={styles.heading}>Page Not found mano</h1>*/}
      <img
        src={livrovelho}
        alt="Livro medieval antigo aberto mostrando que a página 404 foi arrancada"
        style={styles.image}
      />
      <p style={styles.subText}>
        Parece que a página que você procura foi perdida na história.
      </p>
    </div>
  )
}