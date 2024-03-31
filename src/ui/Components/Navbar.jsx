import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

export const Navbar = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
const navigate = useNavigate();

const onLogout =() => {
  navigate( '/Login', {
    replace:true
  }
  );
}
  const handleNavCollapse = () => {
    setIsNavCollapsed(!isNavCollapsed);
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark p-2">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Home Helpers
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
            <NavLink
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
              to="/Login"
              >
              Iniciar Sesión
              </NavLink>
             
              
    
          </ul>
        </div>
      </div>

      <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
        <ul className="navbar-nav ml-auto">
          <button className="nav-item nav-link btn" >Cerrar Sesión</button>
        </ul>
      </div>
    </nav>
  );
};
