import React from "react";
import { Slider } from "../../ui/Components/Slider";
import imgBackground from "../../../src/assets/images/home/homeb.png";
import img1 from "../../../src/assets/images/home/img1.png";
import img2 from "../../../src/assets/images/home/img2.png";
import img3 from "../../../src/assets/images/home/img3.png";
import img4 from "../../../src/assets/images/home/img4.png";
import img5 from "../../../src/assets/images/home/img5.png";
import { Footer } from "../../ui/Components/Footer";

export const Home = () => {
  return (
    <>
      <div
        className="home-background"
        style={{ backgroundImage: `url(${imgBackground})` }}
      ></div>
      <div className="services">
        <h1 className="title-services">¿Cómo funciona Home Helpers CO?</h1>
        <div className="container-services">
          <div className="container-services__item">
            <img src={img1} />
            <h2>Cotiza tu servicio</h2>
            <p>
              Obtén una estimación rápida y precisa del costo de los servicios
              de ayuda en el hogar que necesitas. Solo tienes que seleccionar el
              tipo de servicio y proporcionar detalles específicos para recibir
              una cotización instantánea.
            </p>
          </div>
          <div className="container-services__item">
            <img src={img2} />
            <h2>Programa tu plan</h2>
            <p>
              Organiza y personaliza la frecuencia de los servicios de ayuda en
              el hogar según tus necesidades. Selecciona las fechas y horarios
              que te convienen y confirma tu plan para asegurarte de recibir el
              servicio en el momento adecuado.
            </p>
          </div>
          <div className="container-services__item">
            <img src={img3} />
            <h2>Revisa el perfil del profesional</h2>
            <p>
              Antes de confirmar tu servicio, revisa el perfil detallado del
              profesional asignado. Consulta su experiencia, habilidades, y las
              opiniones de otros clientes para asegurarte de que cumple con tus
              expectativas.
            </p>
          </div>
          <div className="container-services__item">
            <img src={img4} />
            <h2>Adquiere el servicio</h2>
            <p>
              Una vez que estés satisfecho con la cotización y el profesional
              asignado, confirma los detalles del servicio y realiza el pago de
              forma segura. Recibirás una confirmación con toda la información
              necesaria.
            </p>
          </div>
          <div className="container-services__item">
            <img src={img5} />
            <h2>Califica el servicio a a tu profesional</h2>
            <p>
              Después de que el servicio haya sido completado, evalúa la calidad
              del servicio recibido y la actuación del profesional. Tu
              calificación y comentarios ayudarán a mejorar la experiencia para
              futuros clientes.
            </p>
          </div>
        </div>
      </div>
      <h1 className="title-services">Nuestros servicios</h1>
      <Slider />
  <Footer/>
    </>
  );
};
