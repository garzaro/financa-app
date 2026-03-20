import {ErrorBoundary} from "react-error-boundary";

// Componente visual que será exibido se der erro
function ErrorFallback({ error, resetErrorBoundary }) {
  return (
      <div role="alert" style={{ padding: '20px', color: 'red', border: '1px solid' }}>
        <h2>Algo deu errado:</h2>
        <pre style={{ whiteSpace: 'normal' }}>{error.message}</pre>
        <button onClick={resetErrorBoundary}>Tentar novamente</button>
      </div>
  );
}

export default function DevErrorBoundary({ children }) {
  return (
      <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={() => {
            // Lógica para limpar o estado da aplicação e "tentar de novo"
            console.log("ErrorBoundary resetado!");
          }}
      >
        {children}
      </ErrorBoundary>
  );
}