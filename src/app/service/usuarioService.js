import ApiService from "../apiservice";

const UsuarioService = () => {
    const apiService = new ApiService('/api/usuarios');
}

const autenticar = (credenciais) => {
    return post('/autenticar', credenciais)
}
return(
    <>
    ...apiService,
        autenticar
    </>
)