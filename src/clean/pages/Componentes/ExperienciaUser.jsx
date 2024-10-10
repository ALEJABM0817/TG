import React from 'react';
import { useSelector } from 'react-redux';

export const ExperienciaUser = ({ onEdit, editingIndex }) => {
  const { ofertanteCV } = useSelector((state) => state.users);

  return (
    <div className="experiencia-user">
      <h3>Experiencia</h3>
      {ofertanteCV?.hasExperience ? (
        ofertanteCV.experiences?.map((item, index) => (
          <div key={index} className="cv-content">
            <h4>Experiencia {index + 1}</h4>
            <div className="cv-body">
              <p><strong>Ocupación:</strong> {item.title}</p>
              <p><strong>Compañía:</strong> {item.company}</p>
              <p><strong>Responsabilidades:</strong> {item.responsibilities}</p>
              <p><strong>Inicio:</strong> {new Date(item.startDate).toLocaleDateString()}</p>
              <p><strong>Fin:</strong> {item.isCurrent ? 'Actualmente trabajando' : new Date(item.endDate).toLocaleDateString()}</p>
            </div>
            <button onClick={() => onEdit(index, item)}>Editar experiencia</button>
          </div>
        ))
      ) : (
        <p>Sin Experiencia</p>
      )}
    </div>
  );
};
