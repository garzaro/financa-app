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
          <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl">
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
              Começar agora <i className="bi bi-arrow-right w-4 h-4 group-hover:translate-x-1 transition-transform"></i>
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
          <div>
            <p> Confiado por mais de 1 milhão de usuários </p>
            <div>

              <div>
                <div></div>
                <span> Segurança Certificada </span>
              </div>

              <div>
                <div></div>
                <span> Suporte 24/7 </span>
              </div>

              <div>
                <div></div>
                <span> Sem taxas ocultas </span>
              </div>

              </div>
            </div>
          </div>
        </div>

        {/** elementos decorativos **/}
        <div></div>

    </section>


    // <section className="relative overflow-hidden bg-zinc-300">
    //   {/* Background Image */}
    //   <div className="absolute inset-0 opacity-40">
    //     <img
    //       src="https://private-us-east-1.manuscdn.com/sessionFile/GKQagjpVSXvil4eTTthCTX/sandbox/WC1habzRv0VqmslBoWQUgJ-img-1_1771161639000_na1fn_aGVyby1maW5hbmNlLWFic3RyYWN0.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvR0tRYWdqcFZTWHZpbDRlVFR0aENUWC9zYW5kYm94L1dDMWhhYnpSdjBWcW1zbEJvV1FVZ0otaW1nLTFfMTc3MTE2MTYzOTAwMF9uYTFmbl9hR1Z5YnkxbWFXNWhibU5sTFdGaWMzUnlZV04wLnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=MOLgIcUWpgE~aG~2QZy0zSVBDsFal5Al5A8cKuPkoYdpVBaYizUQGC~8beRl91DvvT0perGzcfqEYoUmWBE2pVXCbJv509hJf-JEGXUTJTcnj09vDu6Xbw9cpXCqyVhxFI-1DLRtd7qrIPR3ZUcrW82iXMyP3hRqhrzFMci7syP7NS37LrBHgXw7JrZRLAJes7pcmKoxl-Jx3P~n-3NxmmDAXvC6xS0c-rokyvL2NdgA-7MUdsEeTYbgJ0KksBe-e0XFu~V8AcseWBZIufk-sroLME3Ab30-IdMI3UdmonIY9K1MyPaypPxhiWkEAF4qHwc~IgQtIadbir4YkicK-w__"
    //       alt="Financial Growth"
    //       className="w-full h-full object-cover"
    //     />
    //   </div>
    //
    //   {/* Content */}
    //   <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
    //     <div className="max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-700">
    //       <h1 className="font-display text-5xl md:text-6xl text-primary mb-6 leading-tight">
    //         Sua Liberdade Financeira Começa Aqui
    //       </h1>
    //       <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
    //         Gerencie seus investimentos com confiança. Plataforma segura, intuitiva e poderosa para crescimento financeiro sustentável.
    //       </p>
    //       <div className="flex flex-col sm:flex-row gap-4">
    //         <Button
    //           size="lg"
    //           className="bg-primary hover:bg-primary/90 text-white group transition-all duration-300 hover:shadow-lg"
    //         >
    //           Começar Agora
    //           {/*<ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={20} />*/}
    //         </Button>
    //         <Button
    //           size="lg"
    //           variant="outline"
    //           className="border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
    //         >
    //           Saiba Mais
    //         </Button>
    //       </div>
    //
    //       {/* Stats */}
    //       <div className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-border">
    //         <div className="animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: '100ms' }}>
    //           <div className="font-display text-3xl text-primary">50K+</div>
    //           <p className="text-sm text-muted-foreground mt-1">Usuários Ativos</p>
    //         </div>
    //         <div className="animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: '200ms' }}>
    //           <div className="font-display text-3xl text-primary">$2B+</div>
    //           <p className="text-sm text-muted-foreground mt-1">Sob Gestão</p>
    //         </div>
    //         <div className="animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: '300ms' }}>
    //           <div className="font-display text-3xl text-primary">99.9%</div>
    //           <p className="text-sm text-muted-foreground mt-1">Uptime</p>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </section>

  );
}