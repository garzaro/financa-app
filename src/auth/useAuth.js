import {useContext} from "react";
import {AuthContext} from "@/auth/authContext.jsx";

export function useAuth() {
  return useContext( AuthContext );
}