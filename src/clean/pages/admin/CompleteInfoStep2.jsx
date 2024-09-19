import React from 'react';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Navbar } from '../../../ui/Components/Navbar';
import numeral from 'numeral';

export const CompleteInfoStep2 = ({ onPrev, onSubmit, initialValues = {}, step1Data }) => {
  const defaultInitialValues = {
    tarifas: step1Data.areas.reduce((acc, area) => {
      acc[area] = [
        { servicio: 'media_jornada', precio: null },
        { servicio: 'jornada_completa', precio: null },
      ];
      return acc;
    }, {}),
  };

  const combinedInitialValues = { ...defaultInitialValues, ...initialValues };

  const step2ValidationSchema = Yup.object().shape({
    tarifas: Yup.object().shape(
      step1Data.areas.reduce((acc, area) => {
        acc[area] = Yup.array().of(
          Yup.object().shape({
            servicio: Yup.string().required('Requerido'),
            precio: Yup.number().required('Requerido').positive('Debe ser un número positivo'),
          })
        ).min(1, 'Debe agregar al menos una tarifa');
        return acc;
      }, {})
    ),
  });

  const servicioDisplayMapping = {
    media_jornada: 'Media jornada',
    jornada_completa: 'Jornada completa',
  };

  return (
    <>
      <Navbar />
      <Formik
        initialValues={combinedInitialValues}
        validationSchema={step2ValidationSchema}
        onSubmit={onSubmit}
      >
        {({ values, setFieldValue, handleSubmit }) => (
          <Form className="step2-form">
            <h2>Selecciona tus tarifas:</h2>

            {Object.entries(values.tarifas).map(([area, tarifas], areaIndex) => (
              <div key={areaIndex}>
                <h3>{area}</h3>
                <FieldArray name={`tarifas.${area}`}>
                  {() => (
                    <div className="tarifas-container">
                      {tarifas.map((tarifa, index) => (
                        <div key={index} className="tarifa-item">
                          <Field
                            name={`tarifas.${area}[${index}].servicio`}
                            placeholder="Servicio"
                            disabled
                            value={servicioDisplayMapping[tarifa.servicio]}
                          />
                          <Field
                            name={`tarifas.${area}[${index}].precio`}
                            type="text"
                            placeholder="Precio"
                            value={tarifa.precio != null ? numeral(tarifa.precio).format('0,0') : ''}
                            onChange={(e) => {
                              const value = numeral(e.target.value).value();
                              setFieldValue(`tarifas.${area}[${index}].precio`, value);
                            }}
                          />
                          <ErrorMessage name={`tarifas.${area}[${index}].servicio`} component="div" className="error" />
                          <ErrorMessage name={`tarifas.${area}[${index}].precio`} component="div" className="error" />
                        </div>
                      ))}
                    </div>
                  )}
                </FieldArray>
              </div>
            ))}

            <div className="buttons">
              <button type="button" onClick={onPrev} className="prev-btn">
                Anterior
              </button>
              <button type="submit" onClick={handleSubmit} className="submit-btn">
                Guardar
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};