import Facial from "../../assets/images/icons/id-facial.png"
import Candado from "../../assets/images/icons/candado.png";
import { Link, useNavigate } from "react-router-dom";

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
              name="C.C"
              id="id"
              placeholder="Identificación"
            />
          </div>

          <div className="container-input">
            <img src={Candado} />
            <input
              className="controls"
              type="password"
              name="Contraseña"
              id="contraseña"
              placeholder="Contraseña"
            />
          </div>

          <input className="buttons" type="submit" value="Ingresar" />

          <p className="info-text">¿Aún no eres miembro?</p>
          <p className="info-text">
            <Link to="/PersonaNatural">
              Regístrate aquí si quieres contratar un servicio
            </Link>
          </p>
          <p>
            <Link to="/Empresa">Regístrate aquí si quieres ofrecer un servicio</Link>
          </p>

      </section>
    </div>
  );
};
