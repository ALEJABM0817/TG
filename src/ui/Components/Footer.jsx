import React from "react";
import logoApp from "../../../src/assets/images/icons/logoApp.png"
export const Footer = () => {
  return (
    <div className="container-footer">
      <footer className="row row-cols-1 row-cols-sm-2 row-cols-md-5 py-5 mt-5 border-top">
        <div className="col mb-3">
          <a
            href="/"
            className="d-flex align-items-center mb-3 link-body-emphasis text-decoration-none"
          >
            <img src= {logoApp} height="70" width="80"/>
          </a>
          <p className="text-secundary">&copy; Home Helpers CO 2024</p>
        </div>

        <div className="colum">
          <h5>Home Helpers CO</h5>
          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <a href="#" className="text-secundary">
                Inicia Sesión
              </a>
            </li>
            <li className="nav-item mb-2">
              <a href="#" className="text-secundary">
                Solicita Servicios
              </a>
            </li>
            <li className="nav-item mb-2">
              <a href="#" className="text-secundary">
                Trabaja con nosotros
              </a>
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
                Correo:contacto@home.com
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
};
