import {useContext} from "react";
import {AuthContext} from "@/auth/authContext.jsx";

/**
 * Consumo simples do contexto - usado atualmente, antes era o Consumer
 * **/

export function useAuth() {
  return useContext( AuthContext );
}