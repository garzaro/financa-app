import { useNavigate } from 'react-router-dom';
import FormularioCriptomoeda from '@/components/criptomoedas/FormularioCriptomoeda.jsx';

export default function CadastrarCriptomoeda() {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto w-full">
      <FormularioCriptomoeda onSucesso={() => navigate('/consultar-criptomoedas')} />
    </div>
  );
}
