import {Card} from "@/components/ui/card.jsx";
import {PieChartIcon, ShieldIcon, TrendingUpIcon, ZapIcon} from "lucide-react";



export default function Service() {

  const services = [
    {
      icon: <TrendingUpIcon className="w-8 h-8 text-blue-500" />,
      title: "Análise Inteligente",
      description: "Acompanhe seus investimentos com análises em tempo real e recomendações personalizadas."
    },
    {
      icon: <ShieldIcon className="w-8 h-8 text-blue-500" /> ,
      title: "Segurança Máxima" ,
      description:"Seus dados estão protegidos com criptografia de nível bancário e conformidade com padrões " +
        "internacionais.",
    },
    {
      icon: <ZapIcon className="w-8 h-8 text-blue-500" /> ,
      title: "Automação Financeira" ,
      description: "Automatize suas finanças com regras customizáveis e economize tempo em tarefas repetitivas.",
    },
    {
      icon: <PieChartIcon className="w-8 h-8 text-blue-500" /> ,
      title: "Diversificação Inteligente",
      description: "Construa um portfólio diversificado com orientação de especialistas e ferramentas avançadas.",
    },
  ];

  return (
    <section id="service" className="py-20 md:py-32 bg-zinc-900">
      <div className="container mx-auto px-4">
        {/** section header **/}
        <div className="max-w-2xl mb-16 ">
          <h3 className="text-4xl md:text-5xl font-bold text-gray-300 mb-4"> Serviços </h3>
          <p className="text-lg text-gray-300">
            Tudo que você precisa para controlar suas finanças em um único lugar.
          </p>
        </div>

        {/** service grid **/}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          { services.map(( service, index ) => (
            <Card
              key={index}
              className="p-8 border border-gray-500 hover:border-blue-500 transition-colors duration-300
               bg-zinc-300"
            >
              <div className="mb-4"> { service.icon } </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3"> { service.title } </h3>
              <p className="text-gray-900 leading-relaxed"> { service.description } </p>
            </Card>
          ))}
        </div>
        {/** divide line **/}
        <div className="mt-20 pt-20 border-t border-gray-500"></div>
      </div>
    </section>
  );
}