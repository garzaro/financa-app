import * as React from 'react';
import {DataGrid, GridDeleteIcon} from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import Paper from '@mui/material/Paper';
import Button from "@mui/material/Button";
import {Box, IconButton} from "@mui/material";
import {auto} from "@popperjs/core";
import {ptBR} from "@mui/x-data-grid/locales";

const columns = [
    { field: 'descricao', headerName: 'Descrição', flex: 3, },
    { field: 'valor', headerName: 'Valor', flex: 1,
    valueFormatter: (params) => params.value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    }) || 'R$ 0,00'},
    { field: 'tipo', headerName: 'Tipo', flex: 1, },
    { field: 'mes', headerName: 'Mês', flex: 1 },
    { field: 'situacao', headerName: 'Situação', flex: 1 },
    { field: 'acoes', headerName: 'Ações', flex: 2, sortable: false,
        columnMenu: false, disableColumnMenu: true, filterable: false,
        renderCell: (params) => {

        const handleEditar = (e) =>{
            console.log("EDITAR A PORRA TODA ", params.row);
            const {name, value} = e.target;
                {/*setFiltro((prev) => ({ ...prev, [name]: value }));*/}
        }
        const handleDeletar = () =>{
                console.log('DELETAR A PORRA TODA ', params.row);
        }

        return (
            <>
                <Box>
                    <IconButton variant="outlined"
                                size="small"
                                color="primary"
                                style={{marginRight: 8}}
                                onClick={() => handleEditar()}
                                aria-label="Editar"
                    >
                        <EditIcon />
                    </IconButton>
                    <IconButton variant="outlined"
                                size="small" color="error"
                                onClick={() => handleDeletar()}
                                aria-label="Excluir"
                    >
                        <GridDeleteIcon/>
                    </IconButton>
                </Box>
            </>
        )
        },
    },
];

const lancamentos = [
    {descricao:'salario', valor: 5000, mes: 'janeiro', tipoLancamento: 'RECEITA', status: 'efetivado' }];

const paginationModel = { page: 0, pageSize: 5 };
/*desestruturacao com valor padrao para lancamentos = [] - caso a prop não seja passada */
export default function DataTable({ lancamentos = [] }) {

    /*transforma a lista de lancamentos em linhas para o datagrid*/
    const rows = lancamentos.map((lancamentos) => ({
        id: lancamentos.id,
        /*operador nullish coalescing - ? */
        descricao: lancamentos.descricao ?? 'Sem descrição',
        valor: lancamentos.valor,
        tipoLancamento: lancamentos.tipoLancamento,
        mes: lancamentos.mes,
        status: lancamentos.status,
    }));

    return (
        <Box sx={{ width: '100%', overflowX: 'auto', }}>
            <Paper sx={{ width: 'auto', minWidth: 900 }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                /*tradução - locale*/
                localeText={{
                    ...ptBR.components.MuiDataGrid.defaultProps.localeText,
                    toolbarDensity: 'Densidade',
                    footerRowSelected: (count) => `${count} linha(s) selecionada(s)`,
                    MuiTablePagination: {
                        labelRowsPerPage: 'Linhas por página',
                        /*traduzir 1 'of' 1*/
                    },
                }}
                /*estilo*/
                sx={{
                    border: 0,
                    fontSize: {xs: 12, sm: 14},
                }}
            />
            </Paper>
        </Box>
    );
}





/*import React from "react";

export default props => {
    return (
        <table className="table table-hover">
            <thead>
            <tr>
                <th scope="col">Descrição</th>
                <th scope="col">Valor</th>
                <th scope="col">Tipo</th>
                <th scope="col">Mês</th>
                <th scope="col">Situação</th>
                <th scope="col">Ações</th>
            </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
    );
}*/