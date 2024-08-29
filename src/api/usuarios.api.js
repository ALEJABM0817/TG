import axios from "axios";
import { getEnvVariables } from "../helpers/getEnvVariables";

const { VITE_API_URL } = getEnvVariables();

const usuariosApi = axios.create({
    baseURL: VITE_API_URL
});

usuariosApi.interceptors.request.use( config => {
    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('token')
    }
    
    return config;
})

export const createUsuario = async (usuario) =>
    await usuariosApi.post("/user", usuario);

export const completeInfo = async (usuarioInfo) =>
    await usuariosApi.post("/upload-data", usuarioInfo);

export default usuariosApi;