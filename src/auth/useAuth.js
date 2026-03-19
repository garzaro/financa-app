import {useContext} from "react";
import {AuthContext} from "@/auth/authContext.jsx";

/**
 * Consumo simples do contexto
 * **/

export function useAuth() {
  return useContext( AuthContext );
}