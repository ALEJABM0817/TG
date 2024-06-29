import { Link } from "react-router-dom";
import Nombre from "../../assets/images/icons/edificio-de-oficinas.png"
import Facial from "../../assets/images/icons/id-facial.png"
import Email from "../../assets/images/icons/email.png"
import Candado from "../../assets/images/icons/candado.png"
import Photograph from "../../assets/images/icons/photo.png"
import Ubicacion from "../../assets/images/icons/edificio-de-oficinas.png"
import Phone from "../../assets/images/icons/phone.png"

export const Empresa = () => {
  return (
    <div className="form-register-container">
      <section className="form-Register">
        <h4>Formulario de Registro Ofertante</h4>
        
        <div className="container-input">
          <img src={Nombre} alt="Icono de nombreO" />
          <input className="controls" type="text" name="" id="nombreO" placeholder="Nombre Completo" />
        </div>
        
        <div className="container-input">
          <img src={Facial} alt="Icono de ID facial" />
          <input className="controls" type="text" name="C.C" id="idO" placeholder="Número de identificación" />
        </div>
        
        <div className="container-input">
          <img src={Ubicacion} alt="Icono de la dirección" />
          <input className="controls" type="text" name="ubi" id="dirección" placeholder="Dirección" />
        </div>

        <div className="container-input">
          <img src={Phone} alt="Icono del telefono" />
          <input className="controls" type="text" name="phone" id="telefono" placeholder="Número telefónico" />
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


