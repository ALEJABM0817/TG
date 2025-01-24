import React, { useState, useEffect } from 'react';

export const ExperienceForm = ({ 
    experience, 
    onClearForm, 
    onAddExperience, 
    onUpdateExperience, 
    onDeleteExperience, 
    onRemoveAddedExperience 
}) => {
    const [formData, setFormData] = useState({
        title: '',
        company: '',
        startDate: '',
        endDate: '',
        responsibilities: '',
        isCurrent: false,
        telefono: ''
    });

    const [isEditing, setIsEditing] = useState(false);
    const [isAddingNew, setIsAddingNew] = useState(false);

    useEffect(() => {
        if (experience) {
            setFormData({
                title: experience.title,
                company: experience.company,
                startDate: new Date(experience.startDate).toISOString().slice(0, 10),
                endDate: experience.isCurrent ? '' : new Date(experience.endDate).toISOString().slice(0, 10),
                responsibilities: experience.responsibilities,
                isCurrent: experience.isCurrent,
                telefono: experience.telefono
            });
            setIsEditing(true);
            setIsAddingNew(false);
        } else {
            setFormData({
                title: '',
                company: '',
                startDate: '',
                endDate: '',
                responsibilities: '',
                isCurrent: false,
                telefono: ''
            });
            setIsEditing(false);
        }
    }, [experience]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            onUpdateExperience(formData);
        } else {
            onAddExperience(formData);
            setIsAddingNew(false);
        }
        onClearForm();
    };

    const handleAddNewExperience = () => {
        setIsAddingNew(true);
    };

    return (
        <>
            {!isAddingNew && !isEditing && (
                <button onClick={handleAddNewExperience} className="btn-primary">
                    Agregar nueva experiencia
                </button>
            )}

            {(isAddingNew || isEditing) && (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Título o Cargo:</label>
                        <input 
                            type="text" 
                            name="title" 
                            value={formData.title} 
                            onChange={handleInputChange} 
                            required 
                        />
                    </div>
                    <div>
                        <label>Nombre de la compañía:</label>
                        <input 
                            type="text" 
                            name="company" 
                            value={formData.company} 
                            onChange={handleInputChange} 
                            required 
                        />
                    </div>
                    <div>
                        <label>Fecha de inicio:</label>
                        <input 
                            type="date" 
                            name="startDate" 
                            value={formData.startDate} 
                            onChange={handleInputChange} 
                            required 
                        />
                    </div>
                    <div>
                        <label>
                            <input 
                                type="checkbox" 
                                name="isCurrent" 
                                checked={formData.isCurrent} 
                                onChange={handleInputChange} 
                            />
                            Actualmente ocupo este cargo
                        </label>
                    </div>
                    {!formData.isCurrent && (
                        <div>
                            <label>Fecha de fin:</label>
                            <input 
                                type="date" 
                                name="endDate" 
                                value={formData.endDate} 
                                onChange={handleInputChange} 
                                required 
                            />
                        </div>
                    )}
                    <div>
                        <label>Responsabilidades:</label>
                        <textarea 
                            name="responsibilities" 
                            value={formData.responsibilities} 
                            onChange={handleInputChange} 
                            required 
                        />
                    </div>
                    <div>
                        <label>Teléfono:</label>
                        <input 
                            type="text" 
                            name="telefono" 
                            value={formData.telefono} 
                            onChange={handleInputChange} 
                            required 
                        />
                    </div>
                    <div className="form-buttons">
                        <button type="submit">
                            {isEditing ? 'Guardar cambios' : 'Agregar experiencia'}
                        </button>

                        {isAddingNew && (
                            <button 
                                type="button" 
                                onClick={() => onRemoveAddedExperience()} 
                                className="btn-danger"
                            >
                                Eliminar experiencia
                            </button>
                        )}

                        {isEditing && (
                            <>
                                <button 
                                    type="button" 
                                    onClick={onClearForm} 
                                    className="btn-secondary"
                                >
                                    Cancelar edición
                                </button>
                            </>
                        )}
                    </div>
                </form>
            )}
        </>
    );
};