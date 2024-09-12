import React, { useEffect, useState } from 'react';
import { getUserData } from '../../../api/usuarios.api';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const MisDatos = () => {
    const { uid } = useSelector((state) => state.auth);
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await getUserData(uid);
            setUserData(data);
        };

        fetchData();
    }, [uid]);

    const handleEditClick = () => {
        navigate('/panel/mis-datos/edit');
    };

    return (
        <div className="mis-datos-container">
            {userData && (
                <div className="user-card">
                    <h2>{userData.nombre}</h2>
                    <p><strong>Cédula:</strong> {userData.cedula}</p>
                    <p><strong>Dirección:</strong> {userData.direccion}</p>
                    <p><strong>Teléfono:</strong> {userData.telefono}</p>
                    <p><strong>Email:</strong> {userData.email}</p>
                    <button onClick={handleEditClick}>Editar</button>
                </div>
            )}
        </div>
    );
};
