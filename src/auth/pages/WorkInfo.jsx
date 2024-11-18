import React from "react";
import { Link } from "react-router-dom";
import workImg from '../../assets/images/ofertantes/trabajo.png';

export const WorkInfo = () => {
  return (
    <div className="recruitment-container">
      <div className="image-container">
        <img
          src={workImg} 
          alt="Equipo de limpieza"
          className="cleaning-team-image"
        />
      </div>
      <div className="info-container">
        <h1>¡Sé parte de nuestro equipo de servicios generales!</h1>
        <p>Diligencia tu hoja de vida virtual y comienza tu proceso hoy mismo</p>
        <p>🕒 Turnos de máximo 8 horas</p>
        <div className="requirements-box">
          <h2>Empieza aquí</h2>
          <h3>Requisitos Obligatorios del cargo</h3>
          <ul>
          <li>Cédula de ciudadanía, cédula de extranjería colombiana o PEP con vigencia mínima de 12 meses</li>
            <li>Conocimientos y aptitudes en servicios generales</li> 
            <li>Ser completamente honesto, las mentiras o falsificación de documentos son detectadas y bloquean tu perfil</li>
            <li>Excelente actitud</li>
          </ul>
          <Link to="/register-ofertante" className="register-button">
            ¡Empezar ahora!
          </Link>
        </div>
      </div>
    </div>
  );
};
