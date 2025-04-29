import {useEffect, useState} from "react";
/*hook personalizado para gerenciar o localstorage*/
export const LocalStorageService = (chave, idInicial) => {
    const [valor, setValor ] = useState(()=>{
        const obterItem = localStorage.getItem(chave);
        /*recupera o valor do localstorage ou usa o valor (id) inicial*/
        return obterItem ? JSON.parse(obterItem) : idInicial;
    });
    useEffect(() => {
        /*Atualiza o localStorage sempre que o valor mudar*/
        localStorage.setItem(chave, JSON.stringify(valor));
    }, [chave, valor]);
    return [valor, setValor];
}