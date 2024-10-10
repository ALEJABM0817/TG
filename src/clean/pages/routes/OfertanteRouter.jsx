import { Routes, Route } from 'react-router-dom'
import { SolicitanteRouter } from './SolicitanteRouter'
import { Experiencia } from '../Componentes/Experiencia'

export const OfertanteRouter = () => {
    return (
        <Routes>
            <Route path="/*" element={<SolicitanteRouter />} />
            <Route path="/panel/experiencia" element={<Experiencia />} />
        </Routes>
    );
}
