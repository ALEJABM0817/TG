import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getServices, setRating } from '../../../api/usuarios.api';
import ReactStars from "react-rating-stars-component";
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import { GoogleMap, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import { useGoogleMaps } from '../../../google-maps/GoogleMapsProvider';

Modal.setAppElement('#root');

const GoogleMapsLoader = ({ children }) => {
    const { isScriptLoaded, setIsScriptLoaded } = useGoogleMaps();

    useEffect(() => {
        if (!isScriptLoaded) {
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBt3i7fDx-EJGOIpOVwWdbpPIldkggetG0`;
            script.async = true;
            script.onload = () => setIsScriptLoaded(true);
            document.head.appendChild(script);
        }
    }, [isScriptLoaded, setIsScriptLoaded]);

    if (!isScriptLoaded) return <div>Loading...</div>;
    return children;
};

export const Services = () => {
    const { uid, typeUser, direccion } = useSelector((state) => state.auth);
    const [services, setServices] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rating, setRatingState] = useState(0);
    const [comment, setComment] = useState('');
    const [ratingServiceIndex, setRatingServiceIndex] = useState(null);
    const [isMapModalOpen, setIsMapModalOpen] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState('');
    const [directionsResponse, setDirectionsResponse] = useState(null);
    const [shouldFetchDirections, setShouldFetchDirections] = useState(false);

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
                toast.warning('Por favor, selecciona una calificación antes de enviar.');
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
            toast.success('Servicio calificado exitosamente.');
        } catch (error) {
            toast.error('Hubo un error al calificar el servicio. Por favor, inténtalo de nuevo.');
        }
    };

    const ensureAddressContainsKeywords = (address) => {
        const lowerCaseAddress = address.toLowerCase();
    
        if (!lowerCaseAddress.includes("tuluá") && !lowerCaseAddress.includes("tulua")) {
            address += ", Tuluá";
        }
    
        if (!lowerCaseAddress.includes("valle")) {
            address += ", Valle del Cauca";
        }
    
        return address;
    };

    const adjustedDireccion = ensureAddressContainsKeywords(direccion);

    const handleMapButtonClick = (addressMap) => {
        const adjustedAddress = ensureAddressContainsKeywords(addressMap);
        setSelectedAddress(adjustedAddress);
        setIsMapModalOpen(true);
        setShouldFetchDirections(true);
    };

    const handleCloseMapModal = () => {
        setIsMapModalOpen(false);
        setSelectedAddress('');
        setDirectionsResponse(null);
        setShouldFetchDirections(false);
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
                                <p><strong>Tipo de Jornada:</strong> {servicioDisplayMapping[service.tipo_tarifa]}</p>
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

                            {typeUser === 'ofertante' && (
                                <button className="map-button" onClick={() => handleMapButtonClick(service.direccion)}>
                                    Ver dirección en el mapa
                                </button>
                            )}

                            <Modal className="rating-modal" isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
                                <button className="modal-close-button" onClick={() => setIsModalOpen(false)}>X</button>
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
                            </Modal>
                        </div>
                    ))}
                </div>
            )}

            <Modal className="map-modal" isOpen={isMapModalOpen} onRequestClose={handleCloseMapModal}>
                <button className="modal-close-button" onClick={handleCloseMapModal}>X</button>
                <h2 className="map-title">Dirección en el mapa</h2>
                <GoogleMapsLoader>
                    <div className="map-container">
                        <GoogleMap
                            center={{ lat: -3.745, lng: -38.523 }}
                            zoom={10}
                        >
                            {shouldFetchDirections && (
                                <DirectionsService
                                    options={{
                                        origin: adjustedDireccion,
                                        destination: selectedAddress,
                                        travelMode: 'DRIVING'
                                    }}
                                    callback={(response, status) => {
                                        if (status === 'OK') {
                                            setDirectionsResponse(response);
                                            setShouldFetchDirections(false);
                                        } else {
                                            console.error(`error fetching directions ${response}`);
                                        }
                                    }}
                                />
                            )}
                            {directionsResponse && (
                                <DirectionsRenderer
                                    directions={directionsResponse}
                                />
                            )}
                        </GoogleMap>
                    </div>
                </GoogleMapsLoader>
            </Modal>
        </div>
    );
};