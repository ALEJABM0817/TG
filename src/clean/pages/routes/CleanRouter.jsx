import { Navigate, Route, Routes } from "react-router-dom"
import { Navbar } from "../../../ui/Components/Navbar";
import { Planes } from "../Planes";
import { Ofertantes } from "../Ofertantes";
import { Home } from "../Home";
import { CV } from "../CV";
import { CompleteInfo } from "../admin/CompleteInfo";
import { LoginPage } from "../../../auth/pages/LoginPage";
import { PersonaNatural } from "../../../auth/pages/PersonaNatural";
import { WorkInfo } from "../../../auth/pages/WorkInfo";
import { PersonaOfertante } from "../../../auth/pages/PersonaOfetante";
import { Panel } from "../admin/Panel";


export const CleanRouter = () => {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/Login" element={<LoginPage />} />
                <Route path="register" element={<PersonaNatural />} />
                <Route path="/" element={<Home />} exac />
                <Route path="/Planes" element={<Planes />} />
                <Route path="/Ofertantes" element={<Ofertantes />} />
                <Route path="/cv" element={<CV />} />
                <Route path="/complete-info" element={<CompleteInfo />} />
                <Route path="/work" element={<WorkInfo />} />
                <Route path="/register-ofertante" element={<PersonaOfertante />} />
                <Route path="/panel" element={<Panel />} />
                <Route path="/Ofertantes/*" element={<Navigate to="/" />} />
            </Routes>
        </>
    );
};
