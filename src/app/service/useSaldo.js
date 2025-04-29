import React, {useEffect, useState} from "react";
import axios from "axios";
import UsuarioService from "../service/usuarioService";
import {LocalStorageService} from "./localStorageService";
/*componente costumizado*/
export function useSaldo() {
    const [saldo, setSaldo] = useState(0);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(null);
    /*instanciar servico de usuario*/
    const serviceSaldoPorUsuario = UsuarioService();
    const [usuarioLogado] = LocalStorageService('_usuario_logado', null);
    /*ciclo de vida*/
    useEffect(() => {
        /*flag para verificar se este componente esta montado*/
        let isMounted = true;
        const buscarSaldo = () => {
            if (usuarioLogado && usuarioLogado.id) {
                serviceSaldoPorUsuario.buscarSaldoPorUsuario(usuarioLogado.id)
                    .then(response => {
                        if (isMounted) {
                            setSaldo(response.data);
                            setLoading(false);
                        }
                    }).catch(err => {
                    /*tentar trazer mensagem do backend*/
                    if (isMounted) {
                        setErro(err.response?.data.message || err.response?.data)
                        setLoading(false);
                    }
                });
            }
        };
        buscarSaldo();
        return () => {
            /*define esta flag como false se o component esta desmontado*/
            isMounted = false;
        }
        /*qualquer alteracao no custom este componente sera recarregado - [deps]*/
    }, [serviceSaldoPorUsuario, usuarioLogado]);
    return{saldo, loading, erro};
}