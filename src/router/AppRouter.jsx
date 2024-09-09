import { Navigate, Route, Routes } from "react-router-dom"
import { CleanRouter } from "../clean/pages/routes/CleanRouter"
import { useDispatch, useSelector } from "react-redux"
import { CheckingAuth } from "../ui/"
import { useEffect } from "react"
import { CompleteInfo } from "../clean/pages/admin/CompleteInfo"
import { Panel } from "../clean/pages/admin/Panel"
import { OfertantesRouter } from "../clean/pages/routes/OfertantesRouter"
import { chekcAuthToken } from "../store/auth"
import { PanelCopy } from "../clean/pages/admin/PanelCopy"


export const AppRouter = () => {
    const dispatch = useDispatch();

    const { status, typeUser, uid } = useSelector(state => state.auth);
    const { completeInfo } = useSelector(state => state.info);

    useEffect(() => {
        dispatch(chekcAuthToken())
    }, [])

    if (status === 'checking') {
        return <CheckingAuth />
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

                    : ((typeUser === 'ofertante' && completeInfo) ) ? (
                        <>
                            <Route path="/panel" element={<PanelCopy />} />
                            <Route path="/*" element={<Navigate to="/panel" />} />

                        </>
                    )

                        :  typeUser == 'solicitante' ? (
                            <>
                                <Route path="/*" element={<OfertantesRouter />} />
                            </>
                        ) : (
                            <>
                                <Route path="/complete-info" element={<CompleteInfo />} />
                                <Route path="/*" element={<Navigate to="/complete-info" />} />
                            </>
                        )
            }

        </Routes>
    )
}
