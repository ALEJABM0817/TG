import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import usuariosApi from '../../../api/usuarios.api';

export const RequestPasswordReset = () => {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const response = await usuariosApi.post('/request-password-reset', { email });
            if (response.status === 200) {
                toast.success(response.data.message);
                navigate('/');
            } else {
                toast.warning(response.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className='request-password-reset'>
            <form onSubmit={handleSubmit} className='form-container'>
                <h1 className='form-title'>Recuperar Contraseña</h1>
                <p className='form-description'>Ingresa tu correo electrónico para recibir un enlace de recuperación de contraseña.</p>
                <input
                    type="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className='form-input'
                />
                <button type="submit" className='form-button' disabled={isSubmitting}>
                    {isSubmitting ? 'Enviando...' : 'Enviar'}
                </button>
            </form>
        </div>
    );
};