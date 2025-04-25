import React, {useEffect, useState} from "react";
import axios from "axios";

export function useSaldo() {
    const [saldo, setSaldo] = useState('0,00');
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(null);

    /*ciclo de vida*/
    useEffect(() => {
        const buscarSaldo = async () => {
            try {
                /*recuperando o usuario logado - transformado de obj para string no login*/
                const stringUsuarioLogado = localStorage.getItem('_usuario_logado');
                console.log(" Recuperando usuario string ", stringUsuarioLogado);
                /*tranformando a string em objeto*/
                const objetoUsuarioLogado = JSON.parse(stringUsuarioLogado);
                const userId = objetoUsuarioLogado;
                console.log(" Recuperando usuario objeto ",objetoUsuarioLogado);
                /*usar crase no endpoint - se torna um template string - recurso do ecma*/
                const response = await axios.get(`http://localhost:8080/api/usuarios/${userId.id}/saldo`)
                console.log(" Recuperando usuario objeto ",response)
                setSaldo(response.data);
            } catch (err) {
                /*tentar trazer mensagem do backend*/
                setErro(err.response?.data.message || err.response?.data);
            } finally {
                setLoading(false);
            }
        };
        buscarSaldo();
    },[]);

    if (loading) return <p>Carregando saldo...</p>
    if (erro) return <p>{erro}</p>;

    return{saldo, loading, erro};
}