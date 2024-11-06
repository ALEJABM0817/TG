import usuariosApi from "../../api/usuarios.api"
import { checkingCredentials, login, logout, isCompleteInfo, setOfertantes, setOfertanteCV, setResetCompleteInfo } from "./"
import { toast } from 'react-toastify';

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
            localStorage.setItem('token', data.token)
            localStorage.setItem('token-init-date', new Date().getTime())

            if(data.typeUser === 'ofertante') {
                const dataOfetante = await usuariosApi.post('is-complete-info',{cedula})
                dispatch(isCompleteInfo(dataOfetante.data));
            }
            dispatch(login(data))
        } catch (error) {
            dispatch(logout({errorMessage: error.response.data.message}));
            toast.error(error.response.data.message)
        }
    }
}

export const startRegister = (dataRegister) => {
    return async (dispatch) => {
        try {
            dispatch(checkingCredentials());

            const { data } = await usuariosApi.post('user', dataRegister);

            localStorage.setItem('token', data.token );
            localStorage.setItem('token-init-date', new Date().getTime() );
            dispatch(login(data));
        } catch (error) {
            toast.error(error.response.data.message)
            dispatch(logout({errorMessage: error.response.data.message}));
            toast.error(error.response.data.message)
        }
    }
}

export const chekcAuthToken = () => {
    return async (dispatch) => {
        const token = localStorage.getItem('token');
        if(!token){
            dispatch(setResetCompleteInfo());
            dispatch(logout());
            return
        }

        try {
            const { data } = await usuariosApi.get('renew');
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            if(data.typeUser === 'ofertante') {
                const dataOfetante = await usuariosApi.post('is-complete-info',{"cedula": data.cedula})
                dispatch(isCompleteInfo(dataOfetante.data));
            }
            dispatch(login(data));
        } catch (error) {
            localStorage.clear();
            dispatch(logout());
            dispatch(setResetCompleteInfo());
        }
    }
}

export const checkCompleteInfo = (cedula) => {
    return async (dispatch) => {
        try {
            const {data} = await usuariosApi.post('is-complete-info', {cedula});
            dispatch(isCompleteInfo(data));
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}

export const startLogout = () => {
    localStorage.clear();
    return async (dispatch) => {
        dispatch(logout());
        dispatch(setResetCompleteInfo());
    }
}

export const getOfertantes = () => {
    return async (dispatch) => {
        try {
            const { data } = await usuariosApi.get('ofertantes');
            dispatch(setOfertantes(data));
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}

export const getOfertanteForCV = (cedula) => {
    return async (dispatch) => {
        try {
            const { data } = await usuariosApi.post('ofertanteCV', {cedula});
            dispatch(setOfertanteCV(data));
            return data;
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}