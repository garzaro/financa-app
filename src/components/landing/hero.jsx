import React from 'react';
import {Button} from "@/components/ui/button.jsx";
import {ArrowRightIcon} from "lucide-react";
import {useNavigate} from "react-router-dom";

/**
 * 🎯 Regra prática
 *
 * 🔐 Proteção de rota → Navigate
 * 🖱️ Clique, submit, ação → useNavigate
 *
 * **/

export default function Hero () {

  const navigate = useNavigate();

  const handleCreateAccount = () => {
    navigate("/register");
  }

  return (

    <section className="pt-32 pb-20 md:pt-40 md:pb-32 relative bg-zinc-950 overflow-hidden ">

      {/** linha decorativa **/}
      <div className="absolute top-20 letf-0 w-1 h-32 bg-blue-900 opacity-50 "></div>

      <div className="container mx-auto px-4">
        <div className="max-w-3xl ">

          {/** main heading **/}
          <p className="text-2xl md:text-3xl font-bold text-gray-300 mb-6 leading-tight">
            Seu controle finançeiro começa aqui!
          </p>

          {/** subheading **/}
          <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl">
            Gerencie suas finanças com inteligência. Segurança de ponta para controlar sua finança pessoal.
          </p>

          {/** CTA - botoes * */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="bg-blue-950 hover:bg-blue-900 text-zinc-100 transition-all
                          duration-300 flex items-center gap-2 group rounded"
              onClick={handleCreateAccount}
            >
              Começar agora
              <i className="bi bi-arrow-right w-4 h-4 group-hover:translate-x-1 transition-transform"></i>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-gray-300 text-zinc-900 hover:bg-zinc-50 transition-colors rounded"
            >
              Ver Demonstração
            </Button>
          </div>

          {/** indicadores confiaveis **/}
          <div className="mt-16 pt-8 border-t border-gray-600">

            <p className="text-sm text-gray-300 ">
              Confiado por mais de 1 milhão de usuários ( por enquanto é só eu mesmo )
            </p>

            <div className="flex-row flex-wrap gap-8">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full "></div>
                <span className="text-sm text-gray-300 "> Controle Garantido </span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full "></div>
                <span className="text-sm text-gray-300 "> Cadastre Lançamento Com Facilidade </span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full "></div>
                <span className="text-sm text-gray-300 "> Sem taxas ocultas </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/** elementos decorativos **/}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient0to-tl from-blue-50 to-transparent
      rounded-full opacity-40 -z-10"
      >
      </div>
    </section>
  );
}