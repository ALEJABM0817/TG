import axios from "axios";

export const createUsuario = async (usuario) =>
    await axios.post("http://localhost:4000/user", usuario);