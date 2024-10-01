import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getServices } from '../../../api/usuarios.api';

export const Services = () => {
    const { uid, typeUser } = useSelector((state) => state.auth);
    const [services, setServices] = useState([]);

    useEffect(() => {
        const fetchServices = async () => {
            const { data } = await getServices(uid, typeUser);
            const servicesArray = Array.isArray(data) ? data : [data];
            setServices(servicesArray);
        };

        fetchServices();
    }, [uid]);

    return (
        <div className="services-container">
            <h1 className="services-title">Solicitudes de Servicio</h1>
            {services.length === 0 ? (
                <p className="no-services">No hay servicios disponibles.</p>
            ) : (
                <div className="services-list">
                    {services.map((service, index) => (
                        <div key={index} className="service-card">
                            <h2 className="service-name">{service.servicio}</h2>
                            <div className="service-details">
                                <p><strong>Nombre:</strong> {service.nombre}</p>
                                <p><strong>Teléfono:</strong> {service.telefono}</p>
                                <p><strong>Tipo de Jornada:</strong> {service.tipo_tarifa}</p>
                            </div>
                            <div className="service-footer">
                                <p className="service-date"><strong>Fecha:</strong> {new Date(service.fecha).toLocaleDateString()}</p>
                                <p className="service-price"><strong>Precio:</strong> ${service.precio}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
