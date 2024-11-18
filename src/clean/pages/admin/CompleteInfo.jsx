import React, { useState } from 'react';
import { CompleteInfoStep1 } from './CompleteInfoStep1'; // Importamos Step 1
import { CompleteInfoStep2 } from './CompleteInfoStep2';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import usuariosApi, { completeInfo } from '../../../api/usuarios.api';
import { isCompleteInfo } from '../../../store/auth';


export const CompleteInfo = () => {
    const uid = useSelector(state => state.auth.uid);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        step1: {},
        step2: {},
    });

    const handleNext = (data) => {
        setFormData(prevData => ({
            ...prevData,
            step1: data
        }));
        setCurrentStep(2);
    };

    const handlePrev = () => {
        setCurrentStep(1);
    };

    const handleSubmit = async (data) => {
        // Actualizar el estado local con los nuevos datos
        setFormData(prevData => ({
            ...prevData,
            step2: data
        }));
    
        const combinedData = { ...formData, step2: data };

        // Preparar los datos para enviar al backend
        const formDataToSend = new FormData();
        formDataToSend.append('photo', combinedData.step1.photo);
        formDataToSend.append('hasExperience', combinedData.step1.hasExperience);
        formDataToSend.append('cedula', uid);
        combinedData.step1.experiences.forEach((experience, index) => {
            for (const key in experience) {
                formDataToSend.append(`experiences[${index}][${key}]`, experience[key]);
            }
        });
        combinedData.step1.areas.forEach((area, index) => {
            formDataToSend.append(`areas[${index}]`, area);
        });

        formDataToSend.append('tarifas', JSON.stringify(combinedData.step2.tarifas));

        console.log('Sending data:', formDataToSend);
        try {
            const response = await completeInfo(formDataToSend);
            if (response.data.success) {
                const dataOfetante = await usuariosApi.post('is-complete-info',{"cedula": uid})
                dispatch(isCompleteInfo(dataOfetante.data));
                navigate('/panel/mis-datos');

            console.log(response);
            }
        } catch (error) {
            console.error(error);
        }
    
        console.log('Submitting combined data:', combinedData);
    };

    return (
        <div>
            {currentStep === 1 && (
                <CompleteInfoStep1
                    onNext={handleNext}
                    initialValues={formData.step1}
                />
            )}
            {currentStep === 2 && (
                <CompleteInfoStep2
                    onPrev={handlePrev}
                    onSubmit={handleSubmit}
                    initialValues={formData.step2}
                    step1Data={formData.step1}
                />
            )}
        </div>
    );
};
