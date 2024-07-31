import { getUsuario } from "../../api/usuarios.api"
import { checkingCredentials, login, logout } from "./"

export const checkingAuthentication = (email, password) => {
    return async(dispatch) => {
        dispatch( checkingCredentials )
    }
}

export const startLogin = ({cedula , password}) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());

        const result = await getUsuario({cedula, password});
        console.log(result)

        if(!result.ok) return dispatch(logout({errorMessage: result.errorMessage}));

        localStorage.setItem('token', result.token)
        localStorage.setItem('token-init-date', new Date().getTime())

        dispatch(login(result))
    }
}