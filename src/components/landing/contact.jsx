import {Label} from "@/components/ui/label.jsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {schemaContact} from "@/components/landing/schemaContact.js";
import {Button} from "@/components/ui/button.jsx";
import {Loader2} from "lucide-react";


export default function Contact (){

  const { register, handleSubmit, formState:{ errors, isSubmitting }, reset } = useForm({
    resolver: zodResolver(schemaContact),
    defaultValues: {
      nomeCompleto: "",
      email: "",
      messagem: "",
    },
    mode: "onBlur",
  });

  return (
    <section id="contact" className="py-20 md:py-32 bg-zinc-950">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/** section header **/}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-300 mb-4"> Entre em contato </h2>
            <p className="text-lg text-gray-300">
              Tem dúvidas? Nossa equipe está pronta para ajudar você a começar sua jornada financeira.
            </p>
          </div>
        </div>

        {/** formulario de contato **/}
        <form onSubmit={handleSubmit("")} className="space-y-6">
          {/** campo nome completo **/}
          <div className="">
            <Label htmlFor="nome-completo" className="block text-sm font-medium text-gray-300 mb-2">
              Nome Completo
              <span className="asterisco-vermelho"> * </span>
            </Label>
            <input
              type="text"
              {...register("nomeCompleto",{required: true})}
              className="w-full px-4 py-3 border border-gray-800 rounded focus:outline-none focus-ring-2
               focus:ring-blue-900 focus:border-transparent transition-all disabled:bg-gray-100 "
              placeholder="Digite o nome completo"
              id="nome-completo"
            />
            { errors.nomeCompleto &&
              <span className="error" style={{ fontSize: '12px'}}>{errors.nomeCompleto.message}</span>}
          </div>

          {/** campo email **/}
          <div className="">
            <Label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              E-mail
              <span className="asterisco-vermelho"> * </span>
            </Label>
            <input
              type="email"
              {...register("email",{required: true})}
              className="w-full px-4 py-3 border border-gray-800 rounded focus:outline-none focus-ring-2
               focus:ring-blue-900 focus:border-transparent transition-all disabled:bg-gray-100 "
              placeholder="Digite o email"
              id="email"
            />
            { errors.email &&
              <span className="error" style={{ fontSize: '12px'}}>{errors.email.message}</span>}
          </div>

          {/** campo mensagem **/}
          <div className="">
            <Label htmlFor="mensagem" className="block text-sm font-medium text-gray-300 mb-2">
              Mensagem
              <span className="asterisco-vermelho"> * </span>
            </Label>
            <textarea
              type="text"
              {...register("mensagem",{required: true})}
              className="w-full px-4 py-3 border border-gray-800 rounded focus:outline-none focus-ring-2
               focus:ring-blue-900 focus:border-transparent transition-all disabled:bg-gray-100 "
              placeholder="PODE SER IMPLEMENTADO DE ACORDO COM OS REQUISITOS "
              id="mensagem"
              rows={5}
            />
            { errors.mensagem &&
              <span className="error" style={{ fontSize: '12px'}}>{errors.mensagem.message}</span>}
          </div>

          {/** botao **/}
          <Button
            type="submit"
            className="w-full bg-blue-900 hover:bg-blue-800 text-white py-3 font-medium transition-colors
            duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            { isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Enviando...
              </>
            ) : (
              "Enviar Mensagem"
            )}

          </Button>

        </form>

        {/** informações de contatos **/}
        <div className="mt-16 pt-2 border-t border-zinc-700 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">

          <div>
            <p className="text-sm text-gray-500 mb-2"> Email </p>
            <p className="text-slate-300 font-medium"> clebergarzaro74@gmail.com </p>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-2">Telefone</p>
            <p className="text-slate-300 font-medium"> ( 85 ) 9 9999-9999 </p>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-2"> Horário </p>
            <p className="text-slate-300 font-medium"> Sab-Sab, 3h-3h </p>
          </div>

        </div>
      </div>
    </section>
  );
}