import {useState} from "react";
import Card from "../components/card/card";
import FormGroup from "../components/form/form-group";
import {useForm} from "react-hook-form";
import ReactPasswordChecklist from "react-password-checklist";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {mensagemDeErro} from "../components/utils/toastr";

function FormularioSenha() {
    const [senha, setSenha] = useState('');
    const [isloading, setIsloading] = useState(true);
    const [senhaNovamente, setSenhaNovamente] = useState('');
    const {register, handleSubmit, formState: { errors, isValid }} = useForm({mode: "onChange"}); /* {mode: "onChange"}quando o  usuario digitar ja vai validando - tipo tempo real*/

    const navigate = useNavigate();

    const redirecionarParaLogin = (data) => {
        setTimeout(() => navigate("/login"), 2000);
        mensagemDeErro(errors.response.data);
    };

    return (
        <div className="container-fluid mt-5 style={{minHeight: '0vh', display: 'flex', flexDirection: 'column', alignItens:'center'}}">
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
                                            } name={"senha"}
                                            >
                                                <input type="password" id="senha" value={senha}
                                                       {...register("senha", {required: "Preencher o campo senha"})}
                                                       className="form-control form-control-sm inputPlaceholder mt-1"
                                                       onChange={(e) => setSenha(e.target.value)}
                                                       placeholder="digite a senha"
                                                />
                                                {errors.senha && <span className="error">{errors.senha.message}</span>}
                                            </FormGroup>
                                            {/*repetir a senha*/}
                                            <FormGroup label={
                                                <span>
                                                    Repetir a senha:<span className="asterisco-vermelho">*</span>
                                                </span>
                                            } name={"senhaNovamente"}
                                            >
                                                <input type="password" id="senhaNovamente" value={senhaNovamente}
                                                       {...register("senhaNovamente", {required: "Preencher o campo repertir senha"} )}
                                                       className="form-control form-control-sm inputPlaceholder mt-1"
                                                       onChange={(e) => setSenhaNovamente(e.target.value)}
                                                       placeholder="digite a senha novamente"
                                                />
                                                {errors.senha && <span className="error">{errors.senha.message}</span>}
                                            </FormGroup>
                                            {/*lista de validação de senha*/}
                                            <ReactPasswordChecklist
                                                rules={["minLength", "specialChar", "capital", "lowercase", "match"]}
                                                minLength={8}
                                                value={senha}
                                                valueAgain={senhaNovamente}
                                                className="password-checklist"
                                                onChange={(isValid) => isValid(isValid)}
                                            />
                                            {/* Botão para Login */}
                                            <button type="submit" disabled={!isValid}>Avançar</button>
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