import React from "react";
import "./TipoEventosPage.css";
import Title from "../../components/Title/Title";
import MainContent from "../../components/MainContent/MainContent";
import Container from "../../components/Container/Container";
import ImageIllustrator from "../../components/ImageIllustrator/ImageIllustrator";
import eventTypeImage from "../../assets/images/tipo-evento.svg";

import { Input } from "../../components/FormComponents/FormComponents"

const TipoEventosPage = () => {
  return (
    <MainContent>
      <section className="cadastro-evento-section">
        <Container>
          <div className="cadastro-evento__box">
            <Title titleText={"Tipos de Evento"} color={"black"} />
            <ImageIllustrator
              alterText={"Um homem e uma mulher interagindo com uma tela de cadastro"}
              imageRender={eventTypeImage}
            />
            <form action="">
            <Input 
            name={"titulo"}
            type={"number"}
            />
            </form>
          </div>
        </Container>
      </section>
    </MainContent>
  );
};

export default TipoEventosPage;
