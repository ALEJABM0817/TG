import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { startLogout } from "../../store/auth";

export const Navbar = () => {
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);
    const { status, displayName } = useSelector(state => state.auth)
    const dispatch = useDispatch();

    const handleNavCollapse = () => {
        setIsNavCollapsed(!isNavCollapsed);
    };
    return (
        <nav className="navbar navbar-expand-lg navbar-dark p-2">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    Home Helpers CO
                </Link>
                <button
                    className="custom-toggler navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarsExample09"
                    aria-controls="navbarsExample09"
                    aria-expanded={!isNavCollapsed ? true : false}
                    aria-label="Toggle navigation"
                    onClick={handleNavCollapse}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className={`${isNavCollapsed ? "collapse" : ""} navbar-collapse`}
                    id="navbarSupportedContent"
                >
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                        <NavLink
                            className={({ isActive }) =>
                                `nav-link ${isActive ? "active" : ""}`
                            }
                            to="/Ofertantes"
                        >
                            Ofertantes
                        </NavLink>
                        <NavLink
                            className={({ isActive }) =>
                                `nav-link ${isActive ? "active" : ""}`
                            }
                            to="/Planes"
                        >
                            Planes
                        </NavLink>
                    </ul>
                </div>
            </div>
            <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
                <ul className="navbar-nav ml-auto">
                    {
                        status === 'authenticated' 
                            ? <div className="header-container-right">
                                <span>Hola! {displayName}</span>
                                <button onClick={() => dispatch(startLogout())} className="nav-item nav-link btn">Cerrar Sesión</button>
                                </div>
                            : <NavLink
                                className={({ isActive }) =>
                                    `nav-link ${isActive ? "active" : ""}`
                                }
                                to="/Login"
                                >
                                Iniciar Sesión
                                </NavLink>
                    }
                </ul>
            </div>
        </nav>
    );
};
