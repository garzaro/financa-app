import {useState} from "react";
import Card from "../../components/template/card.jsx";
import FormGroup from "../../components/template/formGroup.jsx";
import {useForm} from "react-hook-form";
import ReactPasswordChecklist from "react-password-checklist";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {mensagemDeErro} from "../../components/utils/toastr";

function FormularioSenha() {
  const [senha, setSenha] = useState('');
  const [isloading, setIsloading] = useState(false);
  const [isvalid, setIsvalid] = useState(false);
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const {register, handleSubmit, formState: { errors }} = useForm({
    /* {mode: "onChange"} quando o  usuario digitar ja vai validando - tipo tempo real*/
    mode: "onChange"
  });

  const navigate = useNavigate();

  const redirecionarParaLogin = () => {
    setTimeout(() => navigate("/login"), 700);
  };

  return (
    <div className="container-fluid mt-5" >
      <div className="row justify-content-center w-100">
        <div className="col-md-6">
          <div className="bs-docs-section">
            <Card title="Senha">
              <div className="row">
                <div className="col-md-12">
                  <div className="bs-component">
                    <form onSubmit={handleSubmit(redirecionarParaLogin)}>
                      {/*senha*/}
                      <FormGroup label={
                        <span>
                          Senha:<span className="asterisco-vermelho">*</span>
                        </span>
                      } name={"senha"} //deixei o nome de forma didatica, a lib react-hook-form dispensa a necessidade de nomear o input
                      >
                        <input type="password" id="senha" value={senha}
                               {...register("senha", {required: "Digite sua nova senha"})}
                               className="form-control form-control-sm inputPlaceholder mt-1"
                               onChange={(e) => setSenha(e.target.value)}
                               placeholder="Digitar sua nova senha"
                        />
                        {errors.senha && <span className="error">{errors.senha.message}</span>}
                      </FormGroup>
                      {/*repetir a senha*/}
                      <FormGroup label={
                        <span>
                          Confirmar Senha:<span className="asterisco-vermelho">*</span>
                        </span>
                      }
                      >
                        <input type="password" id="confirmarSenha" value={confirmarSenha}
                               {...register("confirmarSenha", {required: "Confirmar sua nova senha"} )}
                               className="form-control form-control-sm inputPlaceholder mt-1"
                               onChange={(e) => setConfirmarSenha(e.target.value)}
                               placeholder="Confirme sua nova senha"
                        />
                        {errors.confirmarSenha && <span className="error">{errors.confirmarSenha.message}</span>}
                      </FormGroup>
                      {/*lista de validação de senha - so renderiza a partir do primeiro char digitado*/}
                      {senha.length > 0 && !isvalid &&(
                        <ReactPasswordChecklist
                          rules={[
                            "minLength", "specialChar", "number", "capital",
                            "lowercase", "noSpaces", "match"
                          ]}
                          minLength={8}
                          value={senha}
                          valueAgain={confirmarSenha}
                          className="password-checklist check-icon cross-icon"
                          messages={{
                            minLength: "A senha deve ter no minimo 8 caracteres",
                            specialChar: "Deve conter caractere especial - !@#$%+",
                            number: "Deve conter número",
                            capital: "Deve conter letra maiúscula",
                            lowercase: "Deve conter letra minúscula",
                            noSpaces: "Não deve conter espaços",
                            match: "As senhas coincidem",
                          }}
                          onChange={(isValid)=> setIsvalid(isValid)}
                        />
                      )}
                      {/* Botão para Login */}
                      <button
                        className="btn btn-success btn-sm mt-3"
                        type="submit"
                        disabled={!isvalid}
                      >
                        Avançar
                      </button>
                      <button
                        className="btn btn-danger btn-sm mt-3"
                        onClick={redirecionarParaLogin}
                      >
                        Cancelar
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
export default FormularioSenha;