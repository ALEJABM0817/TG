import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { createService, getServices } from '../../../api/usuarios.api';
import { useNavigate } from 'react-router-dom';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Modal from 'react-modal';
import { toast } from 'react-toastify';

const localizer = momentLocalizer(moment);

Modal.setAppElement('#root');

export const ServiceForm = ({ servicios, idOfertante }) => {
    const [selectedServices, setSelectedServices] = useState([]);
    const [error, setError] = useState('');
    const [showCalendar, setShowCalendar] = useState(false);
    const [showTimeSelection, setShowTimeSelection] = useState(false);
    const [currentServiceIndex, setCurrentServiceIndex] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const today = new Date().toISOString().split('T')[0];
    const { uid } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [services, setServices] = useState([]);
    const [warning, setWarning] = useState('');

    useEffect(() => {
        validateAllServices();

        const fetchServices = async () => {
            const { data } = await getServices(idOfertante, 'ofertante');
            const servicesArray = Array.isArray(data) ? data : [data];
            setServices(servicesArray);
        };

        fetchServices();
    }, [selectedServices, uid]);

    const calculateTotalPrice = () => {
        return selectedServices.reduce((total, service) => {
            return total + (Number(service.precio) * service.fechas.length);
        }, 0);
    };

    const CustomDay = (date) => {
        const dateStr = date.toISOString().split('T')[0];

        const isDateOccupied = services.some(service =>
            service.fechas.some(fecha => fecha.fecha === dateStr)
        );

        if (isDateOccupied) {
            return {
                style: {
                    backgroundColor: '#9e9e9e',
                    color: '#721c24',
                    borderColor: '#f5c6cb',
                    borderRadius: '3px',
                    pointerEvents: 'none',
                    cursor: 'not-allowed'
                }
            };
        }
    };

    const handleAddService = () => {
        setSelectedServices([...selectedServices, { idOfertante, idSolicitante: uid, servicio_id: '', servicio: '', tipo_tarifa: '', tipo_tarifa_id: '', fechas: [], plan: 1, precio: 0, comentario: '' }]);
    };

    const handleServiceChange = (index, field, value) => {
        const updatedServices = [...selectedServices];

        updatedServices[index][field] = value;
        updatedServices[index]['fechas'] = [];

        if (field === 'servicio') {
            const isAlreadySelected = selectedServices.some(
                (service, idx) => service.servicio === value && idx !== index
            );
            if (isAlreadySelected) {
                toast.info('Este servicio ya ha sido seleccionado en otro campo. Por favor, elija uno diferente.');
                return;
            }

            const selectedService = servicios.find(service => service.servicio === value);
            updatedServices[index]['precio'] = selectedService.tipos_tarifas[0].precio;
            updatedServices[index]['servicio_id'] = selectedService.servicio_id;
            updatedServices[index]['tipo_tarifa_id'] = selectedService.tipos_tarifas[0].tipo_tarifa_id;
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
        updatedServices[index]['plan'] = parseInt(value, 10);
        updatedServices[index]['fechas'] = [];
        setSelectedServices(updatedServices);
    };

    const handleRemoveService = (index) => {
        const updatedServices = [...selectedServices];
        updatedServices.splice(index, 1);
        setSelectedServices(updatedServices);
    };

    const handleCommentChange = (index, comentario) => {
        const updatedServices = [...selectedServices];
        updatedServices[index]['comentario'] = comentario;
        setSelectedServices(updatedServices);
    };

    const validateAllServices = () => {
        setError('');

        const jornadaCompletaPorFecha = {};
        const mediaJornadasPorFecha = {};

        selectedServices.forEach(service => {

            if (service.fechas.length !== service.plan) {
                setError(`Debe seleccionar ${service.plan} ${service.plan == 1 ? 'fecha' : 'fechas'} para el servicio de ${service.servicio}.`);
                return false;
            }

            if (service.tipo_tarifa === 'jornada_completa') {
                service.fechas.forEach(fecha => {
                    jornadaCompletaPorFecha[fecha.fecha] = true;
                });
            } else if (service.tipo_tarifa === 'media_jornada') {
                service.fechas.forEach(fecha => {
                    mediaJornadasPorFecha[fecha.fecha] = (mediaJornadasPorFecha[fecha.fecha] || 0) + 1;
                });
            }
        });

        // for (const fecha in jornadaCompletaPorFecha) {
        //     if (mediaJornadasPorFecha[fecha] > 0) {
        //         setError('No puede mezclar jornadas completas y medias jornadas en el mismo día.');
        //         return false;
        //     }
        // }

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
        console.log(selectedServices);
        if (validateAllServices()) {
            await createService(selectedServices);
            navigate('/panel');
        }
        toast.info('Servicio contratado con éxito');
    };

    const handleSelectDates = (index) => {
        setCurrentServiceIndex(index);
        setShowCalendar(true);
        const fechasFaltantes = selectedServices[index].plan - selectedServices[index].fechas.length;
        fechasFaltantes ? setWarning(`Te faltan por seleccionar ${fechasFaltantes} fecha(s).`) : setWarning('Ya seleccionaste todas las fechas para el plan seleccionado.')
    };

    const isDateAvailable = (fecha) => {
        const morningDate = `${fecha.split(' ')[0]} 08:00`;
        return !selectedServices[currentServiceIndex].fechas.includes(morningDate);
    };

    const handleDateSelect = ({ start }) => {
        const fecha = moment(start).format('YYYY-MM-DD HH:mm');
        const fechaSinHora = fecha.split(" ")[0];
        setSelectedDate(fecha);
        const selectedService = selectedServices[currentServiceIndex];

        if (moment(fechaSinHora).isBefore(moment().format('YYYY-MM-DD'))) {
            toast.info('No puede seleccionar una fecha anterior a la actual.');
            return;
        }

        const isDateOccupied = services.some(service =>
            service.fechas.some(fecha => fecha.fecha.split(" ")[0] === fechaSinHora) // compara solo la parte de la fecha
        );

        if (isDateOccupied) {
            toast.info('No puede seleccionar esta fecha, ya esta ocupada para otro servicio.');
            return;
        }

        if (selectedService.fechas.length >= selectedService.plan) {
            toast.info('Ya ha seleccionado la cantidad máxima de fechas para este plan.');
            return;
        }

        const isFullDaySelected = selectedServices.some(s =>
            s.fechas.includes(fecha.split(' ')[0]) && s.tipo_tarifa === 'jornada_completa'
        );

        if (isFullDaySelected) {
            toast.info('No puede seleccionar una media jornada en un día que ya tiene una jornada completa.');
            return;
        }


        const isHalfDaySelected = selectedServices.some(s =>
            s.fechas.some(f => typeof f === 'string' && f.split(' ')[0] === fecha.split(' ')[0] && s.tipo_tarifa === 'media_jornada')
        );

        if (isHalfDaySelected && selectedService.tipo_tarifa === 'jornada_completa') {
            toast.info('No puede seleccionar una jornada completa en un día que ya tiene una media jornada.');
            return;
        }

        if (selectedService.tipo_tarifa === 'media_jornada') {
            if (!isDateAvailable(fecha)) {
                toast.info('Ya ha seleccionado esta fecha para una media jornada en la mañana.');
                return;
            }
            setShowTimeSelection(true);
        } else if (selectedService.tipo_tarifa === 'jornada_completa') {

            const isDateSelected = selectedServices.some(s => s.fechas.includes(fecha));
            if (isDateSelected) {
                toast.info('No puede seleccionar más de dos medias jornadas para el mismo día y horario.');
                return;
            }
            addDateToService(fecha, 'completo');
            setShowCalendar(false);
        } else {

            const isDateSelected = selectedServices.some(s => s.fechas.includes(fecha));
            if (isDateSelected) {
                toast.info('No puede seleccionar más de dos medias jornadas para el mismo día y horario.');
                return;
            }
            addDateToService(fecha);
            setShowCalendar(false);
        }
    };

    const addDateToService = (fecha, turno) => {
        const updatedServices = [...selectedServices];
        const service = updatedServices[currentServiceIndex];

        const isDateSelected = service.fechas.some(f => f.fecha === fecha && f.turno === turno);
        if (isDateSelected) {
            toast.info('Ya ha seleccionado esta fecha y turno.');
            return;
        }

        if (turno === 'completo') {
            const isDateSelectedForHalfDay = selectedServices.some(s =>
                s.fechas.some(f => f.fecha.includes(fecha.split(' ')[0]) && f.turno !== 'completo')
            );
            if (isDateSelectedForHalfDay) {
                toast.info('No puede seleccionar una jornada completa en un día que ya tiene una media jornada.');
                return;
            }
        }

        service.fechas.push({ fecha, turno });
        setSelectedServices(updatedServices);
    };

    const addMorningDate = () => {
        const morningDate = `${selectedDate.split(' ')[0]} 08:00`;
        addDateToService(morningDate, 'mañana');
        setShowTimeSelection(false);
    };

    const addAfternoonDate = () => {
        const afternoonDate = `${selectedDate.split(' ')[0]} 14:00`;
        addDateToService(afternoonDate, 'tarde');
        setShowTimeSelection(false);
    };

    return (
        <div className="service-form">
            <h3>Contratar servicio</h3>

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
                        <option value="">Seleccionar tipo de jornada</option>
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

                    {selectedService.servicio && selectedService.tipo_tarifa && selectedService.plan > 0 && (
                        <button onClick={() => handleSelectDates(index)}>
                            Seleccionar fechas
                        </button>
                    )}

                    <p>Fechas seleccionadas: {selectedService.fechas.map(f => f.fecha).join(', ')}</p>

                    <textarea
                        className="textarea-service"
                        placeholder="Agrega una nota. Ej: recoger las hojas del patio"
                        value={selectedService.comentario}
                        onChange={(e) => handleCommentChange(index, e.target.value)}
                    />
                    <button className='eliminar-btn' onClick={() => handleRemoveService(index)}>Eliminar servicio</button>

                </div>
            ))}


            <button onClick={handleAddService}>Solicitar servicio</button>
            {error && <p className="error-message">{error}</p>}

            <div className="total">Precio total: {calculateTotalPrice()}</div>

            {
                !!selectedServices.length && <button className='button-send' onClick={validateAndSubmit}>Enviar</button>
            }

            <Modal className='open-calendar' isOpen={showCalendar} onRequestClose={() => setShowCalendar(false)}>
                <h1>Selecciona una fecha</h1>
                {warning && <h2 className="error-message">{warning}</h2>}
                <Calendar
                    localizer={localizer}
                    events={[]}
                    startAccessor="start"
                    endAccessor="end"
                    selectable
                    onSelectSlot={handleDateSelect}
                    style={{ height: 500 }}
                    views={['month']}
                    dayPropGetter={CustomDay}
                />
                <button className='close-modal button' onClick={() => setShowCalendar(false)}>Cerrar</button>
            </Modal>

            <Modal className='open-calendar' isOpen={showTimeSelection} onRequestClose={() => setShowTimeSelection(false)}>
                <h2>Selecciona un tiempo para media jornada</h2>
                <div className='container-buttons'>
                    <button className='button' onClick={addMorningDate}>En la mañana: 08:00 AM</button>
                    <button className='button' onClick={addAfternoonDate}>En la tarde: 14:00 PM</button>
                    <button className='close-modal button' onClick={() => setShowTimeSelection(false)}>Cerrar</button>
                </div>
            </Modal>
        </div>
    );
};