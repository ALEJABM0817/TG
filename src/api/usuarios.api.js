import axios from "axios";

export const createUsuario = async (usuario) =>
    await axios.post("http://localhost:4000/user", usuario);

export const getUsuario = async (usuario) =>
    await axios.get(`http://localhost:4000/users/${usuario.cedula}/${usuario.password}`, usuario);