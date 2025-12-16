import {useEffect, useState} from "react";
import {Box, Modal, Typography} from "@mui/material";
import {useParams} from "react-router-dom";
import {mensagemDeErro} from "../../components/utils/toastr.jsx";

export default function AtualizarLancamento() {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { id } = useParams();
  useEffect(() => {
    console.log('Mostrar os Parâmetros:', id);
    if (id){
      /**se houver um id (edição) carrega os dados do lancamento**/
      servicoLancamento.obterLancamentoPorId(id)
        .then(response => {
          console.log("ID retornado ", response);
          reset({ ...response.data, id });
          // setOriginalData(response.data);
        })
        .catch(error => {
          mensagemDeErro(
            error.response.data?.message || error.response.data
          )
        })
    }
    /**se nao houver id, os valores padrao dos campos permanecem vazios (criacao)**/
  }, [id, reset]);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        aria-describedby="form-modal-description"
      >
        <Box>
          <Typography id="form-modal-description" sx={{ mt:2 }}>

          </Typography>
        </Box>

      </Modal>
    </div>
  )
}