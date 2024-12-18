import { Routes, Route, Navigate } from 'react-router-dom'
import { Navbar } from '../../../ui/Components/Navbar'
import { Planes } from '../Planes'
import { Home } from '../Home'
import { Panel } from '../admin/Panel'
import { Ofertantes } from '../Ofertantes'
import { OfertanteCV } from '../Componentes/OfertanteCV'
import { MisDatos } from '../Componentes/MisDatos'
import { MisDatosEdit } from '../Componentes/MisDatosEdit'
import { TarifasEdit } from '../Componentes/TarifasEdit'
import { Services } from '../Componentes/Services'

export const SolicitanteRouter = () => {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/Planes" element={<Planes />} />
                <Route path="/Ofertantes" element={<Ofertantes />} />
                <Route path="/Ofertantes/:id" element={<OfertanteCV />} />
                <Route path="/panel" element={<Panel />} />
                <Route path="/panel/mis-datos" element={<MisDatos />} />
                <Route path="/panel/mis-datos/edit" element={<MisDatosEdit />} />
                <Route path="/panel/mis-datos/tarifas-edit" element={<TarifasEdit />} />
                <Route path='/panel/solicitudes' element={<Services />} />
                <Route path="/" element={<Home />} exac />
                <Route path="/*" element={<Navigate to="/panel/mis-datos" replace />} />
            </Routes>
        </>
    );
}
