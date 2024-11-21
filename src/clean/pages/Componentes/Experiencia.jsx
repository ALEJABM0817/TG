import React, { useEffect, useState } from 'react';
import { Navbar } from '../../../ui/Components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { getOfertanteForCV } from '../../../store/auth';
import { ExperienciaUser } from './ExperienciaUser';
import { Loader } from '../Loader/Loader';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { saveExperience } from '../../../api/usuarios.api';
import { toast } from 'react-toastify';

const validationSchema = Yup.object().shape({
    experiences: Yup.array().of(
        Yup.object().shape({
            id: Yup.string().nullable(),
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
            cedula: Yup.string().required('Requerido'),
            hasExperience: Yup.boolean().required('Requerido'),
        })
    ),
});

export const Experiencia = () => {
    const dispatch = useDispatch();
    const { uid } = useSelector((state) => state.auth);
    const [isLoading, setIsLoading] = useState(true);
    const [editingIndex, setEditingIndex] = useState(null);
    const [initialValues, setInitialValues] = useState({
        experiences: [],
    });

    const fetchData = async () => {
        await dispatch(getOfertanteForCV(uid));
        setIsLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, [dispatch, uid]);

    const handleEdit = (index, experience) => {
        setEditingIndex(index);
        setInitialValues({
            experiences: [{
                id: experience.id,
                ...experience,
                startDate: experience.startDate.split('T')[0],
                endDate: experience.endDate ? experience.endDate.split('T')[0] : '',
                isEditing: true,
                cedula: uid,
                hasExperience: true,
            }],
        });
    };

    const handleCancelEdit = () => {
        setEditingIndex(null);
        setInitialValues({ experiences: [] });
    };

    const handleSubmit = async (values, { resetForm }) => {
        const modifiedValues = values.experiences.map(exp => ({
            ...exp,
            cedula: uid,
            hasExperience: true,
            isEditing: editingIndex !== null,
            isCurrent: exp.isCurrent ? 1 : 0,
            endDate: exp.isCurrent ? null : exp.endDate,
        }));
        try {
            await saveExperience(modifiedValues);
            handleCancelEdit();
            resetForm();
            fetchData();
            modifiedValues[0].isEditing ? toast.success('Experiencia actualizada correctamente') : toast.success('Experiencia guardada correctamente');
        } catch (error) {
            console.log(error);
            modifiedValues[0].isEditing ? toast.error('Error al actualizar la experiencia') : toast.error('Error al guardar la experiencia');
        }
    };

    return (
        <>
            <Navbar />
            <div>{isLoading && <Loader />}</div>

            <div className="experience-container">
                <div className="experience-list">
                    <ExperienciaUser onEdit={handleEdit} editingIndex={editingIndex} />
                </div>

                <div className="add-experience-form">
                    <h2>{editingIndex !== null ? 'Editar experiencia' : 'Añadir nueva experiencia'}</h2>
                    <Formik
                        enableReinitialize
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ values, setFieldValue }) => (
                            <Form>
                                <FieldArray name="experiences">
                                    {({ push, remove }) => (
                                        <div className="experience-section">
                                            {values.experiences.map((experience, index) => (
                                                <div className="experience-item" key={index}>
                                                    <div className="form-group">
                                                        <label>Título o Cargo:</label>
                                                        <Field name={`experiences[${index}].title`} type="text" />
                                                        <ErrorMessage name={`experiences[${index}].title`} component="div" className="error" />
                                                    </div>

                                                    <div className="form-group">
                                                        <label>Nombre de la compañía:</label>
                                                        <Field name={`experiences[${index}].company`} type="text" />
                                                        <ErrorMessage name={`experiences[${index}].company`} component="div" className="error" />
                                                    </div>

                                                    <div className="form-group">
                                                        <label>Fecha de inicio:</label>
                                                        <Field name={`experiences[${index}].startDate`} type="date" />
                                                        <ErrorMessage name={`experiences[${index}].startDate`} component="div" className="error" />
                                                    </div>

                                                    <div className="form-group">
                                                        <label>
                                                            <Field
                                                                name={`experiences[${index}].isCurrent`}
                                                                type="checkbox"
                                                                checked={experience.isCurrent}
                                                                onChange={() => {
                                                                    setFieldValue(`experiences[${index}].isCurrent`, !experience.isCurrent);
                                                                    if (!experience.isCurrent) {
                                                                        setFieldValue(`experiences[${index}].endDate`, '');
                                                                    }
                                                                }}
                                                            />
                                                            Actualmente ocupo este cargo
                                                        </label>
                                                    </div>

                                                    {!experience.isCurrent && (
                                                        <div className="form-group">
                                                            <label>Fecha de fin:</label>
                                                            <Field name={`experiences[${index}].endDate`} type="date" />
                                                            <ErrorMessage name={`experiences[${index}].endDate`} component="div" className="error" />
                                                        </div>
                                                    )}

                                                    <div className="form-group">
                                                        <label>Responsabilidades:</label>
                                                        <Field name={`experiences[${index}].responsibilities`} as="textarea" />
                                                        <ErrorMessage name={`experiences[${index}].responsibilities`} component="div" className="error" />
                                                    </div>

                                                    <Field name={`experiences[${index}].cedula`} type="hidden" value={uid} />
                                                    <Field name={`experiences[${index}].hasExperience`} type="hidden" value={true} />

                                                    {editingIndex === null && (
                                                        <button type="button" className="remove-button" onClick={() => remove(index)}>
                                                            Eliminar experiencia
                                                        </button>
                                                    )}
                                                </div>
                                            ))}
                                            {editingIndex === null && (
                                                <button type="button" className="add-button" onClick={() => push({
                                                    id: null,
                                                    title: '',
                                                    company: '',
                                                    startDate: '',
                                                    isCurrent: false,
                                                    endDate: '',
                                                    responsibilities: '',
                                                    cedula: uid,
                                                    hasExperience: true,
                                                })}>
                                                    {values.experiences.length > 0 ? 'Agregar otra experiencia' : 'Agregar experiencia'}
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </FieldArray>

                                {values.experiences.some(exp => exp.title || exp.company || exp.startDate || exp.responsibilities) && (
                                    <button type="submit" className="submit-button">
                                        {editingIndex !== null ? 'Actualizar experiencia' : 'Guardar experiencia'}
                                    </button>
                                )}
                                {editingIndex !== null && (
                                    <button type="button" onClick={handleCancelEdit} className="cancel-button">
                                        Cancelar edición
                                    </button>
                                )}
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </>
    );
};