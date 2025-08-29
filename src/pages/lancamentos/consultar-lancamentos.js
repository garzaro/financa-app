import Card from "../../components/card/card";
import Astered from "../../components/utils/astered";
import {FormGroup} from "@mui/material";
import {useForm} from "react-hook-form";

const ConsultarLancamentos = () => {
    const {control, register, handleSubmit, setValue, watch, formState:{errors},} = useForm({
        defaultValues: {
            ano: '',
        }
    });
    return (
        <div className="container">
            <div className="row justify-content-center w-100">
                <div className="col-md-6">
                    <div className="bs-docs-section">
                        <Card title="Consultar Lancamentos">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="bs-component">
                                        <form>
                                            <fieldset>
                                                <FormGroup label={
                                                    <span>
                                                        Ano: <Astered>*</Astered>
                                                    </span>
                                                }>
                                                    <input type="text"
                                                           {...register("ano", {required: true})}
                                                           className="form-control form-control-sm inputPlaceholder"
                                                           id="ano"
                                                           placeholder="Digite o ano"
                                                    />
                                                    {errors.ano && <span className="error">{errors.ano.message}</span>}
                                                </FormGroup>
                                            </fieldset>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ConsultarLancamentos;