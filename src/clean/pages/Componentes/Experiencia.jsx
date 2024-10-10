import React, { useEffect, useState } from 'react';
import { Navbar } from '../../../ui/Components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { getOfertanteForCV } from '../../../store/auth';
import { ExperienciaUser } from './ExperienciaUser';
import { Loader } from '../Loader/Loader';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
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
  ),
});

export const Experiencia = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const { uid } = useSelector((state) => state.auth);
  const [editingIndex, setEditingIndex] = useState(null);
  const [initialValues, setInitialValues] = useState({
    experiences: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getOfertanteForCV(uid));
      setIsLoading(false);
    };
    fetchData();
  }, [dispatch, uid]);

  const handleEdit = (index, experience) => {
    setEditingIndex(index);
    setInitialValues({
      experiences: [{
        ...experience,
        startDate: experience.startDate.split('T')[0],
        endDate: experience.endDate ? experience.endDate.split('T')[0] : '',
        isEditing: true,
      }],
    });
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setInitialValues({ experiences: [] });
  };

  const handleSubmit = (values) => {
    const modifiedValues = values.experiences.map(exp => ({
      ...exp,
      isEditing: editingIndex !== null,
    }));
    console.log('Experiencia añadida/actualizada:', modifiedValues);
    handleCancelEdit();
  };

  return (
    <>
      <Navbar />
      <div>{isLoading && <Loader />}</div>
      <h1>Experiencia</h1>

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
            {({ values }) => (
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
                              <Field name={`experiences[${index}].isCurrent`} type="checkbox" />
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

                          {editingIndex === null && (
                            <button type="button" className="remove-button" onClick={() => remove(index)}>
                              Eliminar experiencia
                            </button>
                          )}
                        </div>
                      ))}
                      {editingIndex === null && (
                        <button type="button" className="add-button" onClick={() => push({
                          title: '',
                          company: '',
                          startDate: '',
                          isCurrent: false,
                          endDate: '',
                          responsibilities: '',
                        })}>
                          Agregar experiencia
                        </button>
                      )}
                    </div>
                  )}
                </FieldArray>

                <button type="submit" className="submit-button">
                  {editingIndex !== null ? 'Actualizar experiencia' : 'Guardar experiencia'}
                </button>
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
