import {Link, useLocation, useNavigate} from "react-router-dom";
import {useState} from "react";

import Astered from "@/components/utils/astered.jsx";
import {useForm} from "react-hook-form";
import {Input} from "@/components/ui/input.jsx";
import FormGroup from "@/components/template/formGroup.jsx";
import {Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import Button from "@mui/material/Button";
import passwordValidator from 'password-validator';


const INITIAL_CRITERIA = {
  minLength: false,
  hasUpperCase: false,
  hasLowerCase: false,
  hasNumber: false,
  hasSpecialChar: false,
  noSpaces: false,
};
const INITIAL_STRENGTH = {
  score: 0,
  level: "fraca",
  percentage: 0,
};
const resetForm = () => ({
  password: "",
  confirmPassword: "",
  criteria: INITIAL_CRITERIA,
  strength: INITIAL_STRENGTH,
});


export default function RedefinirSenha() {
  const {register, handleSubmit, formState:{errors}} = useForm({
    defaultValues: {
      senha: '',
      confirmarSenha: '',
      criteria: INITIAL_CRITERIA,
      strength: INITIAL_STRENGTH,
    }});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handlePasswordChange = ( value ) => {
    const noSpace = removeSpaces( value );
    const criteria = passwordValidator().validate( noSpace, { list: true } );
  }

  const togglePasswordVisibility = () => {
    setShowPassword( !showPassword );
  };

  const handleReturnLogin = () => {
    navigate('/login');
  }

  const onSubmit = (data) => {
    console.log(data);
    console.log(require.resolve('password-validator'));
  };

  return (
    <div className="min-h-screen bg-zinc-900 flex flex-col">
      <header className="fixed top-0 left-0 right-0 bg-zinc-950 backdrop-blur-sm shadow-md py-4 px-4 md:px-6 flex
      flex-col sm:flex-row justify-between items-center z-50 gap-4"
      >
        <div className="flex items-center gap-2">
          <div className="w-10 h-6 bg-linear-to-br from-pink-900 to-pink-500 rounded flex
          items-center justify-center" style={{ fontFamily: "Poppins" }}
          >
            FP
          </div>
          <span className="text-lg md:text-xl font-bold text-gray-300 tracking-tight"
                style={{ fontFamily: "Poppins" }}
          >
            Finanças Pessoais
          </span>
        </div>
        <nav className="flex items-center gap-2">
          <span className="text-lg md:text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-all">
            Ainda não tem conta?
          </span>
          <Link
            to="/register"
            className="text-xs md:text-sm font-semibold hover:text-emerald-700 transition-all">
            <span className="underline text-gray-300"> Cadastre-se </span>
          </Link>
        </nav>
      </header>

      <div className="flex-1 flex items-center justify-center p-4 pt-24 pb-12">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-4xl">
          <Card className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-hidden">
            {/*p-6 md:p-12*/}
            <CardHeader className="w-full flex flex-col items-center justify-center  ">

              <div className="mr-64 w-10 h-6 bg-linear-to-br from-pink-900 to-pink-500 rounded flex
              items-center justify-center animate-pulse" style={{ fontFamily: "Poppins" }}
              >
                FP
              </div>

              <CardTitle className="text-center mt-16 text-2xl md:text-3xl text-zinc-300">
                Defina a nova senha
              </CardTitle>
              <CardDescription className="text-center text-red-500/70 font-semibold text-sm ">
                Defina senha forte, proteja sua conta
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col ml-8 gap-4 p-6 md:p-12">
              {/** nova senha **/}
              <FormGroup label={
                <span className="text-zinc-300">
                  Senha: <Astered>*</Astered>
                </span>
              }>
                <Input
                  type={showPassword ? "text" : "password"}
                  {...register("senha", {required: "Nova senha é obrigatória"})}
                  placeholder="Digite a nova senha"/>
                {errors.senha &&
                  <span className="error text-red-500" style={{ fontSize: '10px'}}>
                    {errors.senha.message}
                  </span>}
              </FormGroup>

              {/** confirmar nova senha **/}
              <FormGroup label={
                <span className="text-zinc-300">
                  Confirmar nova senha: <Astered>*</Astered>
                </span>
              }>
                <Input
                  type={showPassword ? "text" : "password"}
                  {...register("confirmarSenha", {
                    required: "Confirmação de senha é obrigatória",
                    validate: (value, formValues) => value === formValues.senha || "As senhas não coincidem"
                  })}
                  placeholder="Confirme a nova senha"/>
                {errors.confirmarSenha &&
                  <span className="error text-red-500" style={{ fontSize: '10px'}}>
                    {errors.confirmarSenha.message}
                  </span>}
              </FormGroup>

              <div className="grid gap-3 text-sm mt-4">
                <button type="submit" className="btn btn-primary w-full py-2">
                  Finalizar
                </button>
                {/*<Link to="/login" className="w-full">*/}
                  <button
                    type="button"
                    variant="outline"
                    className="w-full border-zinc-700 rounded py-2 hover:bg-zinc-900 text-zinc-300 text-sm"
                    onClick={ handleReturnLogin }
                  >
                    Voltar ao login
                  </button>
                {/*</Link>*/}
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
}


// const location = useLocation();
// const email = location.state?.email; // Recupera o email passado no redirecionamento
