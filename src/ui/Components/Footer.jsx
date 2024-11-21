import React from "react";
import logoApp from "../../../src/assets/images/icons/logoApp.png"
import { NavLink } from "react-router-dom";
export const Footer = () => {
  return (
    <div className="container-footer">
      <footer className="row row-cols-1 row-cols-sm-2 row-cols-md-5 py-5 mt-5 border-top">
        <div className="col mb-3">
          <NavLink
            to="/"
            className="d-flex align-items-center mb-3 link-body-emphasis text-decoration-none"
          >
            <img
              className="logo-footer"
              src={logoApp}
              height="70"
              width="80"
              style={{ position: 'static', left: 'auto' }}
            />
          </NavLink>
          <p className="text-secundary">&copy; Home Helpers CO 2024</p>
        </div>

        <div className="colum">
          <h5>Home Helpers CO</h5>
          <ul className="nav flex-column">
            <li className="nav-item mb-2">
            <NavLink
                to="/Login"
                className="text-secundary"
            >
                Inicia Sesión
            </NavLink>
            </li>
            <li className="nav-item mb-2">
              <NavLink
                to="/Planes"
                className="text-secundary"
              >
                Planes
              </NavLink>
            </li>
            <li className="nav-item mb-2">
              <NavLink
                to="/work"
                className="text-secundary"
              >
                Trabaja con nosotros
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="colum">
          <h5>Ubicación</h5>
          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <a href="#" className="text-secundary">
                Tuluá, Valle del Cauca
              </a>
            </li>
          </ul>
        </div>

        <div className="colum">
          <h5>Contacto</h5>
          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <a href="#" className="text-secundary">
                Correo:homehelpersco1@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
};
