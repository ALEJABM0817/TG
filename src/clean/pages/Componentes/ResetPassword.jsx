import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import usuariosApi from '../../../api/usuarios.api';

export const ResetPassword = () => {
    const { token } = useParams();
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const response = await usuariosApi.post(`/reset-password/${token}`, { password });
            if (response.status === 200) {
                toast.success(response.data.message);
                navigate('/Login');
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
        <div className='reset-password'>
            <form onSubmit={handleSubmit} className='form-container'>
                <h1 className='form-title'>Restablecer Contraseña</h1>
                <p className='form-description'>Por favor, ingresa tu nueva contraseña para restablecerla.</p>
                <input
                    type="password"
                    placeholder="Nueva contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className='form-input'
                />
                <button type="submit" className='form-button' disabled={isSubmitting}>
                    {isSubmitting ? 'Restableciendo...' : 'Restablecer'}
                </button>
            </form>
        </div>
    );
};