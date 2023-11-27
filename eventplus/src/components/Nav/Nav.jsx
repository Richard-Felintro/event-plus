import React from "react";
import "./Nav.css";
import { Link } from 'react-router-dom'

import logoMobile from '../../assets/images/logo-white.svg'
import logoDesktop from '../../assets/images/logo-pink.svg'

const Nav = ( {setExibeNavbar, exibeNavbar} ) => {
  return (
    <nav className={`navbar ${exibeNavbar ? "exibeNavbar" : ""}`}>
      <span className="navbar__close" onClick={ () => { setExibeNavbar(false) }}>x</span>
      <Link to="/">
        <img 
        className="eventlogo eventlogo__logo-image" 
        src={window.innerWidth >= 992 ? logoDesktop : logoMobile} 
        alt="Event+ Logo" />
      </Link>

      <div className="navbar__items-box">
        <Link className="navbar__item" to="/">Home</Link>
        <Link className="navbar__item" to="/tipo-eventos">Tipos de Evento</Link>
        <Link className="navbar__item" to="eventos">Eventos</Link>
        <Link className="navbar__item" to="login">Login</Link>
      </div>
    </nav>
  );
};

export default Nav;
