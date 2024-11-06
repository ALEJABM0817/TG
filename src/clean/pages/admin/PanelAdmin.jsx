import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { getUsuarios, toggleUsuarioHabilitado } from '../../../api/usuarios.api';

export const PanelAdmin = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [filtro, setFiltro] = useState('todos');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const response = await getUsuarios();
                setUsuarios(response.data);
            } catch (error) {
                toast.error('Error al obtener los usuarios:', error);
            }
        };

        fetchUsuarios();
    }, []);

    const handleToggleHabilitado = async (cedula, habilitado) => {
        try {
            await toggleUsuarioHabilitado(cedula, habilitado);
            setUsuarios((prevUsuarios) =>
                prevUsuarios.map((usuario) =>
                    usuario.cedula === cedula ? { ...usuario, habilitado: !usuario.habilitado } : usuario
                )
            );
            toast.success('Se ha actualizado el estado del usuario correctamente.');
        } catch (error) {
            toast.error('Error al actualizar el estado del usuario:', error);
        }
    };

    const confirmToggleHabilitado = (cedula, habilitado) => {
        confirmAlert({
            title: 'Confirmar acción',
            message: `¿Estás seguro de que deseas ${habilitado ? 'deshabilitar' : 'habilitar'} este usuario?`,
            buttons: [
                {
                    label: 'Sí',
                    onClick: () => handleToggleHabilitado(cedula, habilitado)
                },
                {
                    label: 'No',
                    onClick: () => {}
                }
            ]
        });
    };

    const filtrarUsuarios = () => {
        if (filtro === 'todos') return usuarios;
        if (filtro === 'habilitados') return usuarios.filter(usuario => usuario.habilitado);
        if (filtro === 'deshabilitados') return usuarios.filter(usuario => !usuario.habilitado);
        if (filtro === 'ofertantes') return usuarios.filter(usuario => usuario.typeUser === 'ofertante');
        if (filtro === 'solicitantes') return usuarios.filter(usuario => usuario.typeUser === 'solicitante');
        return usuarios;
    };

    const handleFiltroClick = (nuevoFiltro) => {
        setFiltro(nuevoFiltro);
        setSidebarOpen(false);
    };

    return (
        <div className={`panel-admin ${sidebarOpen ? 'open' : ''}`}>
            <div className="hamburger" onClick={() => setSidebarOpen(!sidebarOpen)}>
                &#9776; {/* Icono de menú hamburguesa */}
            </div>

            <div className="sidebar">
                <button onClick={() => handleFiltroClick('todos')}>Todos</button>
                <button onClick={() => handleFiltroClick('habilitados')}>Habilitados</button>
                <button onClick={() => handleFiltroClick('deshabilitados')}>Deshabilitados</button>
                <button onClick={() => handleFiltroClick('ofertantes')}>Ofertantes</button>
                <button onClick={() => handleFiltroClick('solicitantes')}>Solicitantes</button>
            </div>

            <div className="usuarios-list">
                {filtrarUsuarios().map((usuario) => (
                    <div key={usuario.cedula} className="card">
                        <div className="card-title">{usuario.nombre}</div>
                        <div className="card-info">
                            <p><strong>Cédula:</strong> {usuario.cedula}</p>
                            <p><strong>Tipo de Usuario:</strong> {usuario.typeUser}</p>
                            <p><strong>Estado:</strong> {usuario.habilitado ? 'Habilitado' : 'Deshabilitado'}</p>
                        </div>
                        <div className="card-action">
                            <button className={!usuario.habilitado ? 'habilitado' : 'deshabilitado'} onClick={() => confirmToggleHabilitado(usuario.cedula, usuario.habilitado)}>
                                {usuario.habilitado ? 'Deshabilitar' : 'Habilitar'} Usuario
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};