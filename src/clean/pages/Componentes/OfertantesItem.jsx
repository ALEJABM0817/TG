import React, { useState } from "react";
import ReactStars from "react-rating-stars-component";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import imageForDefault from '../../../assets/images/ofertantes/foto.jpg'

export const OfertantesItem = ({ imgSrc, areas, id, promedio, nombre}) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const [showPopup, setShowPopup] = useState(false);
    const { status, typeUser } = useSelector(state => state.auth);
    const navigate = useNavigate();
    

    const handleContractClick = () => {
        if (status !== 'authenticated') {
            setShowPopup(true); 
        } else {
            navigate(`/Ofertantes/${id}`);
        }
    };

    const areasList = JSON.parse(areas);

    return (
        <>
            <div className="ofertantes-card">
                <div>
                    <p style={{"fontWeight": "600"}}>{nombre}</p>
                </div>
                <div className="ofertantes-image-container">
                    <img 
                      src={`${apiUrl}uploads/${imgSrc}`} 
                      alt="Fotografía" 
                      className="ofertantes-image" 
                      onError={(e) => { e.target.onerror = null; e.target.src = `${imageForDefault}`; }} 
                    />
                </div>

                <div className="ofertantes-details">
                    <h4 className="ofertantes-title">Áreas</h4>
                    <div className="ofertantes-areas">
                        {areasList.map((area, index) => (
                            <span key={index} className="ofertantes-area">{area}</span>
                        ))}
                    </div>
                    {
                        promedio ? <ReactStars
                            count={5}
                            value={ promedio }
                            size={24}
                            edit={false}
                            activeColor="#ffd700"
                            classNames="stars-container"
                            isHalf={true}
                        />

                        : <p style={{
                            margin: '0',
                            padding: '0',
                            height: '50px',
                        }}>Sin calificaciones</p>
                    }

                    {
                        (typeUser == 'solicitante' || typeUser == null) && (
                            <input className="ofertantes-button" type="submit" value="Contratar" onClick={handleContractClick} />
                        )
                    }
                </div>


            </div>
            {showPopup && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <h3>Para contratar debes iniciar sesión o registrarte</h3>
                        <div className="popup-buttons">
                            <Link className="botton" to="/Login">Iniciar Sesión</Link>
                            <Link className="botton" to="/Register">Registrarse</Link>
                        </div>
                        <button className="popup-close" onClick={() => setShowPopup(false)}>Cerrar</button>
                    </div>
                </div>
            )}
        </>
    );
}
