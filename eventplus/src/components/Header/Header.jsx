import React, { useState } from "react";
import { Link } from "react-router-dom";
import Container from "../Container/Container";
import Nav from "../Nav/Nav";
import PerfilUsuario from "../PerfilUsuario/PerfilUsuario";
import menubar from "../../assets/images/menubar.png";

import "./Header.css";

const Header = () => {
  const [exibeNavbar, setExibeNavbar] = useState(false);
  //   console.log(`Exibe a navbar? ${exibeNavbar}`);

  return (
    <header className="headerpage">
      <Container>
        <div className="header-flex">
          <img
            className="headerpage__menubar"
            src={menubar}
            alt="Imagem menu de barras. Serve para exibir ou esconder o menu em smartphones"
            onClick={() => {
              setExibeNavbar(true);
            }}
          />
          <Nav setExibeNavbar={setExibeNavbar} exibeNavbar={exibeNavbar} />
          <PerfilUsuario />
        </div>
      </Container>
    </header>
  );
};

export default Header;
