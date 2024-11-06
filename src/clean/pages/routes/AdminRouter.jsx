import React from 'react'
import { Navbar } from '../../../ui/Components/Navbar';
import { Navigate, Route, Routes } from 'react-router-dom';
import { PanelAdmin } from '../admin/PanelAdmin';

export const AdminRouter = () => {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/panel" element={<PanelAdmin />} />
                <Route path="/*" element={<Navigate to="/panel" replace />} />
            </Routes>
        </>
    );
}
