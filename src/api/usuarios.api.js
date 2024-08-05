import axios from "axios";
import { getEnvVariables } from "../helpers/getEnvVariables";

const { VITE_API_URL } = getEnvVariables();

console.log("url", VITE_API_URL)

export const createUsuario = async (usuario) =>
    await axios.post("http://localhost:4000/user", usuario);

export const getUsuario = async ({cedula, password}) => {
    try {
        const result = await axios.get(`${VITE_API_URL}/${cedula}/${password}`);
        const { nombre, email, photoURL } = result.data

        return {
            ok: true,
            nombre,
            email,
            cedula,
            photoURL
        }
    } catch (error) {
        const message = error.response.data.message

        if(message) {
            return {ok: false, errorMessage : message}
        }
        return {ok: false, errorMessage : error.message}
    }
}

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

export default usuariosApi; 
