import axios from "axios";

export const createUsuario = async (usuario) =>
    await axios.post("http://localhost:4000/user", usuario);

export const getUsuario = async ({cedula, password}) => {
    try {
        const result = await axios.get(`http://localhost:4000/users/${cedula}/${password}`);
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