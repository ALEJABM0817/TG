import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getServices, setRating } from '../../../api/usuarios.api';
import ReactStars from "react-rating-stars-component";
import ReactModal from 'react-modal';

export const Services = () => {
    const { uid, typeUser } = useSelector((state) => state.auth);
    const [services, setServices] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rating, setRatingState] = useState(0);
    const [comment, setComment] = useState('');
    const [ratingServiceIndex, setRatingServiceIndex] = useState(null);

    const fetchServices = async () => {
        const { data } = await getServices(uid, typeUser);
        const servicesArray = Array.isArray(data) ? data : [data];
        setServices(servicesArray);
    };

    useEffect(() => {
        fetchServices();
    }, []);

    const servicioDisplayMapping = {
        media_jornada: 'Media jornada',
        jornada_completa: 'Jornada completa',
    };

    const handleCommentChange = (comentario) => {
        setComment(comentario);
    };

    const handleRatingSubmit = async () => {
        try {
            if (rating === 0) {
                alert('Por favor, selecciona una calificación antes de enviar.');
                return;
            }
            const service = services[ratingServiceIndex];
            const updatedService = {
                service_id: service.id,
                comentario: comment,
                calificacion: rating,
                idOfertante: service.idOfertante,
                idSolicitante: service.idSolicitante,
            };
    
            setIsModalOpen(false);
    
            await setRating(updatedService);
            fetchServices();
            alert('Servicio calificado exitosamente.');
        } catch (error) {
            console.error('Error al calificar el servicio:', error);
            alert('Hubo un error al calificar el servicio. Por favor, inténtalo de nuevo.');
        }
    };

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
                                <p><strong>Nombre del {typeUser == 'solicitante' ? 'contratista' : 'solicitante'}:</strong> {service.nombre}</p>
                                <p><strong>Teléfono:</strong> {service.telefono}</p>
                                <p><strong>Jornada:</strong> {servicioDisplayMapping[service.tipo_tarifa]}</p>
                                <p><strong>Comentarios:</strong> {service.comentario ? service.comentario : 'Sin comentarios'}</p>
                            </div>
                            <div className="service-footer">
                                <p className="service-date">
                                    <strong>Fecha: </strong>
                                    {service.fechas.map((date, index) => new Date(date.fecha).toLocaleDateString()).join(', ')}
                                </p>
                                <p className="service-price"><strong>Precio por jornada:</strong> ${service.precio}</p>
                            </div>

                            {typeUser === 'solicitante' && service.status === 'Pendiente' && (
                                <button className="rating-button" onClick={() => {
                                    setIsModalOpen(true);
                                    setRatingServiceIndex(index);
                                }}>Calificar servicio</button>
                            )}

                            <ReactModal className="rating-modal" isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
                                <h2 className="rating-title">Calificar servicio</h2>

                                <ReactStars
                                    className="rating-stars"
                                    count={5}
                                    value={rating}
                                    onChange={setRatingState}
                                    size={24}
                                    activeColor="#ffd700"
                                />

                                <textarea
                                    className="rating-comment"
                                    placeholder="Deja un comentario del trabajo realizado por el contratista"
                                    onChange={(e) => handleCommentChange(e.target.value)}
                                />

                                <button className="rating-submit" onClick={handleRatingSubmit}>Enviar calificación</button>
                            </ReactModal>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};