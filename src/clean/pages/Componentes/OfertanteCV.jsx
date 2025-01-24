import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getOfertanteForCV } from '../../../store/auth';
import { useEffect, useState } from 'react';
import { Loader } from '../Loader/Loader';
import { getTarifas } from '../../../api/usuarios.api';
import { ServiceForm } from './ServiceForm';
import imageDefault from '../../../assets/images/ofertantes/foto.jpg';
import numeral from 'numeral';
import ReactStars from "react-rating-stars-component";

export const OfertanteCV = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
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
                            <img
                                src={`${apiUrl}/uploads/${ofertanteCV.photo}`}
                                alt="Imagen del ofertante"
                                className="cv-image"
                                onError={(e) => { e.target.onerror = null; e.target.src = `${imageDefault}`; }}
                            />
                            <h2 className="cv-name">{ofertanteCV.nombre}</h2>
                            {
                                ofertanteCV.promedio_calificacion ? <ReactStars
                                    count={5}
                                    value={ ofertanteCV.promedio_calificacion }
                                    size={24}
                                    edit={false}
                                    activeColor="#ffd700"
                                    classNames="stars-container"
                                    isHalf={true}
                                    margin={'auto'}
                                />

                                : <p style={{
                                    margin: '0',
                                    padding: '0',
                                    height: '50px',
                                }}>Sin calificaciones</p>
                            }
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
                                            <p><strong>Teléfono:</strong> {item.telefono}</p>
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
                                                    <p><strong>Precio:</strong> {numeral(tipoTarifa.precio).format('0,0')}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>

                            <div className='cv-comments'>
                                <h3>Comentarios</h3>
                                {(ofertanteCV.comentarios.length && !!ofertanteCV.comentarios) ? ofertanteCV.comentarios.map((comment, index) => (
                                    <div key={index} className="cv-comment">
                                        <div className="cv-comment-body">
                                            <p><strong>Realizado por:</strong> {comment.nombre}</p>
                                            <p><strong>Comentario:</strong> {comment.comentario}</p>
                                        </div>
                                    </div>
                                )) : <p>Sin comentarios</p>}
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
