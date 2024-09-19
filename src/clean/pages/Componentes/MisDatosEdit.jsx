import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getUserData, updateUserData } from '../../../api/usuarios.api';
import { useNavigate } from 'react-router-dom';

export const MisDatosEdit = () => {
    const { uid } = useSelector((state) => state.auth);
    const [formData, setFormData] = useState({
        nombre: '',
        cedula: '',
        direccion: '',
        telefono: '',
        email: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await getUserData(uid);
            setFormData({
                nombre: data.nombre,
                cedula: data.cedula,
                direccion: data.direccion,
                telefono: data.telefono,
                email: data.email
            });
        };

        fetchData();
    }, [uid]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateUserData(uid, formData);
        navigate('/panel/mis-datos');
    };

    return (
        <div className="mis-datos-edit-container">
            <form className="edit-form" onSubmit={handleSubmit}>
                <h2>Editar mis datos</h2>

                <label htmlFor="cedula">Cédula</label>
                <input
                    type="text"
                    id="cedula"
                    name="cedula"
                    value={formData.cedula}
                    disabled
                    className="disabled-input"
                />
                <p className="cedula-message">La cédula no se puede editar</p>

                <label htmlFor="nombre">Nombre</label>
                <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="direccion">Dirección</label>
                <input
                    type="text"
                    id="direccion"
                    name="direccion"
                    value={formData.direccion}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="telefono">Teléfono</label>
                <input
                    type="text"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <button type="submit">Guardar</button>
            </form>
        </div>
    );
};
