import { PlanesItem } from "./Planes/PlanesItem";
import imgcalendar from "../../assets/images/icons/calendar.png";


export const Planes = () => {
  const planesServices = [
    {
      title: "One Day",
      content:
        "Este plan se adapta perfectamente si requiere los servicios solo un día a la semana. Ofrece flexibilidad y eficiencia, cumpliendo con las responsabilidades laborales en un horario reducido.",
      imgSrc: imgcalendar,
    },
    {
      title: "Two Days",
      content:
        "Este plan se adapta perfectamente si requiere los servicios 2 días a la semana. Ofrece flexibilidad y eficiencia, cumpliendo con las responsabilidades laborales en un horario reducido.",
      imgSrc: imgcalendar,
    },
    {
      title: "Three Days",
      content:
        "Este plan resulta ideal para aquellos que requieran los servicios de 3 días a la semana. Diseñado para adaptarse a horarios laborales flexibles, proporciona la participación laboral parcial durante la semana.",
      imgSrc: imgcalendar,
    },
    {
      title: "Four Days",
      content:
        "Este plan resulta ideal para aquellos que requieran los servicios de 4 días a la semana. Diseñado para adaptarse a horarios laborales flexibles, proporciona la participación laboral parcial durante la semana.",
      imgSrc: imgcalendar,
    },
    {
      title: "Five Days",
      content:
        "Este plan está diseñado para adquirir los servicios de tiempo completo. Ofrece una cobertura integral de cinco días a la semana, brindando una dedicación completa a las responsabilidades del hogar u oficinas.",
      imgSrc: imgcalendar,
    },
  ];

  return (
    <section className="servicios">
      <h2>Planes de Servicios Semanales</h2>
      <p>
        Entendemos la importancia de mantener el hogar y la oficina en perfecto
        orden y funcionamiento, es por esto que ofrecemos una variedad de planes de servicios
        generales diseñados para adaptarse a las necesidades específicas de cada
        cliente. Nos enorgullece ofrecer las siguientes opciones flexibles que se ajusten a su agenda y presupuesto.
      </p>
      <div className="servicios-planes-container">
        {planesServices.map((planService) => (
          <PlanesItem
            title={planService.title}
            content={planService.content}
            imgSrc={planService.imgSrc}
          />
        ))}
      </div>
    </section>
  );
};
