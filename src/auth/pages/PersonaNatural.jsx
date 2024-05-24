import Usuario from "../../assets/images/icons/datos-del-usuario.png";
import Facial from "../../assets/images/icons/id-facial.png";
import Ubicacion from "../../assets/images/icons/edificio-de-oficinas.png";
import Phone from "../../assets/images/icons/phone.png";
import Email from "../../assets/images/icons/email.png";
import Candado from "../../assets/images/icons/candado.png";
import { Link } from "react-router-dom";
import { Form, Formik } from "formik";
import { createUsuario } from "../../api/usuarios.api";
export const PersonaNatural = () => {
  return (
    <div className="form-register-container">
      <section className="form-Register">
        <h4>Formulario de Registro Cliente</h4>
        <Formik
          initialValues={{
            nombre: "",
            cedula: "",
            direccion: "",
            telefono: "",
            email: "",
            password: "",
            password2: ""
          }}

          onSubmit={async (values) => {
            const {password, password2} = values;
            const isEmpty = Object.values(values).some(x => (x === ''));

            if (isEmpty) {
                return console.log("todos los campos son obligatorios")
            }

            if (password !== password2) {
                return console.log("las constraseñas no coinciden")
            }
            
            try {
                const response = await createUsuario(values);
                console.log(response)
            } catch (error) {
                console.log(error)
            }
          }}
        >
          {({handleChange, handleSubmit}) => (
            <Form
                onSubmit={handleSubmit}
            >
              <div className="container-input">
                <img src={Usuario} alt="Icono de datos del usuario" />
                <input
                  className="controls"
                  type="text"
                  name="nombre"
                  id="nombre"
                  placeholder="Nombre completo"
                  onChange={handleChange}
                />
              </div>

              <div className="container-input">
                <img src={Facial} alt="Icono de ID facial" />
                <input
                  className="controls"
                  type="number"
                  name="cedula"
                  id="cedula"
                  placeholder="Número de identificación"
                  onChange={handleChange}
                />
              </div>

              <div className="container-input">
                <img src={Ubicacion} alt="Icono de la dirección" />
                <input
                  className="controls"
                  type="text"
                  name="direccion"
                  id="direccion"
                  placeholder="Dirección"
                  onChange={handleChange}
                />
              </div>

              <div className="container-input">
                <img src={Phone} alt="Icono del telefono" />
                <input
                  className="controls"
                  type="number"
                  name="telefono"
                  id="telefono"
                  placeholder="Número telefónico"
                  onChange={handleChange}
                />
              </div>

              <div className="container-input">
                <img src={Email} alt="Icono de correo electrónico" />
                <input
                  className="controls"
                  type="email"
                  name="email"
                  id="correo"
                  placeholder="Correo electrónico"
                  onChange={handleChange}
                />
              </div>

              <div className="container-input">
                <img src={Candado} alt="Icono de candado" />
                <input
                  className="controls"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Contraseña"
                  onChange={handleChange}
                />
              </div>

              <div className="container-input">
                <img src={Candado} alt="Icono de candado" />
                <input
                  className="controls"
                  type="password"
                  name="password2"
                  id="password"
                  placeholder="Confirmar Contraseña"
                  onChange={handleChange}
                />
              </div>

              <button className="buttons" type="submit" value="Registrarse">
                Registrarse
              </button>

              <p>
                <Link to="/login">Inicia tu sesión</Link>
              </p>
            </Form>
          )}
        </Formik>
      </section>
    </div>
  );
};
