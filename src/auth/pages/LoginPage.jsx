import Facial from "../../assets/images/icons/id-facial.png";
import Candado from "../../assets/images/icons/candado.png";
import { Link } from "react-router-dom";
import { Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { startLogin } from "../../store/auth";
import { useMemo, useState } from "react";

export const LoginPage = () => {
  const { status, errorMessage } = useSelector(state => state.auth);
  const [messageData, setMessageData] = useState('');
  const dispatch = useDispatch();
  const isAuthenticating = useMemo( () => status === 'checking', [status] );

  return (
    <div className="form-register-container">
      <section className="form-Register">
        <Formik
          initialValues={{
            cedula: "",
            password: "",
          }}
          onSubmit={(values) => {
            const isEmpty = Object.values(values).some((x) => x === "");
            const {cedula, password} = values;

            if (isEmpty) {
              return setMessageData('Los valores son requeridos');
            }
            setMessageData('');
            dispatch(startLogin({cedula, password}))
            
          }}
        >
          {({ handleChange, handleSubmit }) => (

            <Form onSubmit={handleSubmit}>
              <div className="container mt-5">
                <h4>Iniciar sesión</h4>
                <hr />
              </div>

              <div className="container-logo">
                
                <img
                  className="logo"
                  src="src\assets\images\icons\logoApp.png"
                  alt=""
                />
              </div>
              <div>
                <span>{errorMessage || messageData}</span>
              </div>
              <div className="container-input">
                <img src={Facial} />
                <input
                  className="controls"
                  type="text"
                  name="cedula"
                  id="id"
                  placeholder="Cedula"
                  onChange={handleChange}
                />
              </div>

              <div className="container-input">
                <img src={Candado} />
                <input
                  className="controls"
                  type="password"
                  name="password"
                  id="contraseña"
                  placeholder="Contraseña"
                  onChange={handleChange}
                />
              </div>

              <button 
                className="buttons"
                type="submit"
                value="Ingresar"
                disabled={isAuthenticating}
              >
                Ingresar
              </button>

              <p className="info-text">¿Aún no eres miembro?</p>
              <p className="info-text">
                <Link to="/register">Regístrate aquí.</Link>
              </p>
            </Form>
          )}
        </Formik>
      </section>
    </div>
  );
};
