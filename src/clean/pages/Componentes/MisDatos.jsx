import React, { useEffect, useState } from 'react';
import { getTarifas, getUserData } from '../../../api/usuarios.api';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const MisDatos = () => {
    const { uid } = useSelector((state) => state.auth);
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();
    const [tarifas, setTarifas] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await getUserData(uid);
            setUserData(data);
        };

        fetchData();

        const fetchTarifas = async () => {
            const res = await getTarifas(uid);
            setTarifas(res.data);
        }

        fetchTarifas();
    }, [uid]);

    const handleEditClick = () => {
        navigate('/panel/mis-datos/edit');
    };

    const handleEditTarifas = () => {
        navigate('/panel/mis-datos/tarifas-edit');
    }

    return (
        <>
            <div className='container-mis-datos'>
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
                    {
                        tarifas.length !== 0 && (
                            <div className="user-card">
                                <h2>Tarifas</h2>
                                {tarifas?.map((tarifa, index) => (
                                    <div className='container-tarifa' key={index}>
                                        <h4>{tarifa.servicio}</h4>
                                        {tarifa.tipos_tarifas.map((tipoTarifa, index) => (
                                            <div key={index} className="cv-content">
                                                <div className="cv-body">
                                                    <p><strong>Tipo de tarifa:</strong> {tipoTarifa.label}</p>
                                                    <p><strong>Precio:</strong> {tipoTarifa.precio}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                                <button onClick={handleEditTarifas}>Editar</button>
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    );
};
