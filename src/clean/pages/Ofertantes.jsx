import { OfertantesItem } from "./Ofertantes/OfertantesItem";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOfertantes } from "../../store/auth";

export const Ofertantes = () => {
    const dispatch = useDispatch();
    const { ofertantes } = useSelector((state) => state.users);
    console.log(ofertantes);
    useEffect(() => {
        dispatch(getOfertantes());
    }, []);

    return (
        <section className="servicios">
            <h2>Ofertantes</h2>
            <div className="ofertantes-container">
                {ofertantes.map((oferService) => (
                    oferService.complete_info ?
                        <OfertantesItem
                            key={oferService.cedula}
                            imgSrc={oferService.photo}
                            areas={oferService.areas}
                            id={oferService.cedula}
                        />
                    : ''
                ))}
            </div>
        </section>
    );
};