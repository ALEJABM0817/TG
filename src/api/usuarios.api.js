import axios from "axios";
import { getEnvVariables } from "../helpers/getEnvVariables";

const { VITE_API_URL } = getEnvVariables();

console.log(VITE_API_URL);

const usuariosApi = axios.create({
    baseURL: VITE_API_URL
});

usuariosApi.interceptors.request.use(config => {
    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('token')
    }

    return config;
})

export const createUsuario = async (usuario) =>
    await usuariosApi.post("/user", usuario);

export const getUsuarios = async () =>
    await usuariosApi.get("/users");

export const toggleUsuarioHabilitado = async (cedula, habilitado) =>
    await usuariosApi.put(`/toggle-users/`, { cedula, habilitado: !habilitado });

export const completeInfo = async (usuarioInfo) =>
    await usuariosApi.post("/upload-data", usuarioInfo);

export const getUserData = async (cedula) =>
    await usuariosApi.get("/get-user", {
        headers: {
            'cedula': cedula
        }
    });

export const updateUserData = async (uid, usuario) =>
    await usuariosApi.put(`/user/${uid}`, usuario);

export const getTarifas = async (cedula) =>
    await usuariosApi.get("/tarifas", {
        headers: {
            'cedula': cedula
        }
    });

export const updateTarifas = async (uid, tarifas) =>
    await usuariosApi.put(`/tarifas-update/${uid}`, tarifas);

export const createService = async (service) =>
    await usuariosApi.post('/service', service);

export const getServices = async (cedula, typeUser) =>
    await usuariosApi.get("/get-services", {
        headers: {
            'cedula': cedula,
            'typeUser': typeUser
        }
    });

export const setRating = async (rating) =>
    await usuariosApi.post("/set-rating", rating);

export const saveExperience = async (experiences) =>
    await usuariosApi.post("/save-experience", {experiences});

export default usuariosApi;