import {createContext, useContext, useState} from "react";

const ConstextoCadastroUsuario = createContext();

export const ProvedorCadastroUsuario = ({children}) => {
    /*dados do usuario*/
    const [dadosUsuario, setDadosUsuario] = useState(null);

    const salvarDadosUsuario = (data) =>{
        setDadosUsuario(data);
    };
    const limparDadosUsuario = (data) =>{
        setDadosUsuario(null);
    };
    return (
        <ConstextoCadastroUsuario.Provider
        value={{dadosUsuario, salvarDadosUsuario, limparDadosUsuario}}>
            {children}
        </ConstextoCadastroUsuario.Provider>
    );
};
export const useCadastroUsuario = () => useContext(ConstextoCadastroUsuario);