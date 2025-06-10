import React, {useState} from "react"
import { BrowserRouter } from "react-router-dom";
import {Controller, useForm} from "react-hook-form";
import {Box} from "@mui/material";
import Button from '@mui/material/Button';
import Card from "../../components/card/card";
import FormGroup from "../../components/form/form-group";
import Astered from "../../components/utils/astered";
import SelectLancamentoVariants from '../../components/menu/selectMenu';
import DataTable from "./lancamentosTable";
/**Vamos:
Controlar os filtros no estado - select
Fazer a chamada axios para o backend
Passar os dados para o DataGrid
 **/

function ConsultarLancamentos () {
    const { register, handleSubmit, setValue, watch, control, formState:{isValid},} = useForm({
        mode: 'onChange',
        defaultValues: {
            ano: '', mes: '', tipoLancamento: '',
        }
    });
    const handleAnoChange = (e) => setValue('ano', e.target.value);
    const handleMesChange = (e) => setValue('mes', e.target.value);
    /*tipo lancamento*/
    const handleTipoChange = (e) => setValue('tipoLancamento', e.target.value);
    /*botão desabilitado até que filtro preenchido*/
    const ano = watch('ano');
    const tipo = watch('tipoLancamento');

    const buscarLancamentos = (data) => {
        console.log("FILTRO PREENCHIDO ",data);
        /*FAZER A CHAMADA À API*/
    }

    const lancamentos = [
        {descricao:'salario', valor: 5000, mes: 'janeiro', tipoLancamento: 'RECEITA', status: 'efetivado' }];

    return (
        <div className="container-fluid mt-5">
            <div className="row justify-content-center w-100" >
                <div className="col-md-12">
                    <div className="bs-docs-section">
                        <Card title="Consultar Lançamentos">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="bs-component">
                                        <div className="col-md-6">
                                            <div className="bs-component">
                                                <form onSubmit={handleSubmit(buscarLancamentos)}>
                                                    {/* chamando os selects - filtro */}
                                                    <SelectLancamentoVariants
                                                        ano={ watch('ano')}
                                                        onAnoChange={handleAnoChange}
                                                        mes={watch('mes')}
                                                        onMesChange={handleMesChange}
                                                        tipoLancamento={ watch('tipoLancamento')}
                                                        onTipoLancamentoChange={handleTipoChange}
                                                    />
                                                    <hr/>
                                                    <Box sx={{ '& button': { m: 1 } }}>
                                                        <Button
                                                            type="submit"
                                                            size="small"
                                                            variant="contained"
                                                            disabled={!ano || !tipo}
                                                        >
                                                            Buscar
                                                        </Button>
                                                        {/*cadastrar lancamento*/}
                                                        <Button
                                                            size="small"
                                                            variant="contained"
                                                            color="error"
                                                        >
                                                            Cadastrar
                                                        </Button>
                                                    </Box>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*data table*/}
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="bs-component">
                                        <DataTable Lancamento = {lancamentos}/>
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
export default ConsultarLancamentos;


