import { Navigate, Route, Routes } from "react-router-dom"
import { CleanRouter } from "../clean/pages/CleanRouter"
import { LoginPage } from "../auth/pages/LoginPage"
import { PersonaNatural } from "../auth/pages/PersonaNatural"
import { Empresa } from "../auth/pages/Empresa"
import { CV } from "../clean/pages/CV"
import { useDispatch, useSelector } from "react-redux"
import { CheckingAuth } from "../ui/"
import { useEffect } from "react"
import { checkCompleteInfo, chekcAuthToken } from "../store/auth"
import { CompleteInfo } from "../clean/pages/admin/CompleteInfo"
import { Panel } from "../clean/pages/admin/Panel"


export const AppRouter = () => {
    const dispatch = useDispatch();

    const { status, typeUser, uid } = useSelector(state => state.auth);
    const { completeInfo } = useSelector(state => state.info);

    useEffect(() => {
        dispatch(chekcAuthToken())
    }, [])

    console.log(status, typeUser, uid)
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

                    : ((typeUser === 'ofertante' && completeInfo) || typeUser !== 'ofertante') ? (
                        <>
                            <Route path="/panel" element={<Panel />} />
                            <Route path="/*" element={<Navigate to="/panel" />} />

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
