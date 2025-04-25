import Apiservice from "../apiservice";
import {useNavigate} from "react-router-dom";

/*tratando da api de serviços do usuario - sobrescrevendo para utilização dos meos da apiService*/
function UsuarioService (){
    usuarioApiUrl = '/api/usuarios';
    autenticar();
    console.log(usuarioApiUrl)
}
const autenticar = (credenciais) => {
    return Apiservice.post('/autenticar', credenciais);
    console.log(credenciais);
}

export default UsuarioService;