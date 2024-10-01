import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { createService } from '../../../api/usuarios.api';
import { useNavigate } from 'react-router-dom';

export const ServiceForm = ({ servicios, idOfertante }) => {
    const [selectedServices, setSelectedServices] = useState([]);
    const [error, setError] = useState('');
    const today = new Date().toISOString().split('T')[0];
    const { uid } = useSelector((state) => state.auth);

    const navigate = useNavigate();

    useEffect(() => {
        validateAllServices();
    }, [selectedServices]);

    const calculateTotalPrice = () => {
        return selectedServices.reduce((total, service) => {
            return total + (Number(service.precio) * service.fechas.length);
        }, 0);
    };

    const handleAddService = () => {
        setSelectedServices([...selectedServices, {idOfertante, idSolicitante: uid, servicio_id: '', servicio: '', tipo_tarifa: '', tipo_tarifa_id: '', fechas: [], plan: 1, precio: 0 }]);
    };

    const handleServiceChange = (index, field, value) => {
        const updatedServices = [...selectedServices];

        updatedServices[index][field] = value;

        if (field === 'servicio') {
            const isAlreadySelected = selectedServices.some(
                (service, idx) => service.servicio === value && idx !== index
            );
            if (isAlreadySelected) {
                alert('Este servicio ya ha sido seleccionado en otro campo. Por favor, elija uno diferente.');
                return;
            }

            const selectedService = servicios.find(service => service.servicio === value);
            updatedServices[index]['precio'] = selectedService.tipos_tarifas[index].precio;
            updatedServices[index]['tipo_tarifa'] = selectedService.tipos_tarifas[index].tipo_tarifa;
            updatedServices[index]['servicio_id'] = selectedService.id;
            updatedServices[index]['tipo_tarifa_id'] = selectedService.tipos_tarifas[index].tipo_tarifa_id;
        }

        if (field === 'tipo_tarifa') {
            const selectedService = servicios.find(service => service.servicio === updatedServices[index].servicio);
            const tarifaSeleccionada = selectedService.tipos_tarifas.find(tarifa => tarifa.tipo_tarifa === value);

            updatedServices[index]['precio'] = tarifaSeleccionada.precio;
        }

        setSelectedServices(updatedServices);
    };

    const handlePlanChange = (index, value) => {
        const updatedServices = [...selectedServices];
        const newPlan = parseInt(value, 10);

        if (updatedServices[index]['fechas'].length > newPlan) {
            updatedServices[index]['fechas'] = updatedServices[index]['fechas'].slice(0, newPlan);
        }

        updatedServices[index]['plan'] = newPlan;
        setSelectedServices(updatedServices);
    };

    const handleDateChange = (index, date) => {
        const updatedServices = [...selectedServices];
        const selectedPlan = updatedServices[index]['plan'];

        if (updatedServices[index]['fechas'].includes(date)) {
            alert('Esta fecha ya ha sido seleccionada para este servicio.');
            return;
        }

        const isDateUsedInAnotherService = selectedServices.some((service, idx) => 
            service.fechas.includes(date) && idx !== index
        );

        if (isDateUsedInAnotherService) {
            alert('Esta fecha ya ha sido seleccionada en otro servicio.');
            return;
        }

        if (updatedServices[index]['fechas'].length < selectedPlan) {
            updatedServices[index]['fechas'].push(date);
            setSelectedServices(updatedServices);
        } else {
            alert(`Solo puedes seleccionar ${selectedPlan} fecha(s) para este servicio.`);
        }
    };

    const handleRemoveService = (index) => {
        const updatedServices = [...selectedServices];
        updatedServices.splice(index, 1);
        setSelectedServices(updatedServices);
    };

    const validateAllServices = () => {
        setError('');

        const jornadaCompletaPorFecha = {};
        const mediaJornadasPorFecha = {};

        selectedServices.forEach(service => {
            if (service.fechas.length === 0 || !service.tipo_tarifa) return;

            service.fechas.forEach(fecha => {
                if (service.tipo_tarifa === 'jornada_completa') {
                    jornadaCompletaPorFecha[fecha] = true;
                } else if (service.tipo_tarifa === 'media_jornada') {
                    mediaJornadasPorFecha[fecha] = (mediaJornadasPorFecha[fecha] || 0) + 1;
                }
            });
        });

        for (const fecha in jornadaCompletaPorFecha) {
            if (mediaJornadasPorFecha[fecha] > 0) {
                setError('No puede mezclar jornadas completas y medias jornadas en el mismo día.');
                return false;
            }
        }

        for (const fecha in mediaJornadasPorFecha) {
            if (mediaJornadasPorFecha[fecha] > 2) {
                setError('No puede seleccionar más de dos medias jornadas para el mismo día.');
                return false;
            }
        }

        const invalidDate = selectedServices.find(service => service.fechas.some(fecha => fecha < today));
        if (invalidDate) {
            setError('No puede seleccionar una fecha anterior al día de hoy.');
            return false;
        }

        return true;
    };

    const validateAndSubmit = async () => {
        if (validateAllServices()) {
            await createService(selectedServices);
            navigate('/panel');
        }
    };

    return (
        <div className="service-form">
            <h3>Selecciona un servicio</h3>

            {selectedServices.map((selectedService, index) => (
                <div key={index} className="service-row">
                    <select
                        value={selectedService.servicio}
                        onChange={(e) => handleServiceChange(index, 'servicio', e.target.value)}
                    >
                        <option value="">Selecciona un servicio</option>
                        {servicios
                            .filter(service => !selectedServices.some(s => s.servicio === service.servicio && s !== selectedService))
                            .map(service => (
                                <option key={service.servicio_id} value={service.servicio}>
                                    {service.servicio}
                                </option>
                            ))}
                    </select>

                    <select
                        value={selectedService.tipo_tarifa}
                        onChange={(e) => handleServiceChange(index, 'tipo_tarifa', e.target.value)}
                    >
                        {servicios.find(s => s.servicio === selectedService.servicio)?.tipos_tarifas.map(tarifa => (
                            <option key={tarifa.tipo_tarifa_id} value={tarifa.tipo_tarifa}>
                                {tarifa.label} - {tarifa.precio}
                            </option>
                        ))}
                    </select>

                    <select
                        value={selectedService.plan}
                        onChange={(e) => handlePlanChange(index, e.target.value)}
                    >
                        <option value="1">1 día</option>
                        <option value="2">2 días</option>
                        <option value="3">3 días</option>
                        <option value="4">4 días</option>
                        <option value="5">5 días</option>
                    </select>

                    {Array.from({ length: selectedService.plan }, (_, i) => (
                        <input
                            key={i}
                            type="date"
                            value={selectedService.fechas[i] || ''}
                            min={today}
                            onChange={(e) => handleDateChange(index, e.target.value)}
                        />
                    ))}

                    <p>Fechas seleccionadas: {selectedService.fechas.join(', ')}</p>

                    <p>Precio: {selectedService.precio}</p>

                    <button className="eliminar-btn" onClick={() => handleRemoveService(index)}>Eliminar</button>
                </div>
            ))}

            <button onClick={handleAddService}>
                {selectedServices.length === 0 ? 'Agregar servicio' : 'Añadir otro servicio'}
            </button>

            {error && <p className="error-message">{error}</p>}

            {selectedServices.length > 0 && (
                <p className="total">Total a pagar: ${calculateTotalPrice()}</p>
            )}

            {selectedServices.length > 0 && !error && (
                <button onClick={validateAndSubmit}>Solicitar</button>
            )}
        </div>
    );
};
