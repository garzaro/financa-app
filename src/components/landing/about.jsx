
const stats = [
  { number: "0+", label: "Usuários Ativos" },
  { number: "R$ 0+", label: "Patrimônio Gerenciado" },
  { number: "0.0%", label: "Uptime Garantido" },
  { number: "0/7", label: "Suporte Disponível" },
];

export default function About() {
  return (
    <section id="about" className="py-20 md:py-32 bg-gray-950">
      <div className="container mx-auto px-4">
        {/* Main content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          {/* Left side - Text */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-300 mb-6">Sobre a Finança Pessoal</h2>
            <p className="text-lg text-gray-300 mb-4 leading-relaxed">
              Plataforma de gestão financeira moderna, criada para simplificar a vida de pessoas que
              desejam tomar controle de suas finanças.
            </p>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              Com tecnologia de ponta, segurança bancária que ajudará você controlar suas finanças.
            </p>
            <div className="flex items-center gap-3">
              <div className="w-1 h-13 bg-blue-900"></div>
              <p className="text-gray-400 italic font-medium mt-3">
                Fundada em 2025, já transformamos a vida de uma ruma de gente.
              </p>
            </div>
          </div>

          {/* Right side - Decorative */}
          <div className="relative h-80 hidden md:block">
            <div className="absolute inset-0 bg-linear-to-br from-blue-900 to-green-50 rounded-lg"></div>
            <div className="absolute top-8 right-8 w-24 h-24 bg-blue-900 rounded-lg opacity-10"></div>
            <div className="absolute bottom-8 left-8 w-32 h-32 bg-green-500 rounded-full opacity-10"></div>
          </div>
        </div>

        {/* Statistics */}
        <div className="border-t border-gray-200 pt-16">
          <h3 className="text-2xl font-bold text-gray-300 mb-12">Números que Falam</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-blue-900 mb-2">{stat.number}</div>
                <p className="text-gray-300 text-sm md:text-base">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

