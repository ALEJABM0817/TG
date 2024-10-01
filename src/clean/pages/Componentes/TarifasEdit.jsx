import React, { useEffect, useState } from 'react'
import { getTarifas, updateTarifas } from '../../../api/usuarios.api';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const TarifasEdit = () => {
    const uid = useSelector(state => state.auth.uid);
    const [tarifas, setTarifas] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTarifas = async () => {
            const res = await getTarifas(uid);
            setTarifas(res.data);
        }

        fetchTarifas();
    }, [uid]);

    const handleInputChange = (index, tipoIndex, event) => {
        const newTarifas = [...tarifas];
        newTarifas[index].tipos_tarifas[tipoIndex].precio = event.target.value;
        setTarifas(newTarifas);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedTarifas = tarifas.map(tarifa => ({
            ...tarifa,
            tipos_tarifas: tarifa.tipos_tarifas.map(tipo => ({
                ...tipo,
                precio: tipo.precio
            }))
        }));
        await updateTarifas(uid, { tarifas: updatedTarifas });
        navigate('/panel/mis-datos');
    }

    return (
        <div className="mis-datos-edit-container">
            <form className="edit-form" onSubmit={handleSubmit}>
                <h2>Editar mis tarifas</h2>
                {tarifas.map((tarifa, index) => (
                    <div key={tarifa.id}>
                        <h3>{tarifa.servicio}</h3>
                        {tarifa.tipos_tarifas.map((tipo, tipoIndex) => (
                            <div key={tipo.tipo_tarifa_id}>
                                <label>{tipo.label}</label>
                                <input type="number" name="precio" value={tipo.precio} onChange={event => handleInputChange(index, tipoIndex, event)} />
                            </div>
                        ))}
                    </div>
                ))}
                <button type="submit">Actualizar</button>
            </form>
        </div>
    )
}