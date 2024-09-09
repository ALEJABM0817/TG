import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getOfertanteForCV } from '../../../store/auth';
import { useEffect, useState } from 'react';
import { Loader } from '../Loader/Loader';

export const OfertanteCV = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { ofertanteCV } = useSelector((state) => state.users);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        dispatch(getOfertanteForCV(id)).then(() => setIsLoading(false));
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
                        <img src={'http://localhost:4000/uploads/' + ofertanteCV.photo} alt="Imagen del ofertante" className="cv-image" />
                    </div>
                    {ofertanteCV?.hasExperience ? (ofertanteCV.experiences?.map((item, index) => (
                        <div key={index} className="cv-content">
                            <div className="cv-body">
                                <p><strong>Ocupacion:</strong> {item.title}</p>
                                <p><strong>Compañía:</strong> {item.company}</p>
                                <p><strong>Responsabilidades:</strong> {item.responsibilities}</p>
                                <p><strong>Inicio:</strong> {new Date(item.startDate).toLocaleDateString()}</p>
                                <p><strong>Fin:</strong> {item.isCurrent ? 'Actualmente trabajando' : new Date(item.endDate).toLocaleDateString()}</p>
                            </div>
                        </div>
                    ))) : <p>Sin Experiencia</p>}
                    <div className="cv-rating">
                        <span>★★★★★</span>
                    </div>
                    <button className="solicitar-btn" onClick={handleSolicitar}>Solicitar</button>
                </div>
            )}
        </div>
    );
};