
export default function Footer (){

  const anoAtual = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-16">
        {/** conteudo principal do rodapé **/}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/** brand **/}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 bg-linear-to-br from-pink-900 to-pink-500 rounded-lg flex items-center
               justify-center"
              >
                <span className="text-zinc-300 font-bold"> FP </span>
              </div>
              <span className="text-zinc-300 text-sm font-bold"> Fincanças Pessoais </span>
            </div>
            <p className="text-zinc-300 text-sm"> Sua liberdade fincanceira </p>
          </div>

          {/** Produto **/}
          <div>
            <h4 className="font-bold text-zinc-300 mb-4"> Produto </h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="">
                <a href="#services" className="hover:text-zinc-800 transition-colors">
                  Serviços
                </a>
              </li>
              <li className="">
                <a href="#about" className="hover:text-zinc-800 transition-colors">
                  Sobre
                </a>
              </li>
              <li className="">
                <a href="#" className="hover:text-zinc-800 transition-colors">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/** Empresa **/}
          <div>
            <h4 className="font-bold text-zinc-300 mb-4"> Empresa </h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <a href="#" className="hover:text-zinc-800 transition-colors">
                    Sobre nós
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-zinc-800 transition-colors">
                    Contato
                  </a>
                </li>
              </ul>
            </div>

          {/** Legal **/}
          <div>
            <h4 className="font-bold text-zinc-300 mb-4"> Legal </h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="#" className="hover:text-zinc-800 transition-colors">
                  Privacidade
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-zinc-800 transition-colors">
                  Termos de Serviço
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-zinc-800 transition-colors">
                  Segurança
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-zinc-800 transition-colors">
                  Cookies
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/** Divider **/}
        <div className="border-t border-gray-400 pt-8">
          {/** bottom section **/}
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-300 ">
            <p>&copy; { anoAtual } Finanças Pessoais. Todos os direitos tortos.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-zinc-800 transition-colors">
                Facebook
              </a>
              <a href="#" className="hover:text-zinc-800 transition-colors">
                Instagram
              </a>
              <a href="#" className="hover:text-zinc-800 transition-colors">
                Linkedin
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}