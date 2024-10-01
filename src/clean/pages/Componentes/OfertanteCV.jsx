import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getOfertanteForCV } from '../../../store/auth';
import { useEffect, useState } from 'react';
import { Loader } from '../Loader/Loader';
import { getTarifas } from '../../../api/usuarios.api';
import { ServiceForm } from './ServiceForm';

export const OfertanteCV = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { ofertanteCV } = useSelector((state) => state.users);
    const [isLoading, setIsLoading] = useState(true);
    const [tarifas, setTarifas] = useState([]);

    useEffect(() => {
        dispatch(async (dispatch) => {
            await dispatch(getOfertanteForCV(id));
            setIsLoading(false);
            const res = await getTarifas(id);
            setTarifas(res.data);
        });
    }, []);

    const handleSolicitar = () => {
        if (id) {
            console.log('Solicitando con ID:', id);
        } else {
            navigate('/error');
        }
    };

    return (
        <div className="cv-container">
            <button className="back-btn" onClick={() => navigate(-1)}>Volver</button>

            {isLoading ? (
                <Loader />
            ) : (
                <div className="cv-content-wrapper">
                    <div className="cv-header">
                        <div className="cv-header-content">
                            <img src={'http://localhost:4000/uploads/' + ofertanteCV.photo} alt="Imagen del ofertante" className="cv-image" />
                            <h2 className="cv-name">{ofertanteCV.nombre}</h2>
                        </div>
                    </div>
                    <div className='container-cv-content'>
                        <div className="cv-main-content">
                            <div className="cv-left">
                                <h3>Experiencia</h3>
                                {ofertanteCV?.hasExperience ? (ofertanteCV.experiences?.map((item, index) => (
                                    <div key={index} className="cv-content">
                                        <h4>Experiencia {index + 1}</h4>
                                        <div className="cv-body">
                                            <p><strong>Ocupación:</strong> {item.title}</p>
                                            <p><strong>Compañía:</strong> {item.company}</p>
                                            <p><strong>Responsabilidades:</strong> {item.responsibilities}</p>
                                            <p><strong>Inicio:</strong> {new Date(item.startDate).toLocaleDateString()}</p>
                                            <p><strong>Fin:</strong> {item.isCurrent ? 'Actualmente trabajando' : new Date(item.endDate).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                ))) : <p>Sin Experiencia</p>}
                            </div>
                            <div className="cv-right">
                                <h3>Servicios</h3>
                                {tarifas?.map((tarifa, index) => (
                                    <div key={index}>
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
                            </div>
                        </div>

                        <ServiceForm servicios={tarifas} idOfertante={+id} />
                    </div>
                    <div className="cv-footer">
                        <div className="cv-rating">
                            <span>★★★★★</span>
                        </div>
                        <button className="solicitar-btn" onClick={handleSolicitar}>Solicitar</button>
                    </div>
                </div>
            )}
        </div>
    );
};
