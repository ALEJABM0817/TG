import React from "react";
import { Link } from "react-router-dom";

export const WorkInfo = () => {
  return (
    <div className="recruitment-container">
      <div className="image-container">
        <img
          src="https://via.placeholder.com/400" // Reemplaza esta URL por la URL de tu imagen
          alt="Equipo de limpieza"
          className="cleaning-team-image"
        />
      </div>
      <div className="info-container">
        <h1>¡Sé parte de nuestro equipo de limpieza!</h1>
        <p>Diligencia tu hoja de vida virtual y comienza tu proceso hoy mismo</p>
        <p>🕒 Turnos de máximo 7h y 40min</p>
        <div className="requirements-box">
          <h2>Empieza aquí</h2>
          <h3>Requisitos Obligatorios del cargo</h3>
          <ul>
            <li>Al menos una experiencia comprobable donde el aseo haya sido tu función principal</li>
            <li>Saber de aseo general, planchar y cocina básica</li>
            <li>Cédula de ciudadanía, cédula de extranjería colombiana o PEP con vigencia mínima de 12 meses</li>
            <li>Ser completamente honesta/o, las mentiras o falsificación de documentos son detectadas y bloquean tu perfil</li>
            <li>Excelente actitud y muchas ganas de aprender</li>
          </ul>
          <Link to="/register-ofertante" className="register-button">
            ¡Empezar ahora!
          </Link>
        </div>
      </div>
    </div>
  );
};
