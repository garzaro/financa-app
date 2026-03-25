import {useEffect, useState} from "react";
import {useAuth} from "@/auth/useAuth.js";
import UsuarioService from "@/app/service/usuarioService.js";

/**
 * to-do list
 * [] Trazer saldo
 * [] Trazer outros servicos para dashboard - buscar outras informações
 *
 * **/
export default function Dashboard () {
  /**
   * @param saldoServico é a composicao - em componente de classe
   * seria feito um extends do servico e depois o construtor para
   * instanciar o servico.
   * @param service = new UsuarioService();
   * */
    //const { saldo, loading, erro } = useSaldo();
  const { loggedUser } = useAuth();
  const saldoServico = UsuarioService();
  const [saldo, setSaldo] = useState(0);
  const [saldoPendente, setSaldoPendente] = useState(0);


  /**
   * retornar o saldo do usuario logado
   * */
  useEffect(() => {
    const buscarSaldo = () => {
      if (!loggedUser || !loggedUser.id) return;

      console.log('Usuario recuperado do contexto', loggedUser);
      saldoServico.buscarSaldoPorUsuario(loggedUser.id)
        .then(respondeAiManoBanco => {
          setSaldo(respondeAiManoBanco.data);
        })
        .catch(error => {
          console.log(error);
        })
    }
    buscarSaldo();
  }, [loggedUser, saldoServico]);

  function capitalizar(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <>
    <h1>Saldo atual </h1>
      R$ { saldo }



   </>

  )
}