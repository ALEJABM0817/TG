import { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { startLogout } from "../../store/auth";

export const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { status, displayName } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownOpen(false);
        }
    };

    useEffect(() => {
        if (isDropdownOpen) {
            document.addEventListener('click', handleClickOutside);
        } else {
            document.removeEventListener('click', handleClickOutside);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isDropdownOpen]);

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="content-left">
                    <Link className="navbar-brand" to="/">
                        Home Helpers CO
                    </Link>

                    <div className="navbar-links">
                        <NavLink
                            to="/Ofertantes"
                            className={({ isActive }) => (isActive ? 'nav-link active-link' : 'nav-link')}
                        >
                            Ofertantes
                        </NavLink>
                        <NavLink
                            to="/Planes"
                            className={({ isActive }) => (isActive ? 'nav-link active-link' : 'nav-link')}
                        >
                            Planes
                        </NavLink>
                    </div>
                </div>

                <div className="navbar-user" ref={dropdownRef}>
                    {status === 'authenticated'
                        ? (
                            <div className={`dropdown ${isDropdownOpen ? 'open' : ''}`}>
                                <button
                                    className="user-menu"
                                    type="button"
                                    onClick={toggleDropdown}
                                >
                                    <FaUserCircle size={24} /> Hola, {displayName}
                                    <span className={`arrow ${isDropdownOpen ? 'open' : ''}`}></span>
                                </button>
                                <ul className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`}>
                                    <li className="mobile-only">
                                        <NavLink
                                            to="/Ofertantes"
                                            className={({ isActive }) => (isActive ? 'nav-link active-link' : 'nav-link')}
                                        >
                                            Ofertantes
                                        </NavLink>
                                    </li>
                                    <li className="mobile-only">
                                        <NavLink
                                            to="/Planes"
                                            className={({ isActive }) => (isActive ? 'nav-link active-link' : 'nav-link')}
                                        >
                                            Planes
                                        </NavLink>
                                    </li>
                                    <li><NavLink to="/panel/mis-datos">Mis datos</NavLink></li>
                                    <li><NavLink to="/experiencia">Experiencia</NavLink></li>
                                    <li><NavLink to="/solicitudes">Solicitudes</NavLink></li>
                                    <li><button onClick={() => dispatch(startLogout())}>Cerrar Sesión</button></li>
                                </ul>
                            </div>
                        )
                        : (
                            <NavLink to="/Login">
                                Iniciar Sesión
                            </NavLink>
                        )
                    }
                </div>
            </div>
        </nav>
    );
};
