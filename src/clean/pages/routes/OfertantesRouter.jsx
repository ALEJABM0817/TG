import { Routes, Route, Navigate } from 'react-router-dom'
import { Navbar } from '../../../ui/Components/Navbar'
import { Planes } from '../Planes'
import { Home } from '../Home'
import { Panel } from '../admin/Panel'
import { Ofertantes } from '../Ofertantes'
import { OfertanteCV } from '../Ofertantes/OfertanteCV'

export const OfertantesRouter = () => {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/Planes" element={<Planes />} />
                <Route path="/Ofertantes" element={<Ofertantes />} />
                <Route path="/Ofertantes/:id" element={<OfertanteCV />} />
                <Route path="/panel" element={<Panel />} />
                <Route path="/" element={<Home />} exac />
                <Route path="/*" element={<Navigate to="/panel" replace />} />
            </Routes>
        </>
    );
}
