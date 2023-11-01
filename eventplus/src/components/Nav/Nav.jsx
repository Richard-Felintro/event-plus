import React from "react";
import "./Nav.css";
import { Link } from 'react-router-dom'

import logoMobile from '../../assets/images/logo-white.svg'
import logoDesktop from '../../assets/images/logo-pink.svg'

const Nav = () => {
  return (
    <nav className="navbar">
      <span className="navbar__close">x</span>
      <Link to="/">
        <img 
        className="eventlogo__logo-image" 
        src={window.innerWidth >= 992 ? logoDesktop : logoMobile} 
        alt="Event+ Logo" />
      </Link>

      <div>
        <Link to="/">Home</Link>
        <Link to="/tipo-eventos">Tipos de Evento</Link>
        <Link to="eventos">Eventos</Link>
        <Link to="login">Login</Link>
      </div>
    </nav>
  );
};

export default Nav;
