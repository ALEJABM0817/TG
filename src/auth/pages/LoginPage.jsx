import Facial from "../../assets/images/icons/id-facial.png";
import Candado from "../../assets/images/icons/candado.png";
import { Link, useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import { getUsuario } from "../../api/usuarios.api";

export const LoginPage = () => {
  const navigate = useNavigate();

  const onLogin = () => {
    navigate("/", {
      replace: true,
    });
  };

  return (
    <div className="form-register-container">
      <section className="form-Register">
        <Formik
          initialValues={{
            cedula: "",
            password: "",
          }}

          onSubmit={ async (values) => {
            const isEmpty = Object.values(values).some(x => (x === ''));
            if (isEmpty) {
                console.log("Los valores son requeridos")
            }

            try {
                const response = await getUsuario(values)
                console.log(response)
                
            } catch (error) {
                console.log(error.response)
            }
          }}
        >
          {({handleChange, handleSubmit}) => (
            <Form
                onSubmit={handleSubmit}
            >
              <div className="container-logo">
                <img
                  className="logo"
                  src="src\assets\images\icons\logoApp.png"
                  alt=""
                />
              </div>
              <div className="container mt-5">
                <h4>Iniciar sesión</h4>
                <hr />
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

              <button className="buttons" type="submit" value="Ingresar">
                Ingresar
              </button>

              <p className="info-text">¿Aún no eres miembro?</p>
              <p className="info-text">
                <Link to="/PersonaNatural">
                  Regístrate aquí si quieres contratar un servicio
                </Link>
              </p>
              <p>
                <Link to="/Empresa">
                  Regístrate aquí si quieres ofrecer un servicio
                </Link>
              </p>
            </Form>
          )}
        </Formik>
      </section>
    </div>
  );
};
