import usuariosApi, { getUsuario } from "../../api/usuarios.api"
import { checkingCredentials, login, logout } from "./"

export const checkingAuthentication = (email, password) => {
    return async(dispatch) => {
        dispatch( checkingCredentials )
    }
}

export const startLogin = ({cedula , password}) => {
    return async (dispatch) => {
        try {
            dispatch(checkingCredentials());

            const { data } = await usuariosApi.post('auth',{cedula, password});
            console.log(data)

            localStorage.setItem('token', data.token)
            localStorage.setItem('token-init-date', new Date().getTime())

            dispatch(login(data))
        } catch (error) {
            console.log(error)
            dispatch(logout({errorMessage: error.response.data.message}));
        }
    }
}