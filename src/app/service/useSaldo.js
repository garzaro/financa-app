import React, {useEffect, useState} from "react";
import axios from "axios";
import UsuarioService from "../service/usuarioService";
/*componente costumizado*/
export function useSaldo() {
    const [saldo, setSaldo] = useState(0);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(null);
    /*instanciar servico de usuario*/
    const serviceSaldoPorUsuario = UsuarioService();
    /*ciclo de vida*/
    useEffect(() => {
        /*flag para verificar se este componente esta montado*/
        let isMounted = true;
        const buscarSaldo = () => {
            /*recuperando o usuario logado - transformado de obj para string no login*/
            const stringUsuarioLogado = localStorage.getItem('_usuario_logado');
            /*tranformando a string em objeto*/
            const objetoUsuarioLogado = JSON.parse(stringUsuarioLogado);
            const userId = objetoUsuarioLogado;
            /*usar crase no endpoint - se torna um template string - recurso do ecma*/
            serviceSaldoPorUsuario.buscarSaldoPorUsuario(userId.id)
                .then(response => {
                    setSaldo(response.data);
                    setLoading(false);
                }).catch(err => {
                /*tentar trazer mensagem do backend*/
                setErro(err.response?.data.message || err.response?.data)
                setLoading(false);
            });
        };
        buscarSaldo();
        return () => {
            /*define esta flag como false se o component esta desmontado*/
            isMounted = false;
        }
        /*qualquer alteracao no custom este componente sera recarregado - [deps]*/
    }, [serviceSaldoPorUsuario]);
    return{saldo, loading, erro};
}