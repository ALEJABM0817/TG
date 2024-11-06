import { Navigate, Route, Routes } from "react-router-dom"
import { CleanRouter } from "../clean/pages/routes/CleanRouter"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { CompleteInfo } from "../clean/pages/admin/CompleteInfo"
import { SolicitanteRouter } from "../clean/pages/routes/SolicitanteRouter"
import { chekcAuthToken } from "../store/auth"
import { Loader } from "../clean/pages/Loader/Loader"
import { OfertanteRouter } from "../clean/pages/routes/OfertanteRouter"
import { AdminRouter } from "../clean/pages/routes"


export const AppRouter = () => {
    const dispatch = useDispatch();

    const { status, typeUser, uid } = useSelector(state => state.auth);
    const { completeInfo } = useSelector(state => state.info);

    useEffect(() => {
        dispatch(chekcAuthToken())
    }, [])

    if (status === 'checking') {
        return <Loader />
    }

    return (
        <Routes>
        {
            (status === 'no-authenticated')
                ? (
                    <>
                        <Route path="/*" element={<CleanRouter />} />
                        <Route path="/complete-info/*" element={<Navigate to="/" />} />
                        <Route path="/panel/*" element={<Navigate to="/" />} />
                    </>
                )
                : (typeUser === 'admin') ? (
                    <>
                        <Route path="/*" element={<AdminRouter />} />
                    </>
                )
                : (typeUser === 'ofertante' && completeInfo) ? (
                    <>
                        <Route path="/*" element={<OfertanteRouter />} />
                    </>
                )
                : (typeUser === 'solicitante') ? (
                    <>
                        <Route path="/*" element={<SolicitanteRouter />} />
                    </>
                )
                : (
                    <>
                        <Route path="/complete-info" element={<CompleteInfo />} />
                        <Route path="/*" element={<Navigate to="/complete-info" />} />
                    </>
                )
        }
    </Routes>
    )
}
