import Usuario from "../../assets/images/icons/datos-del-usuario.png"
import Facial from "../../assets/images/icons/id-facial.png"
import Ubicacion from "../../assets/images/icons/edificio-de-oficinas.png"
import Phone from "../../assets/images/icons/phone.png"
import Email from "../../assets/images/icons/email.png"
import Candado from "../../assets/images/icons/candado.png"
import { Link } from "react-router-dom"
export const PersonaNatural = () => {
  return (
    <div className="form-register-container">
      <section className="form-Register">
        <h4>Formulario de Registro Cliente</h4>
        
        <div className="container-input">
          <img src={Usuario} alt="Icono de datos del usuario" />
          <input className="controls" type="text" name="Nombre Completo" id="nombre" placeholder="Nombre completo" />
        </div>
        
        <div className="container-input">
          <img src={Facial} alt="Icono de ID facial" />
          <input className="controls" type="number" name="C.C" id="idC" placeholder="Número de identificación" />
        </div>

        <div className="container-input">
          <img src={Ubicacion} alt="Icono de la dirección" />
          <input className="controls" type="text" name="ubi" id="dirección" placeholder="Dirección" />
        </div>

        <div className="container-input">
          <img src={Phone} alt="Icono del telefono" />
          <input className="controls" type="number" name="phone" id="telefono" placeholder="Número telefónico" />
        </div>
        
        <div className="container-input">
          <img src={Email} alt="Icono de correo electrónico" />
          <input className="controls" type="email" name="Correo" id="correo" placeholder="Correo electrónico" />
        </div>
        
        <div className="container-input">
          <img src={Candado} alt="Icono de candado" />
          <input className="controls" type="password" name="Contraseña" id="contraseña" placeholder="Contraseña" />
        </div>
        
        <input className="buttons" type="submit" value="Registrarse" />
        
      
        <p><Link to="/login">Inicia tu sesión</Link></p>
      </section>
    </div>
  );
}


