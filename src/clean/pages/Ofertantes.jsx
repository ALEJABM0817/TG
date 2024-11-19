import { OfertantesItem } from "./Componentes/OfertantesItem";
import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOfertantes } from "../../store/auth";

export const Ofertantes = () => {
    const dispatch = useDispatch();
    const { ofertantes } = useSelector((state) => state.users);
    const [filters, setFilters] = useState({
        Jardineria: false,
        Plomeria: false,
        Lavanderia: false,
        Limpieza: false
    });

    useEffect(() => {
        dispatch(getOfertantes());
    }, [dispatch]);

    const handleFilterChange = (event) => {
        const { name, checked } = event.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: checked
        }));
    };

    const filteredOfertantes = useMemo(() => {
        return ofertantes.filter((oferService) => {
            if (!oferService.complete_info) return false;

            const isAreaFiltered = (areasData) => {
                let areasArray = [];

                if (Array.isArray(areasData)) {
                    areasArray = areasData.map(area => area.trim().toLowerCase());
                } else {
                    try {
                        areasArray = JSON.parse(areasData).map(area => area.trim().toLowerCase());
                    } catch (error) {
                        return false;
                    }
                }

                const isAnyFilterSelected = Object.values(filters).some(value => value);
                if (!isAnyFilterSelected) return true;

                return areasArray.some(area => filters[area.charAt(0).toUpperCase() + area.slice(1)]);
            };

            return isAreaFiltered(oferService.areas);
        });
    }, [ofertantes, filters]);

    return (
        <section className="servicios">
            <h2>Ofertantes</h2>
            <div className="filters">
                <label>
                    <input type="checkbox" name="Jardineria" onChange={handleFilterChange} checked={filters.Jardineria} />
                    Jardinería
                </label>
                <label>
                    <input type="checkbox" name="Plomeria" onChange={handleFilterChange} checked={filters.Plomeria} />
                    Plomería
                </label>
                <label>
                    <input type="checkbox" name="Lavanderia" onChange={handleFilterChange} checked={filters.Lavanderia} />
                    Lavandería
                </label>
                <label>
                    <input type="checkbox" name="Limpieza" onChange={handleFilterChange} checked={filters.Limpieza} />
                    Limpieza
                </label>
            </div>
            <div className="ofertantes-container">
                {filteredOfertantes.length > 0 ? (
                    filteredOfertantes.map((oferService) => (
                        <OfertantesItem
                            key={oferService.cedula}
                            imgSrc={oferService.photo}
                            areas={oferService.areas}
                            id={oferService.cedula}
                            promedio={oferService.promedio_calificacion}
                            nombre={oferService.nombre}
                        />
                    ))
                ) : (
                    <p>No hay ofertantes disponibles para los filtros seleccionados.</p>
                )}
            </div>
        </section>
    );
};
