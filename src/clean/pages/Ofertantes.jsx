import { OfertantesItem } from "./Ofertantes/OfertantesItem";
import imgOfertante from "../../assets/images/ofertantes/foto.jpg";

export const Ofertantes = () => {
  const oferServices = [
{
  imgSrc: imgOfertante,
  content:
    "Nombre ofertante",
},
{
  imgSrc: imgOfertante,
  content:
    "Nombre ofertante",
},
{
  imgSrc: imgOfertante,
  content:
    "Nombre ofertante",
},
];

return (
  <section className="servicios">
    <h2>Ofertantes</h2>
    <div className="ofertantes-container">
      {oferServices.map((oferService) => (
        <OfertantesItem
          imgSrc={oferService.imgSrc}
          content={oferService.content}
        />
      ))}
    </div>
  </section>
);
};