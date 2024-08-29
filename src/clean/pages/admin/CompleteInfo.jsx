import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Navbar } from '../../../ui/Components/Navbar';
import usuariosApi, { completeInfo } from '../../../api/usuarios.api';
import { useSelector, useDispatch } from 'react-redux';
import { isCompleteInfo } from '../../../store/auth';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png'];

const validationSchema = Yup.object().shape({
    photo: Yup.mixed()
        .required('La foto es requerida')
        .test('fileSize', 'El archivo debe ser menor de 5 MB', value => !value || value.size <= MAX_FILE_SIZE)
        .test('fileType', 'Solo se permiten archivos PNG y JPG', value => !value || ALLOWED_FILE_TYPES.includes(value.type)),
    hasExperience: Yup.boolean(),
    experiences: Yup.array().of(
        Yup.object().shape({
            title: Yup.string().required('Requerido'),
            company: Yup.string().required('Requerido'),
            startDate: Yup.date().required('Requerido'),
            isCurrent: Yup.boolean(),
            endDate: Yup.date().nullable().when('isCurrent', {
                is: false,
                then: schema => schema.required('Requerido'),
                otherwise: schema => schema.nullable(),
            }),
            responsibilities: Yup.string().required('Requerido'),
        })
    ).when('hasExperience', {
        is: true,
        then: schema => schema.min(1, 'Debe agregar al menos una experiencia laboral'),
        otherwise: schema => schema.default([]),
    }),
});

export const CompleteInfo = () => {
    const [filePreview, setFilePreview] = useState(null);
    const uid = useSelector(state => state.auth.uid);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const initialValues = {
        experiences: [],
        hasExperience: true,
        photo: null,
    };

    const handleFileChange = (event, setFieldValue) => {
        const selectedFile = event.currentTarget.files[0];
        setFieldValue('photo', selectedFile);
        if (selectedFile) {
            const reader = new FileReader();
            reader.onloadend = () => setFilePreview(reader.result);
            reader.readAsDataURL(selectedFile);
        } else {
            setFilePreview(null);
        }
    };

    const handleSubmit = async (values) => {
        // Preparar los datos para enviar al backend
        const formData = new FormData();
        formData.append('photo', values.photo);
        formData.append('hasExperience', values.hasExperience);
        formData.append('cedula', uid);
        values.experiences.forEach((experience, index) => {
            for (const key in experience) {
                formData.append(`experiences[${index}][${key}]`, experience[key]);
            }
        });
    
        try {
            const response = await completeInfo(formData);
            if (response.data.success) {
                const dataOfetante = await usuariosApi.post('is-complete-info',{"cedula": uid})
                console.log(dataOfetante.data)
                dispatch(isCompleteInfo(dataOfetante.data));
                navigate('/panel');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Navbar />
            <div className="form-container">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ values, setFieldValue, isValid, dirty }) => {
                        const hasExperience = values.hasExperience;
                        const hasExperienceValues = values.experiences.length > 0;
                        const isPhotoUploaded = values.photo !== null;
                        const isSubmitDisabled = !(
                            (!hasExperience || hasExperienceValues) && isPhotoUploaded
                        );

                        const handleExperienceChange = () => {
                            setFieldValue('hasExperience', !values.hasExperience);
                            if (values.hasExperience) {
                                setFieldValue('experiences', []);
                            }
                        };

                        return (
                            <Form>
                                <div className="form-group">
                                    <label>Agrega una foto:</label>
                                    <input
                                        name="photo"
                                        type="file"
                                        accept="image/jpeg, image/png"
                                        onChange={event => handleFileChange(event, setFieldValue)}
                                    />
                                    <ErrorMessage name="photo" component="div" className="error" />
                                    {filePreview && (
                                        <div className="file-preview">
                                            <img
                                                src={filePreview}
                                                alt="Vista previa"
                                                className="preview-image"
                                            />
                                        </div>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label>
                                        <Field
                                            type="checkbox"
                                            name="hasExperience"
                                            checked={!values.hasExperience}
                                            onChange={handleExperienceChange}
                                        />
                                        No tengo experiencia
                                    </label>
                                </div>

                                {values.hasExperience && (
                                    <FieldArray name="experiences">
                                        {({ push, remove }) => (
                                            <div className="experience-section">
                                                {values.experiences.map((experience, index) => (
                                                    <div key={index} className="experience-item">
                                                        <div className="form-group">
                                                            <label>Título o Cargo:</label>
                                                            <Field
                                                                name={`experiences[${index}].title`}
                                                                type="text"
                                                            />
                                                            <ErrorMessage
                                                                name={`experiences[${index}].title`}
                                                                component="div"
                                                                className="error"
                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            <label>Nombre de la compañía:</label>
                                                            <Field
                                                                name={`experiences[${index}].company`}
                                                                type="text"
                                                            />
                                                            <ErrorMessage
                                                                name={`experiences[${index}].company`}
                                                                component="div"
                                                                className="error"
                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            <label>Fecha de inicio:</label>
                                                            <Field
                                                                name={`experiences[${index}].startDate`}
                                                                type="date"
                                                            />
                                                            <ErrorMessage
                                                                name={`experiences[${index}].startDate`}
                                                                component="div"
                                                                className="error"
                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            <label>
                                                                <Field
                                                                    name={`experiences[${index}].isCurrent`}
                                                                    type="checkbox"
                                                                />
                                                                Actualmente ocupo este cargo
                                                            </label>
                                                        </div>
                                                        {!experience.isCurrent && (
                                                            <div className="form-group">
                                                                <label>Fecha de fin:</label>
                                                                <Field
                                                                    name={`experiences[${index}].endDate`}
                                                                    type="date"
                                                                />
                                                                <ErrorMessage
                                                                    name={`experiences[${index}].endDate`}
                                                                    component="div"
                                                                    className="error"
                                                                />
                                                            </div>
                                                        )}
                                                        <div className="form-group">
                                                            <label>Responsabilidades:</label>
                                                            <Field
                                                                name={`experiences[${index}].responsibilities`}
                                                                as="textarea"
                                                            />
                                                            <ErrorMessage
                                                                name={`experiences[${index}].responsibilities`}
                                                                component="div"
                                                                className="error"
                                                            />
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={() => remove(index)}
                                                            className="remove-button"
                                                        >
                                                            Eliminar experiencia
                                                        </button>
                                                    </div>
                                                ))}
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        push({
                                                            title: '',
                                                            company: '',
                                                            startDate: '',
                                                            isCurrent: false,
                                                            endDate: '',
                                                            responsibilities: '',
                                                        })
                                                    }
                                                    className="add-button"
                                                >
                                                    Agregar experiencia
                                                </button>
                                            </div>
                                        )}
                                    </FieldArray>
                                )}

                                <button
                                    type="submit"
                                    className="submit-button"
                                    disabled={isSubmitDisabled}
                                >
                                    Guardar
                                </button>
                            </Form>
                        );
                    }}
                </Formik>
            </div>
        </>
    );
};
